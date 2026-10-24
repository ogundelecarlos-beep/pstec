'use client';

import { useCallback, useEffect, useRef, useState, type KeyboardEvent } from 'react';
import { facilityImage, facilityPoints, type FacilityPoint } from '@/content/facility';
import { FacilityArt } from './art/FacilityArt';
import { Icon } from './Icon';

/**
 * Explorador de estrutura com pontos interativos.
 * - Marcadores e lista (acordeão) controlam o mesmo estado: um ponto por vez.
 * - Imagem nunca é recortada (mesma proporção do quadro), então os marcadores
 *   ficam sobre o elemento correto em qualquer largura.
 * - Escape fecha o ponto aberto e devolve o foco a quem o abriu.
 */
export function FacilityExplorer({ headingLevel = 'h3' }: { headingLevel?: 'h3' | 'h4' }) {
  const [selected, setSelected] = useState<string | null>(null);
  const [lightbox, setLightbox] = useState<FacilityPoint | null>(null);
  const triggerRef = useRef<HTMLElement | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const H = headingLevel;

  const toggle = (id: string, trigger: HTMLElement) => {
    triggerRef.current = trigger;
    setSelected((s) => (s === id ? null : id));
  };

  const close = useCallback(() => {
    setSelected(null);
    triggerRef.current?.focus();
  }, []);

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Escape' && selected && !lightbox) {
      e.preventDefault();
      close();
    }
  };

  // No celular a lista fica abaixo da imagem: ao tocar um marcador, mostra o detalhe.
  useEffect(() => {
    if (!selected || !triggerRef.current?.classList.contains('fx__marker')) return;
    if (window.matchMedia('(min-width: 1024px)').matches) return;
    document.getElementById(`fx-panel-${selected}`)?.parentElement?.scrollIntoView({ block: 'nearest' });
  }, [selected]);

  useEffect(() => {
    if (lightbox && dialogRef.current && !dialogRef.current.open) dialogRef.current.showModal();
  }, [lightbox]);

  return (
    <div className="fx" onKeyDown={onKeyDown}>
      <figure className="fx__figure">
        <span className="fx__label badge badge--dark">
          <Icon name="image" />
          {facilityImage.label}
        </span>
        <div className="fx__frame" style={{ aspectRatio: `${facilityImage.width} / ${facilityImage.height}` }}>
          <FacilityArt />
          {facilityPoints.map((p, i) => {
            const active = selected === p.id;
            return (
              <button
                key={p.id}
                type="button"
                className={`fx__marker${active ? ' is-active' : ''}`}
                style={{ left: `${(p.x / facilityImage.width) * 100}%`, top: `${(p.y / facilityImage.height) * 100}%` }}
                aria-expanded={active}
                aria-controls={`fx-panel-${p.id}`}
                aria-label={`Ponto ${i + 1}: ${p.title}`}
                onClick={(e) => toggle(p.id, e.currentTarget)}
              >
                <span aria-hidden="true">{i + 1}</span>
              </button>
            );
          })}
        </div>
        <figcaption className="fx__hint">
          Selecione um ponto na imagem ou na lista. Cada ponto explica esta representação e o que será mostrado com registros reais.
        </figcaption>
      </figure>

      <ol className="fx__list">
        {facilityPoints.map((p, i) => {
          const active = selected === p.id;
          return (
            <li key={p.id} className={`fx__item${active ? ' is-active' : ''}`}>
              <H className="fx__item-head">
                <button
                  type="button"
                  className="fx__toggle"
                  aria-expanded={active}
                  aria-controls={`fx-panel-${p.id}`}
                  onClick={(e) => toggle(p.id, e.currentTarget)}
                >
                  <span className="fx__num" aria-hidden="true">{i + 1}</span>
                  <span className="fx__title">{p.title}</span>
                  <svg className="fx__chev" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                    <path d="M6 9l6 6 6-6" />
                  </svg>
                </button>
              </H>
              <div id={`fx-panel-${p.id}`} role="region" aria-label={p.title} className="fx__panel" hidden={!active}>
                <p>{p.summary}</p>
                <p className="fx__will">
                  <strong>Será mostrado:</strong> {p.willShow}
                </p>
                <div className="fx__actions">
                  {p.media ? (
                    <button type="button" className="btn btn--ghost btn--sm" onClick={() => setLightbox(p)}>
                      <Icon name={p.media.type === 'video' ? 'video' : 'image'} />
                      {p.media.type === 'video' ? 'Assistir vídeo' : 'Ver foto ampliada'}
                    </button>
                  ) : (
                    <span className="badge badge--pending">
                      <Icon name="clock" />
                      Foto ou vídeo real em preparação
                    </span>
                  )}
                  <button type="button" className="btn btn--link btn--sm" onClick={close}>
                    Fechar detalhes
                  </button>
                </div>
              </div>
            </li>
          );
        })}
      </ol>

      <dialog
        ref={dialogRef}
        className="modal"
        aria-labelledby="fx-lightbox-title"
        onClose={() => {
          setLightbox(null);
          triggerRef.current?.focus();
        }}
      >
        {lightbox?.media && (
          <>
            <div className="modal__head">
              <h2 id="fx-lightbox-title">{lightbox.title}</h2>
              <button type="button" className="modal__close" onClick={() => dialogRef.current?.close()} autoFocus>
                <Icon name="close" />
                Fechar
              </button>
            </div>
            <div className="modal__body">
              <div className="video-frame">
                {lightbox.media.type === 'video' ? (
                  <video controls preload="none" poster={lightbox.media.poster} playsInline>
                    <source src={lightbox.media.src} />
                  </video>
                ) : (
                  <img src={lightbox.media.src} alt={lightbox.media.alt} />
                )}
              </div>
            </div>
          </>
        )}
      </dialog>
    </div>
  );
}
