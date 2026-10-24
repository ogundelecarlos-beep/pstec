// Verificação funcional dos recursos da “assinatura interativa”, via CDP
// (Edge/Chrome headless, WebSocket nativo do Node 22+). Teclado e toque reais.
// Uso: node scripts/verify-assinatura.mjs [http://localhost:3100]
import { spawn } from 'node:child_process';

const BASE = process.argv[2] || 'http://localhost:3100';
const BROWSER = process.env.CHROME_PATH || 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe';
const PORT = 9334;
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const proc = spawn(BROWSER, ['--headless=new', `--remote-debugging-port=${PORT}`, '--disable-gpu', '--no-first-run', `--user-data-dir=${process.env.TEMP || '/tmp'}/pstec-verify`, 'about:blank'], { stdio: 'ignore' });

let targets;
for (let i = 0; i < 40; i++) {
  try {
    targets = await (await fetch(`http://127.0.0.1:${PORT}/json`)).json();
    if (targets.some((t) => t.type === 'page')) break;
  } catch {}
  await sleep(250);
}
const ws = new WebSocket(targets.find((t) => t.type === 'page').webSocketDebuggerUrl);
await new Promise((r) => ws.addEventListener('open', r));
let id = 0;
const pending = new Map();
const consoleErrors = [];
ws.addEventListener('message', (e) => {
  const m = JSON.parse(e.data);
  if (m.id && pending.has(m.id)) { pending.get(m.id)(m); pending.delete(m.id); }
  if (m.method === 'Runtime.exceptionThrown') consoleErrors.push(m.params.exceptionDetails.exception?.description?.slice(0, 160));
  if (m.method === 'Log.entryAdded' && m.params.entry.level === 'error') consoleErrors.push(`${m.params.entry.text} ${m.params.entry.url || ''}`.slice(0, 200));
});
const send = (method, params = {}) => new Promise((res) => {
  const n = ++id;
  const timer = setTimeout(() => { pending.delete(n); res({ result: { exceptionDetails: { exception: { description: 'timeout ' + method } } } }); }, 12000);
  pending.set(n, (m) => { clearTimeout(timer); res(m); });
  ws.send(JSON.stringify({ id: n, method, params }));
});
const ev = async (expr) => {
  const r = await send('Runtime.evaluate', { expression: expr, awaitPromise: true, returnByValue: true });
  return r.result?.result?.value ?? `ERRO: ${r.result?.exceptionDetails?.exception?.description}`;
};
const key = async (k, code = k, vk) => {
  const base = { key: k, code, windowsVirtualKeyCode: vk, ...(k === 'Enter' ? { text: String.fromCharCode(13), unmodifiedText: String.fromCharCode(13) } : {}) };
  await send('Input.dispatchKeyEvent', { type: 'keyDown', ...base });
  await send('Input.dispatchKeyEvent', { type: 'keyUp', ...base });
  await sleep(120);
};
const KEYS = { Tab: ['Tab', 'Tab', 9], Enter: ['Enter', 'Enter', 13], Escape: ['Escape', 'Escape', 27], ArrowRight: ['ArrowRight', 'ArrowRight', 39], ArrowLeft: ['ArrowLeft', 'ArrowLeft', 37] };
const press = (name, times = 1) => (async () => { for (let i = 0; i < times; i++) await key(...KEYS[name]); })();
const viewport = (width, height, mobile = false, reduce = false) => Promise.all([
  send('Emulation.setDeviceMetricsOverride', { width, height, deviceScaleFactor: 1, mobile }),
  send('Emulation.setTouchEmulationEnabled', { enabled: mobile, maxTouchPoints: mobile ? 5 : 0 }),
  send('Emulation.setEmulatedMedia', { features: [{ name: 'prefers-reduced-motion', value: reduce ? 'reduce' : 'no-preference' }] }),
]);
const go = async (path, wait = 2000) => { await send('Page.navigate', { url: BASE + path }); await sleep(wait); };

const results = [];
const check = (name, ok, detail) => {
  results.push({ name, ok: !!ok, detail });
  if (!name.startsWith('sem overflow') || !ok) console.log((ok ? 'OK    ' : 'FALHA ') + name + (ok ? '' : ' :: ' + JSON.stringify(detail)));
};

await send('Page.enable'); await send('Runtime.enable'); await send('Log.enable');

