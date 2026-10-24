'use client';

import { useEffect, useRef, type CSSProperties } from 'react';
import { COPPER, GAP, LAM, LAYERS, SHUNT_NOTES, SHUNT_VIEWBOX } from './art/ShuntArt';

/**
 * Do traçado técnico ao volume metálico.
 *
 * Uma única geometria em camadas (linhas → lâminas → terminais → reflexo).
 * O progresso `--p` (0–1) vem da rolagem nativa e é aplicado só via variável
 * CSS: nenhum re-render do React durante a rolagem.
 *
 * - Desktop (≥ 1024 px): o hero ganha um trecho curto de rolagem com o palco
 *   fixo (sticky); texto e CTAs ficam visíveis o tempo todo.
 * - Celular: sem trecho extra; a transformação acontece enquanto o palco
 *   atravessa a tela.
 * - Sem JS, com movimento reduzido ou se algo falhar: `--p` = 1 (estado final).
 */

const clampP = (start: number, len: number) => `clamp(0, calc((var(--p) - ${start}) / ${len}), 1)`;
const layerStyle = (i: number): CSSProperties => ({ opacity: clampP(0.08 + i * 0.028, 0.14) as unknown as number });

export function useScrollProgress(
  sectionRef: React.RefObject<HTMLElement | null>,
  stageRef: React.RefObject<HTMLElement | null>,
) {
  useEffect(() => {
    const section = sectionRef.current;
    const stage = stageRef.current;
    if (!section || !stage) return;

    const reduceMq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const wideMq = window.matchMedia('(min-width: 1024px)');
    let visible = true;

    const set = (p: number) => section.style.setProperty('--p', p.toFixed(3));

    const measure = () => {
      if (reduceMq.matches) return set(1);
      const ih = window.innerHeight;
      let p: number;
      if (wideMq.matches) {
        const r = section.getBoundingClientRect();
        const runway = r.height - ih;
        p = runway > 0 ? -r.top / (runway * 0.8) : 1;
      } else {
        const r = stage.getBoundingClientRect();
        p = (ih * 0.88 - r.top) / (ih * 0.6);
      }
      set(Math.min(1, Math.max(0, p)));
    };
    // Eventos de rolagem já chegam no máximo uma vez por quadro; medir direto
    // evita depender de requestAnimationFrame (que pode ser suspenso) e mantém
    // a peça sempre coerente com a posição atual.
    const schedule = () => {
      if (visible && !document.hidden) measure();
    };

    const apply = () => {
      // Alternar a preferência nunca deixa a peça no meio do caminho.
      section.classList.toggle('is-scrub', !reduceMq.matches);
      measure();
    };
    apply();

    const io = 'IntersectionObserver' in window
      ? new IntersectionObserver(([e]) => {
          visible = e.isIntersecting;
          if (visible) schedule();
        })
      : null;
    io?.observe(section);

    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    reduceMq.addEventListener('change', apply);
    wideMq.addEventListener('change', apply);
    document.addEventListener('visibilitychange', schedule);
    return () => {
      io?.disconnect();
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
      reduceMq.removeEventListener('change', apply);
      wideMq.removeEventListener('change', apply);
      document.removeEventListener('visibilitychange', schedule);
      section.classList.remove('is-scrub');
      section.style.setProperty('--p', '1');
    };
  }, [sectionRef, stageRef]);
}

/**
 * Reflexo que acompanha o ponteiro, restrito à silhueta da peça.
 * Só com ponteiro preciso + hover e sem movimento reduzido. Atualiza variáveis
 * CSS dentro de requestAnimationFrame, com suavização.
 */
