'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { Icon } from './Icon';

export type SlideItem = { slug: string; name: string; family: string; src: string; alt: string };

/** Velocidade da faixa em px/s: devagar por padrão, mais lenta sob o mouse. */
const SPEED = 28;
const HOVER_FACTOR = 0.25;
/** Cópias da sequência para a faixa nunca ficar vazia em telas largas. */
const COPIES = 3;
/** Acima disso (px) o gesto conta como arrasto e não abre a peça. */
const DRAG_THRESHOLD = 6;

/**
 * Faixa contínua de fotos reais. Passa sozinha e devagar; o mouse desacelera,
 * arrastar move a faixa (com inércia) e um clique abre a ficha da peça.
 * Teclado: Tab percorre as peças (a faixa para e mostra a focada); há botão
 * de pausa. Com movimento reduzido a faixa começa parada e o botão a inicia.
 */
export function ProductSlider({ items }: { items: SlideItem[] }) {
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLUListElement>(null);
  const [paused, setPaused] = useState(false);
  const pausedRef = useRef(false);
  pausedRef.current = paused;

  const state = useRef({ x: 0, setWidth: 0, hover: false, focus: false, dragging: false, moved: 0, lastX: 0, lastT: 0, velocity: 0 });

  useEffect(() => {
    const viewport = viewportRef.current;
    const track = trackRef.current;
    if (!viewport || !track) return;
    const s = state.current;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) setPaused(true);

    const measure = () => {
      s.setWidth = track.scrollWidth / COPIES;
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(track);

    const wrap = () => {
      if (!s.setWidth) return;
      s.x = ((s.x % s.setWidth) + s.setWidth) % s.setWidth;
    };

    let raf = 0;
    let prev = performance.now();
    const tick = (now: number) => {
      const dt = Math.min(64, now - prev) / 1000;
      prev = now;
      if (!s.dragging) {
        if (Math.abs(s.velocity) > 5) {
          // Inércia depois de soltar o arrasto.
          s.x += s.velocity * dt;
          s.velocity *= Math.pow(0.04, dt);
        } else {
          s.velocity = 0;
          const auto = !pausedRef.current && !s.focus;
          if (auto) s.x += SPEED * (s.hover ? HOVER_FACTOR : 1) * dt;
        }
      }
      wrap();
      track.style.transform = `translate3d(${-s.x}px, 0, 0)`;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, []);

  const onPointerDown = (e: React.PointerEvent) => {
    if (e.pointerType === 'mouse' && e.button !== 0) return;
    const s = state.current;
    s.dragging = true;
    s.moved = 0;
    s.velocity = 0;
    s.lastX = e.clientX;
    s.lastT = performance.now();
  };

  const onPointerMove = (e: React.PointerEvent) => {
    const s = state.current;
    if (!s.dragging) return;
    const dx = e.clientX - s.lastX;
    const now = performance.now();
    s.moved += Math.abs(dx);
    // Captura só depois do limite: assim um clique simples continua sendo clique no link.
    if (s.moved > DRAG_THRESHOLD && !viewportRef.current?.hasPointerCapture(e.pointerId)) {
      viewportRef.current?.setPointerCapture(e.pointerId);
    }
    s.x -= dx;
    s.velocity = (-dx / Math.max(1, now - s.lastT)) * 1000;
    s.lastX = e.clientX;
    s.lastT = now;
  };

  const endDrag = () => {
    const s = state.current;
    if (!s.dragging) return;
    s.dragging = false;
    if (performance.now() - s.lastT > 80) s.velocity = 0;
  };

  // Um arrasto não deve abrir a peça ao soltar.
  const onClickCapture = (e: React.MouseEvent) => {
    if (state.current.moved > DRAG_THRESHOLD) {
      e.preventDefault();
      e.stopPropagation();
    }
  };

  // Foco por teclado: para a faixa e traz a peça focada para a área visível.
  const onFocusCard = (el: HTMLElement) => {
    const s = state.current;
    s.focus = true;
    s.velocity = 0;
    const viewport = viewportRef.current;
    if (!viewport) return;
    const card = el.closest('li') as HTMLElement | null;
    if (!card) return;
    viewport.scrollLeft = 0; // o navegador pode rolar o contêiner ao focar
    s.x = card.offsetLeft - 24;
  };

  const sequence = Array.from({ length: COPIES }, (_, copy) => items.map((item) => ({ item, copy }))).flat();

  return (
    <div className="pslider">
      <div
        ref={viewportRef}
        className="pslider__viewport"
        onPointerEnter={(e) => e.pointerType === 'mouse' && (state.current.hover = true)}
        onPointerLeave={() => {
          state.current.hover = false;
          endDrag();
        }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        onClickCapture={onClickCapture}
        onBlur={(e) => {
          if (!e.currentTarget.contains(e.relatedTarget as Node)) state.current.focus = false;
        }}
      >
        <ul ref={trackRef} className="pslider__track" aria-label="Peças fabricadas pela PSTEC">
          {sequence.map(({ item, copy }) => {
            const clone = copy > 0;
            return (
              <li key={`${copy}-${item.slug}`} className="pslider__item" aria-hidden={clone || undefined}>
                <Link
                  href={`/produtos/${item.slug}`}
                  className="pslider__card"
                  tabIndex={clone ? -1 : undefined}
                  draggable={false}
                  onFocus={(e) => onFocusCard(e.currentTarget)}
                >
                  <img src={item.src} alt={clone ? '' : item.alt} draggable={false} loading={copy === 0 ? 'eager' : 'lazy'} />
                  <span className="pslider__meta">
                    <span className="pslider__family">{item.family}</span>
                    <span className="pslider__name">{item.name}</span>
                    <span className="pslider__go">
                      Ver peça
                      <Icon name="arrow" />
                    </span>
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
      <div className="pslider__bar">
        <p className="pslider__hint">
          <Icon name="info" />
          Arraste para navegar · clique na foto para ver a peça. Fotos reais enviadas pela PSTEC, tratadas digitalmente.
        </p>
        <button type="button" className="pslider__toggle" onClick={() => setPaused((p) => !p)} aria-pressed={paused}>
          {paused ? 'Iniciar movimento' : 'Pausar movimento'}
        </button>
      </div>
    </div>
  );
}