// 1–2. Overflow + transformação no desktop
for (const [w, h, mob] of [[320, 640, true], [360, 740, true], [390, 844, true], [768, 1024, true], [1024, 768, false], [1440, 900, false]]) {
  await viewport(w, h, mob);
  for (const path of ['/', '/estrutura', '/contato?produto=barra-aluminio-dobrada', '/produtos']) {
    await go(path, 1500);
    const r = await ev(`(() => { const sw = document.documentElement.scrollWidth; const off = [...document.querySelectorAll('body *')].filter(e => { const b = e.getBoundingClientRect(); return b.width > 0 && b.right > innerWidth + 1 && !e.closest('.mobile-menu') && !e.closest('dialog'); }).slice(0,3).map(e => e.tagName + '.' + (e.className.baseVal ?? e.className)); const broken = [...document.images].filter(i => i.complete && i.naturalWidth === 0).map(i => i.src); return { sw, off, broken }; })()`);
    check(`sem overflow/imagem quebrada ${w}px ${path}`, r.sw <= w && r.off.length === 0 && r.broken.length === 0, r);
  }
}

await viewport(1440, 900);
await go('/');
const reveal = [];
for (const y of [0, 330, 700, 330, 0]) {
  reveal.push(await ev(`(async () => { scrollTo(0, ${y}); dispatchEvent(new Event('scroll')); await new Promise(r => setTimeout(r, 300)); const h = document.querySelector('.reveal-hero'); return { y: ${y}, p: h.style.getPropertyValue('--p'), cta: document.querySelector('.hero2__ctas a').getBoundingClientRect().top < innerHeight, scrollY: Math.round(scrollY) }; })()`));
}
check('revelação acompanha a rolagem (0 → 1 → 0) sem bloquear', reveal[0].p === '0.000' && reveal[2].p === '1.000' && reveal[4].p === '0.000' && reveal.every((s) => s.cta && s.scrollY === s.y), reveal);

// 6. Hero estável sem hover (toque) e 7. movimento reduzido
await viewport(390, 844, true);
await go('/');
const touchHero = await ev(`(async () => { const st = document.querySelector('.tr-stage'); st.dispatchEvent(new PointerEvent('pointermove', { pointerType: 'touch', clientX: 100, clientY: 400, bubbles: true })); await new Promise(r => setTimeout(r, 300)); return { lightOn: st.style.getPropertyValue('--light-on') || '0', tilt: getComputedStyle(document.querySelector('.tr-tilt')).transform }; })()`);
check('toque: sem reflexo nem inclinação', touchHero.lightOn === '0' && (touchHero.tilt === 'none' || touchHero.tilt.startsWith('matrix(1, 0, 0, 1') || touchHero.tilt.includes('matrix3d(1, 0, 0, 0, 0, 1')), touchHero);

await viewport(1440, 900, false, true);
await go('/');
const reduced = await ev(`(() => { const h = document.querySelector('.reveal-hero'); const layers = [...document.querySelectorAll('.tr-svg > g:nth-of-type(3) path')]; return { scrub: h.classList.contains('is-scrub'), p: getComputedStyle(h).getPropertyValue('--p').trim() || h.style.getPropertyValue('--p'), minLayerOpacity: Math.min(...layers.map(l => +getComputedStyle(l).opacity)), heroH: Math.round(h.getBoundingClientRect().height), markerAnim: getComputedStyle(document.querySelector('.fx__marker'), '::after').animationName }; })()`);
check('movimento reduzido: estado final estático, sem trecho extra, sem pulsação', !reduced.scrub && reduced.minLayerOpacity === 1 && reduced.heroH < 900 && reduced.markerAnim === 'none', reduced);
// alternar preferência com a página aberta não deixa estado intermediário
await send('Emulation.setEmulatedMedia', { features: [{ name: 'prefers-reduced-motion', value: 'no-preference' }] });
await sleep(400);
const toggled = await ev(`(async () => { scrollTo(0, 330); dispatchEvent(new Event('scroll')); await new Promise(r => setTimeout(r, 300)); const a = document.querySelector('.reveal-hero').style.getPropertyValue('--p'); return a; })()`);
await send('Emulation.setEmulatedMedia', { features: [{ name: 'prefers-reduced-motion', value: 'reduce' }] });
await sleep(400);
const back = await ev(`document.querySelector('.reveal-hero').style.getPropertyValue('--p')`);
check('alternar movimento reduzido em tempo real volta ao estado final', back === '1.000', { semReducao: toggled, comReducao: back });

// 3–4. FacilityExplorer: alinhamento e teclado
await viewport(1440, 900);
await go('/');
const align = [];
for (const w of [1440, 1024, 768, 390]) {
  await viewport(w, 900, w < 1024);
  await sleep(500);
  align.push(await ev(`(() => { const f = document.querySelector('.fx__frame').getBoundingClientRect(); return [...document.querySelectorAll('.fx__marker')].map((m, i) => { const b = m.getBoundingClientRect(); const cx = (b.left + b.width / 2 - f.left) / f.width; const cy = (b.top + b.height / 2 - f.top) / f.height; return Math.round(cx * 1400) + ',' + Math.round(cy * 700); }).join(' '); })()`));
}
const near = (a, b) => a.split(' ').every((p, i) => { const [x1, y1] = p.split(',').map(Number); const [x2, y2] = b.split(' ')[i].split(',').map(Number); return Math.abs(x1 - x2) <= 4 && Math.abs(y1 - y2) <= 4; });
check('pontos mantêm a posição relativa em todas as larguras (tolerância 4/1400)', align.every((a) => near(a, align[0])), align);

