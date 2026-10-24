'use client';

import { useEffect, useRef, useState } from 'react';
import { storyChapters } from '@/content/structure';
import { Icon } from './Icon';

type Art = (typeof storyChapters)[number]['art'];

/** Esquemas abstratos do que cada mídia mostrará. Não representam a fábrica. */
function StoryArt({ art }: { art: Art }) {
  const s = { fill: 'none', stroke: 'rgba(169,224,107,.85)', strokeWidth: 2, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const };
  const m = { fill: 'none', stroke: 'rgba(255,255,255,.28)', strokeWidth: 1.2, strokeDasharray: '5 7' };
  return (
    <svg viewBox="0 0 400 240" aria-hidden="true">
      {art === 'equipamentos' && (
        <g>
          <path {...m} d="M20 200 H380" />
          <path {...s} className="draw-on" pathLength={1} d="M60 200 V120 H180 V200 M180 150 H260 V200 M70 120 V80 H140 V120" />
          <circle {...s} className="draw-on" pathLength={1} cx="320" cy="140" r="36" />
          <circle {...s} cx="320" cy="140" r="10" />
          <path {...m} d="M320 60 V100 M320 180 V220 M240 140 H280" />
        </g>
      )}
      {art === 'processos' && (
        <g>
          {[70, 200, 330].map((x, i) => (
            <g key={x}>
              <rect {...s} className="draw-on" pathLength={1} x={x - 44} y="90" width="88" height="60" rx="8" />
              <text x={x} y="126" textAnchor="middle" fill="rgba(255,255,255,.75)" fontSize="15" fontFamily="ui-monospace, monospace">
                {`ETAPA ${i + 1}`}
              </text>
            </g>
          ))}
          <path {...s} className="draw-on" pathLength={1} d="M114 120 H156 M244 120 H286" />
          <path {...s} d="M150 114 l6 6 -6 6 M280 114 l6 6 -6 6" />
          <path {...m} d="M26 180 H374" />
        </g>
      )}
      {art === 'automacoes' && (
        <g>
          <rect {...s} className="draw-on" pathLength={1} x="90" y="40" width="220" height="140" rx="10" />
          <path {...s} className="draw-on" pathLength={1} d="M140 205 A70 24 0 1 0 260 205" />
          <path {...s} d="M254 196 l8 10 -12 3" />
          <path {...m} d="M120 90 H280 M120 120 H240 M120 150 H260" />
        </g>
      )}
      {art === 'estrutura' && (
        <g>
          <path {...s} className="draw-on" pathLength={1} d="M40 200 V80 L120 40 L200 80 V200 Z" />
          <path {...s} className="draw-on" pathLength={1} d="M200 200 V100 H360 V200 Z" />
          <path {...m} d="M20 200 H380 M80 200 V140 H160 V200 M230 130 H330 M230 160 H330" />
        </g>
      )}
    </svg>
  );
}

function Visual({ chapter, active, inline }: { chapter: (typeof storyChapters)[number]; active?: boolean; inline?: boolean }) {
  const panel = (
    <div className={`story-visual__panel${active ? ' is-active' : ''}`} aria-hidden={inline ? undefined : !active}>
      <span className="badge badge--pending">
        <Icon name="clock" />
        Mídia real pendente
      </span>
      <StoryArt art={chapter.art} />
      <div className="story-visual__meta">
        <strong>{chapter.title}</strong>
        <span>Espaço reservado — esquema ilustrativo do conteúdo futuro</span>
      </div>
    </div>
  );
  return inline ? <div className="story-visual">{panel}</div> : panel;
}

/**
 * Narrativa: no desktop, a mídia acompanha a leitura (sticky, trecho curto) e
 * muda conforme o capítulo ativo; rolagem nativa preservada. No celular, cada
 * capítulo é um bloco completo com a própria mídia.
 */
export function StructureStory({ headingLevel = 'h3' }: { headingLevel?: 'h2' | 'h3' }) {
  const [active, setActive] = useState(0);
  const refs = useRef<(HTMLLIElement | null)[]>([]);

  useEffect(() => {
    if (!('IntersectionObserver' in window)) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(Number((e.target as HTMLElement).dataset.index));
        });
      },
      { rootMargin: '-45% 0px -45% 0px' },
    );
    refs.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, []);

  const H = headingLevel;

  return (
    <div className="story">
      <ol className="story__steps">
        {storyChapters.map((c, i) => (
          <li
            key={c.id}
            id={c.id}
            data-index={i}
            ref={(el) => {
              refs.current[i] = el;
            }}
            className={`story__chapter${active === i ? ' is-active' : ''}`}
          >
            <span className="story__index">{String(i + 1).padStart(2, '0')} / {String(storyChapters.length).padStart(2, '0')}</span>
            <H>{c.title}</H>
            <p>{c.text}</p>
            <ul aria-label="O que será mostrado">
              {c.willShow.map((w) => (
                <li key={w}>{w}</li>
              ))}
            </ul>
            <Visual chapter={c} inline />
          </li>
        ))}
      </ol>
      <div className="story__media" aria-hidden="true">
        <div className="story-visual">
          {storyChapters.map((c, i) => (
            <Visual key={c.id} chapter={c} active={active === i} />
          ))}
        </div>
      </div>
    </div>
  );
}