function usePointerLight(stageRef: React.RefObject<HTMLElement | null>) {
  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)');
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
    let tx = 0.5, ty = 0.4, cx = 0.5, cy = 0.4, on = 0, onT = 0, raf = 0;

    const tick = () => {
      cx += (tx - cx) * 0.12;
      cy += (ty - cy) * 0.12;
      on += (onT - on) * 0.12;
      stage.style.setProperty('--lx', `${(cx * 100).toFixed(1)}%`);
      stage.style.setProperty('--ly', `${(cy * 100).toFixed(1)}%`);
      stage.style.setProperty('--tx', ((cx - 0.5) * 2).toFixed(3));
      stage.style.setProperty('--ty', ((cy - 0.5) * 2).toFixed(3));
      stage.style.setProperty('--light-on', on.toFixed(3));
      const moving = Math.abs(tx - cx) + Math.abs(ty - cy) + Math.abs(onT - on) > 0.002;
      raf = moving && !document.hidden ? requestAnimationFrame(tick) : 0;
    };
    const kick = () => {
      if (!raf) raf = requestAnimationFrame(tick);
    };
    const enabled = () => fine.matches && !reduce.matches;

    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse' || !enabled()) return;
      const r = stage.getBoundingClientRect();
      tx = Math.min(1, Math.max(0, (e.clientX - r.left) / r.width));
      ty = Math.min(1, Math.max(0, (e.clientY - r.top) / r.height));
      onT = 1;
      kick();
    };
    const onLeave = () => {
      tx = 0.5;
      ty = 0.4;
      onT = 0;
      kick();
    };
    const onPref = () => {
      if (!enabled()) {
        cancelAnimationFrame(raf);
        raf = 0;
        ['--lx', '--ly', '--tx', '--ty', '--light-on'].forEach((v) => stage.style.removeProperty(v));
      }
    };
    stage.addEventListener('pointermove', onMove);
    stage.addEventListener('pointerleave', onLeave);
    reduce.addEventListener('change', onPref);
    fine.addEventListener('change', onPref);
    return () => {
      cancelAnimationFrame(raf);
      stage.removeEventListener('pointermove', onMove);
      stage.removeEventListener('pointerleave', onLeave);
      reduce.removeEventListener('change', onPref);
      fine.removeEventListener('change', onPref);
    };
  }, [stageRef]);
}