await viewport(1440, 900);
await go('/');
await ev(`document.querySelectorAll('.fx__marker')[1].focus(); 1`);
await press('Enter');
const open1 = await ev(`(() => ({ expanded: document.activeElement.getAttribute('aria-expanded'), panelVisible: !document.getElementById('fx-panel-montagem').hidden, openCount: [...document.querySelectorAll('.fx__panel')].filter(p => getComputedStyle(p).display !== 'none').length, activeShape: getComputedStyle(document.querySelector('.fx__marker.is-active')).borderRadius }))()`);
await ev(`document.querySelectorAll('.fx__marker')[3].focus(); 1`);
await press('Enter');
const open2 = await ev(`(() => ({ openIds: [...document.querySelectorAll('.fx__panel')].filter(p => getComputedStyle(p).display !== 'none').map(p => p.id) }))()`);
await press('Escape');
const closed = await ev(`(() => ({ open: [...document.querySelectorAll('.fx__panel')].filter(p => getComputedStyle(p).display !== 'none').length, focus: document.activeElement.getAttribute('aria-label') }))()`);
check('explorador: Enter abre, um ponto por vez, Escape fecha e devolve o foco', open1.panelVisible && open1.openCount === 1 && open2.openIds.length === 1 && open2.openIds[0] === 'fx-panel-estoque' && closed.open === 0 && closed.focus === 'Ponto 4: Matéria-prima', { open1, open2, closed });
// lista/acordeão por teclado
await ev(`document.querySelectorAll('.fx__toggle')[0].focus(); 1`);
await press('Enter');
const listOpen = await ev(`(() => ({ marker0Active: document.querySelectorAll('.fx__marker')[0].classList.contains('is-active'), expanded: document.activeElement.getAttribute('aria-expanded') }))()`);
await press('Enter');
const listClosed = await ev(`[...document.querySelectorAll('.fx__panel')].filter(p => getComputedStyle(p).display !== 'none').length`);
check('lista do explorador controla o mesmo ponto e fecha', listOpen.marker0Active && listOpen.expanded === 'true' && listClosed === 0, { listOpen, listClosed });

// 5. Comparador: setas do teclado e toque (arraste)
await ev(`document.querySelector('.compare__range').scrollIntoView({ block: 'center' }); document.querySelector('.compare__range').focus(); 1`);
await press('ArrowRight', 10);
const kb = await ev(`(() => { const r = document.querySelector('.compare__range'); return { value: r.value, text: r.getAttribute('aria-valuetext') }; })()`);
await viewport(390, 844, true);
await sleep(500);
const box = await ev(`(() => { const el = document.querySelector('.compare'); el.scrollIntoView({ block: 'center' }); const b = el.getBoundingClientRect(); return { x: b.left, y: b.top + b.height / 2, w: b.width }; })()`);
await sleep(300);
await send('Input.dispatchTouchEvent', { type: 'touchStart', touchPoints: [{ x: box.x + box.w * 0.5, y: box.y }] });
for (let i = 1; i <= 6; i++) await send('Input.dispatchTouchEvent', { type: 'touchMove', touchPoints: [{ x: box.x + box.w * (0.5 - i * 0.06), y: box.y }] });
await send('Input.dispatchTouchEvent', { type: 'touchEnd', touchPoints: [] });
await sleep(300);
const touch = await ev(`document.querySelector('.compare__range').value`);
check('comparador: setas e arraste por toque', kb.value === '60' && Number(touch) < 40, { kb, touchValue: touch });

