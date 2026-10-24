'use client';

import { useState } from 'react';
import { Icon } from './Icon';
import { SHUNT_VIEWBOX, ShuntLines, ShuntVolume } from './art/ShuntArt';

/**
 * Comparador “Do detalhe à aplicação”: a MESMA representação conceitual em
 * duas versões (linhas × volume). Controle nativo <input type="range">:
 * mouse, toque e teclado (setas, Home/End, PageUp/PageDown).
 */
export function CompareSlider() {
  const [pos, setPos] = useState(50);

  return (
    <figure style={{ margin: 0 }}>
      <div className="compare" style={{ ['--pos' as string]: `${pos}%` }}>
        <div className="compare__pane compare__pane--lines">
          <svg viewBox={SHUNT_VIEWBOX} aria-hidden="true">
            <ShuntLines />
          </svg>
        </div>
        <div className="compare__pane compare__pane--volume">
          <svg viewBox={SHUNT_VIEWBOX} aria-hidden="true">
            <ShuntVolume id="cmp" />
          </svg>
        </div>
        <span className="compare__tag compare__tag--l badge badge--dark">Desenho em linhas</span>
        <span className="compare__tag compare__tag--r badge badge--dark">Versão com volume</span>
        <input
          className="compare__range"
          type="range"
          min={0}
          max={100}
          step={1}
          value={pos}
          onChange={(e) => setPos(Number(e.target.value))}
          aria-label="Comparar desenho em linhas e versão com volume da representação conceitual"
          aria-valuetext={`${pos}% desenho em linhas, ${100 - pos}% versão com volume`}
          aria-describedby="compare-help"
        />
        <div className="compare__handle" aria-hidden="true">
          <span className="compare__knob">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 6l-6 6 6 6M15 6l6 6-6 6" />
            </svg>
          </span>
        </div>
      </div>
      <p id="compare-help" className="compare-help">Arraste o puxador ou use as setas do teclado para comparar o desenho com a peça.</p>
      <figcaption className="compare-steps">
        <span className="badge badge--info">
          <Icon name="image" />
          Demonstração visual — mesma geometria conceitual em duas versões
        </span>
        <span className="badge badge--pending">
          <Icon name="info" />
          Sem dimensões ou especificações
        </span>
      </figcaption>
    </figure>
  );
}