export function TechnicalReveal({
  stageRef,
  activeNote,
}: {
  stageRef: React.RefObject<HTMLDivElement | null>;
  activeNote: number;
}) {
  usePointerLight(stageRef);
  const bottom = (LAYERS - 1) * GAP;
  const linesStyle = { opacity: `calc(1 - ${clampP(0.55, 0.3)} * 0.78)` } as unknown as CSSProperties;
  const terminalStyle = { opacity: clampP(0.36, 0.2) } as unknown as CSSProperties;
  const finishStyle = { opacity: clampP(0.55, 0.3) } as unknown as CSSProperties;
  const specStyle = {
    opacity: clampP(0.62, 0.12),
    strokeDashoffset: `calc(0.92 - ${clampP(0.62, 0.36)} * 0.5)`,
  } as unknown as CSSProperties;
  const notesStyle = { opacity: clampP(0.82, 0.12) } as unknown as CSSProperties;

  return (
    <div ref={stageRef} className="tr-stage">
      <div className="tr-tilt">
        <svg className="tr-svg" viewBox={SHUNT_VIEWBOX} role="img" aria-labelledby="tr-title tr-desc">
          <title id="tr-title">Representação conceitual de conexão flexível laminada</title>
          <desc id="tr-desc">Ilustração que passa de linhas técnicas a uma peça com aparência metálica. Sem dimensões nem especificações.</desc>
          <defs>
            <linearGradient id="tr-tin" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#FFFFFF" />
              <stop offset=".42" stopColor="#D3D9DF" />
              <stop offset=".7" stopColor="#A9B2BB" />
              <stop offset="1" stopColor="#7E8892" />
            </linearGradient>
            <linearGradient id="tr-side" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#9AA3AC" />
              <stop offset="1" stopColor="#5F6973" />
            </linearGradient>
            <radialGradient id="tr-shadow">
              <stop offset="0" stopColor="#000" stopOpacity=".45" />
              <stop offset="1" stopColor="#000" stopOpacity="0" />
            </radialGradient>
            <radialGradient id="tr-glow">
              <stop offset="0" stopColor="#E08A4E" stopOpacity=".32" />
              <stop offset="1" stopColor="#E08A4E" stopOpacity="0" />
            </radialGradient>
            <linearGradient id="tr-sheen" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0" stopColor="#fff" stopOpacity="0" />
              <stop offset=".5" stopColor="#fff" stopOpacity=".9" />
              <stop offset="1" stopColor="#fff" stopOpacity="0" />
            </linearGradient>
          </defs>

          {/* Acabamento: brilho ambiente e sombra */}
          <g style={finishStyle}>
            <ellipse cx="400" cy="300" rx="320" ry="180" fill="url(#tr-glow)" />
            <ellipse cx="400" cy="470" rx="330" ry="26" fill="url(#tr-shadow)" />
          </g>

          {/* 1 — Traçado técnico (desenha na entrada, recua no final) */}
          <g style={linesStyle} fill="none" strokeLinecap="round" strokeLinejoin="round">
            <g stroke="rgba(169,224,107,.35)" strokeWidth="1" strokeDasharray="6 8">
              <path d="M40 305 H760" />
              <path d="M340 90 V470 M470 90 V470" />
              <circle cx="118" cy="305" r="34" />
              <circle cx="682" cy="305" r="34" />
            </g>
            <g stroke="#A9E06B" strokeWidth="2">
              <path className="draw" pathLength={1} d={LAM} />
              <path className="draw" pathLength={1} d={LAM} transform={`translate(0 ${bottom})`} />
              <rect className="draw" pathLength={1} x="70" y="276" width="126" height="70" rx="3" />
              <rect className="draw" pathLength={1} x="594" y="276" width="136" height="70" rx="3" />
              <circle cx="118" cy="305" r="15" />
              <circle cx="682" cy="305" r="15" />
            </g>
            {[3, 6, 9].map((i) => (
              <path key={i} className="draw" pathLength={1} d={LAM} transform={`translate(0 ${i * GAP})`} stroke="#A9E06B" strokeOpacity=".45" strokeWidth="1" />
            ))}
          </g>

          {/* 2 — Volume: lâminas preenchem em sequência */}
          <g>
            {COPPER.map((c, i) => (
              <path key={i} d={LAM} transform={`translate(0 ${i * GAP})`} fill="none" stroke={c} strokeWidth={5} style={layerStyle(i)} />
            ))}
          </g>

          {/* 3 — Terminais metálicos */}
          <g style={terminalStyle}>
            <rect x="70" y="276" width="126" height="58" rx="3" fill="url(#tr-tin)" />
            <rect x="70" y="334" width="126" height="12" fill="url(#tr-side)" />
            <rect x="180" y="276" width="16" height="70" fill="#C88550" opacity=".55" />
            <ellipse cx="118" cy="307" rx="16" ry="13" fill="#5B6670" />
            <ellipse cx="118" cy="304" rx="16" ry="10" fill="#1E262E" />
            <rect x="594" y="276" width="136" height="58" rx="3" fill="url(#tr-tin)" />
            <rect x="594" y="334" width="136" height="12" fill="url(#tr-side)" />
            <rect x="594" y="276" width="16" height="70" fill="#C88550" opacity=".55" />
            <ellipse cx="682" cy="307" rx="16" ry="13" fill="#5B6670" />
            <ellipse cx="682" cy="304" rx="16" ry="10" fill="#1E262E" />
            <path d="M74 280 H192 M598 280 H726" stroke="#fff" strokeWidth="2" opacity=".85" />
          </g>

          {/* 4 — Reflexo que percorre a curva e repousa no topo */}
          <path d={LAM} transform="translate(0 10)" fill="none" stroke="#FFE7CF" strokeWidth="3" strokeLinecap="round" pathLength={1} strokeDasharray="0.16 1" style={specStyle} />
          <path d={LAM} transform="translate(0 12)" fill="none" stroke="#FFE2C4" strokeOpacity=".4" strokeWidth="1.5" style={finishStyle} />
        </svg>

        {/* Reflexo do ponteiro, recortado pela silhueta da peça */}
        <div className="tr-light" aria-hidden="true" />

        <div className="tr-notes" style={notesStyle}>
          {SHUNT_NOTES.map((n, i) => (
            <span
              key={n.id}
              className={`note${n.left ? ' note--left' : ''}${activeNote === i ? ' is-active' : ''}`}
              style={{ left: `${(n.x / 800) * 100}%`, top: `${(n.y / 520) * 100}%` }}
            >
              <span className="note__dot" aria-hidden="true" />
              <span className="note__label">{n.label}</span>
            </span>
          ))}
        </div>
      </div>

      <div className="tr-phases" aria-hidden="true">
        <span>Traçado</span>
        <span>Volume</span>
        <span>Acabamento</span>
        <i className="tr-phases__bar" />
      </div>
    </div>
  );
}
