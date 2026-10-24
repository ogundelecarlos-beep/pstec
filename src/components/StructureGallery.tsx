'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import type { StructureCategory, StructureItem } from '@/content/types';
import { Icon } from './Icon';

/**
 * Galeria de estrutura com filtros e modal de mídia.
 * Vídeo só é renderizado com videoSrc aprovado; caso contrário o modal
 * mostra o estado “em preparação”, sem botão de play.
 */
export function StructureGallery({
  items,
  categories,
  headingLevel = 'h3',
  showFilters = true,
}: {
  items: StructureItem[];
  categories: StructureCategory[];
  headingLevel?: 'h2' | 'h3';
  showFilters?: boolean;
}) {
  const [category, setCategory] = useState<StructureCategory | 'Todas'>('Todas');
  const [active, setActive] = useState<StructureItem | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const H = headingLevel;

  const visible = category === 'Todas' ? items : items.filter((i) => i.category === category);

  const open = (item: StructureItem, trigger: HTMLButtonElement) => {
    triggerRef.current = trigger;
    setActive(item);
  };

  useEffect(() => {
    const d = dialogRef.current;
    if (active && d && !d.open) d.showModal();
  }, [active]);

  const close = useCallback(() => {
    videoRef.current?.pause();
    dialogRef.current?.close();
  }, []);

  // Native <dialog>: Escape dispara “close”; devolvemos o foco ao acionador.
  const onClosed = () => {
    videoRef.current?.pause();
    setActive(null);
    triggerRef.current?.focus();
  };

  return (
    <div>
      {showFilters && (
        <div className="chip-group" role="group" aria-label="Filtrar por categoria" style={{ marginBottom: 24 }}>
          {(['Todas', ...categories] as const).map((c) => (
            <button key={c} type="button" className="chip" aria-pressed={category === c} onClick={() => setCategory(c)}>
              {c}
            </button>
          ))}
        </div>
      )}
      {showFilters && (
        <p className="results-count" role="status">
          {visible.length} {visible.length === 1 ? 'registro' : 'registros'}
          {category !== 'Todas' ? ` em ${category}` : ''}
        </p>
      )}

      <ul className={`grid ${visible.length === 4 ? 'grid--4' : 'grid--3'}`} style={{ listStyle: 'none', padding: 0, margin: 0 }}>
        {visible.map((item) => (
          <li key={item.id} className="catalog-item">
            <article className="card structure-card">
              <div className="card__media">
                {item.poster?.src ? (
                  <img src={item.poster.src} alt="" width={item.poster.width} height={item.poster.height} loading="lazy" />
                ) : (
                  <div className="structure-card__ph">
                    <Icon name={item.mediaType === 'video' ? 'video' : 'image'} />
                    <span>{item.mediaType === 'video' ? 'Vídeo da estrutura em preparação' : 'Fotos reais em preparação'}</span>
                  </div>
                )}
                <span className="thumb-state">
                  <Icon name={item.videoSrc ? 'video' : 'clock'} />
                  {item.videoSrc
                    ? `Vídeo pronto para reproduzir${item.duration ? ` · ${item.duration}` : ''}`
                    : item.mediaType === 'video'
                      ? 'Vídeo pendente'
                      : 'Fotos pendentes'}
                </span>
              </div>
              <div className="card__body">
                <span className="card__meta">
                  {item.category} · {item.mediaType === 'video' ? 'Vídeo' : 'Fotos'}
                </span>
                <H>{item.title}</H>
                <p>{item.summary}</p>
                <div className="card__foot">
                  <button type="button" className="card__cta" onClick={(e) => open(item, e.currentTarget)} aria-haspopup="dialog">
                    Ver apresentação<span className="visually-hidden">: {item.title}</span>
                    <Icon name="arrow" />
                  </button>
                </div>
              </div>
            </article>
          </li>
        ))}
      </ul>

      <dialog ref={dialogRef} className="modal" aria-labelledby="modal-title" onClose={onClosed}>
        {active && (
          <>
            <div className="modal__head">
              <h2 id="modal-title">{active.title}</h2>
              <button type="button" className="modal__close" onClick={close} autoFocus>
                <Icon name="close" />
                Fechar
              </button>
            </div>
            <div className="modal__body">
              <div className="video-frame">
                {active.videoSrc ? (
                  <video ref={videoRef} controls preload="none" poster={active.poster?.src ?? undefined} playsInline>
                    <source src={active.videoSrc} />
                    {active.captionsSrc && <track kind="captions" src={active.captionsSrc} srcLang="pt-BR" label="Português" default />}
                  </video>
                ) : (
                  <div className="video-frame__pending">
                    <Icon name={active.mediaType === 'video' ? 'video' : 'image'} />
                    <strong>{active.mediaType === 'video' ? 'Vídeo da estrutura em preparação' : 'Fotos reais em preparação'}</strong>
                    <p>Este espaço receberá registros reais da PSTEC após aprovação. Nenhuma imagem de banco foi usada para simular a estrutura.</p>
                  </div>
                )}
              </div>
              <p>
                <strong>{active.category}.</strong> {active.summary}
              </p>
              {active.transcript && (
                <details>
                  <summary>Transcrição</summary>
                  <p>{active.transcript}</p>
                </details>
              )}
            </div>
          </>
        )}
      </dialog>
    </div>
  );
}
