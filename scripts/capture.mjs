// Capturas e verificações via Chrome DevTools Protocol no Edge/Chrome headless.
// Sem dependências: usa o WebSocket nativo do Node 22+.
// Uso: node scripts/capture.mjs <jobs.json>
//   jobs.json: [{ "name", "url", "width", "height", "mobile"?, "reducedMotion"?, "scrollY"?, "fullPage"?, "eval"? , "out" }]
import { spawn } from 'node:child_process';
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { dirname } from 'node:path';

const BROWSER = process.env.CHROME_PATH || 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe';
const PORT = 9333;
const jobs = JSON.parse(readFileSync(process.argv[2], 'utf8').replace(/^﻿/, ''));
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const proc = spawn(BROWSER, ['--headless=new', `--remote-debugging-port=${PORT}`, '--disable-gpu', '--hide-scrollbars', '--no-first-run', `--user-data-dir=${process.env.TEMP || '/tmp'}/pstec-cdp`, 'about:blank'], { stdio: 'ignore' });

let targets;
for (let i = 0; i < 40; i++) {
  try {
    targets = await (await fetch(`http://127.0.0.1:${PORT}/json`)).json();
    if (targets.some((t) => t.type === 'page')) break;
  } catch {}
  await sleep(250);
}
const page = targets.find((t) => t.type === 'page');
const ws = new WebSocket(page.webSocketDebuggerUrl);
await new Promise((r) => ws.addEventListener('open', r));
let id = 0;
const pending = new Map();
ws.addEventListener('message', (e) => {
  const msg = JSON.parse(e.data);
  if (msg.id && pending.has(msg.id)) {
    pending.get(msg.id)(msg);
    pending.delete(msg.id);
  }
});
const send = (method, params = {}) =>
  new Promise((resolve) => {
    const n = ++id;
    pending.set(n, resolve);
    ws.send(JSON.stringify({ id: n, method, params }));
  });
const evaluate = async (expression) => {
  const r = await send('Runtime.evaluate', { expression, awaitPromise: true, returnByValue: true });
  return r.result?.result?.value ?? r.result?.exceptionDetails?.exception?.description;
};

await send('Page.enable');
await send('Runtime.enable');
const results = {};
for (const job of jobs) {
  await send('Emulation.setDeviceMetricsOverride', { width: job.width, height: job.height, deviceScaleFactor: 1, mobile: !!job.mobile });
  await send('Emulation.setTouchEmulationEnabled', { enabled: !!job.mobile, maxTouchPoints: job.mobile ? 5 : 0 });
  await send('Emulation.setEmulatedMedia', { features: [{ name: 'prefers-reduced-motion', value: job.reducedMotion ? 'reduce' : 'no-preference' }] });
  await send('Page.navigate', { url: job.url });
  await sleep(job.wait ?? 2200);
  if (job.scrollY != null) {
    await evaluate(`window.scrollTo(0, ${job.scrollY}); window.dispatchEvent(new Event('scroll')); 1`);
    await sleep(700);
  }
  if (job.eval) results[job.name] = await evaluate(job.eval);
  if (job.out) {
    let clip;
    if (job.fullPage) {
      const h = await evaluate('document.documentElement.scrollHeight');
      await send('Emulation.setDeviceMetricsOverride', { width: job.width, height: Math.min(h, 16000), deviceScaleFactor: 1, mobile: !!job.mobile });
      await sleep(900);
    }
    const shot = await send('Page.captureScreenshot', { format: 'png', clip });
    mkdirSync(dirname(job.out), { recursive: true });
    writeFileSync(job.out, Buffer.from(shot.result.data, 'base64'));
  }
}
console.log(JSON.stringify(results, null, 1));
ws.close();
proc.kill();