// 8. Produto até o contato: CTA, atualização, voltar/avançar, remover
await viewport(1440, 900);
await go('/produtos/barra-aluminio-dobrada');
await ev(`document.querySelector('.panel a.btn--primary').click(); 1`);
await sleep(1800);
const atContact = await ev(`(() => ({ url: location.pathname + location.search, assunto: document.getElementById('assunto').value, picked: document.getElementById('picked-title')?.textContent, cta: [...document.querySelectorAll('a')].some(a => a.textContent.includes('Tenho interesse')) }))()`);
await send('Page.reload'); await sleep(2200);
const afterReload = await ev(`(() => ({ assunto: document.getElementById('assunto').value, picked: document.getElementById('picked-title')?.textContent }))()`);
await ev(`history.back(); 1`); await sleep(1800);
const afterBack = await ev(`location.pathname`);
await ev(`history.forward(); 1`); await sleep(2200);
const afterForward = await ev(`(() => ({ url: location.pathname + location.search, assunto: document.getElementById('assunto')?.value, picked: document.getElementById('picked-title')?.textContent }))()`);
await ev(`document.getElementById('nome').value = ''; 1`);
const kept = await ev(`(async () => { const n = document.getElementById('nome'); n.focus(); return 1; })()`);
for (const ch of 'Ana') await send('Input.dispatchKeyEvent', { type: 'char', text: ch });
await ev(`[...document.querySelectorAll('.picked button')].find(b => b.textContent.includes('Remover')).click(); 1`);
await sleep(400);
const removed = await ev(`(() => ({ url: location.search, assunto: document.getElementById('assunto').value, picked: !!document.querySelector('.picked'), nome: document.getElementById('nome').value, focus: document.activeElement.id }))()`);
check('produto chega ao contato e sobrevive a atualização e voltar/avançar', atContact.assunto === 'produto:barra-aluminio-dobrada' && atContact.picked === 'Barra dobrada com furação' && afterReload.picked === atContact.picked && afterBack === '/produtos/barra-aluminio-dobrada' && afterForward.assunto === atContact.assunto, { atContact, afterReload, afterBack, afterForward });
check('remover item limpa URL e mantém o que foi digitado', removed.url === '' && removed.assunto === '' && !removed.picked && removed.nome === 'Ana' && removed.focus === 'assunto', removed);

// parâmetro inválido / HTML na URL não é aceito
await go('/contato?produto=%3Cimg%20src%3Dx%20onerror%3Dalert(1)%3E');
const bad = await ev(`(() => ({ assunto: document.getElementById('assunto').value, picked: !!document.querySelector('.picked'), injected: !!document.querySelector('img[src="x"]') }))()`);
check('identificador inválido na URL é ignorado (sem HTML injetado)', bad.assunto === '' && !bad.picked && !bad.injected, bad);

// WhatsApp flutuante não cobre o formulário (celular)
await viewport(390, 844, true);
await go('/contato?produto=barra-aluminio-dobrada');
const fab = await ev(`(async () => { document.getElementById('formulario').scrollIntoView(); dispatchEvent(new Event('scroll')); await new Promise(r => setTimeout(r, 900)); const f = document.querySelector('.fab'); return { hidden: f.classList.contains('is-hidden'), vis: getComputedStyle(f).visibility }; })()`);
check('WhatsApp flutuante oculto sobre o formulário no celular', fab.hidden && fab.vis === 'hidden', fab);
await viewport(1440, 900);

// envio demonstrativo honesto
await go('/contato?produto=barra-aluminio-dobrada');
await ev(`(() => { const set = (id, v) => { const el = document.getElementById(id); const proto = el.tagName === 'TEXTAREA' ? HTMLTextAreaElement.prototype : HTMLInputElement.prototype; Object.getOwnPropertyDescriptor(proto, 'value').set.call(el, v); el.dispatchEvent(new Event('input', { bubbles: true })); }; set('nome', 'Teste'); set('email', 'teste@exemplo.com.br'); set('mensagem', 'Mensagem de teste do protótipo.'); document.querySelector('button[type=submit]').click(); return 1; })()`);
await sleep(1400);
const sent = await ev(`document.querySelector('.form-status--ok')?.textContent`);
check('formulário informa que nenhuma mensagem foi enviada', sent?.includes('Nenhuma mensagem foi enviada'), sent);

// Visualização rápida com o novo CTA
await go('/produtos');
await ev(`document.querySelectorAll('.quick-btn')[0].click(); 1`);
await sleep(500);
const qv = await ev(`(() => ({ open: document.querySelector('dialog.drawer').open, cta: document.querySelector('dialog.drawer .btn--primary')?.textContent.trim(), href: document.querySelector('dialog.drawer .btn--primary')?.getAttribute('href') }))()`);
await press('Escape');
const qvClosed = await ev(`({ open: document.querySelector('dialog.drawer').open, focus: document.activeElement.className })`);
check('visualização rápida usa “Tenho interesse nesta solução” e fecha com Escape', qv.open && qv.cta === 'Tenho interesse nesta solução' && qv.href.includes('produto=') && !qvClosed.open && qvClosed.focus === 'quick-btn', { qv, qvClosed });

check('sem erros de console', consoleErrors.length === 0, consoleErrors);

for (const r of results) console.log(`${r.ok ? 'OK  ' : 'FALHA'} ${r.name}${r.ok ? '' : '\n      ' + JSON.stringify(r.detail)}`);
console.log(`\n${results.filter((r) => r.ok).length}/${results.length} verificações aprovadas`);
ws.close();
proc.kill();
process.exit(results.every((r) => r.ok) ? 0 : 1);
