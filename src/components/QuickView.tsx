'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import type { Product } from '@/content/types';
import { Icon } from './Icon';

const ZOOM_STEPS = [1, 1.5, 2, 2.5];

/**
 * Painel lateral (<dialog> nativo): Escape fecha, foco preso pelo navegador,
 * foco devolvido ao acionador. Há uma única foto por item, então oferecemos
 * zoom com limites (nada de “360°”).
 */
export function QuickView({
  product,
  familyLabel,
  onClose,
  returnFocusTo,
}: {
  product: Product | null;
  familyLabel: string;
  onClose: () => void;
  returnFocusTo: HTMLElement | null;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  const [view, setView] = useState<'ilustracao' | 'foto'>('ilustracao');
  const [zoom, setZoom] = useState(0);

  useEffect(() => {
    const d = ref.current;
    if (product && d && !d.open) {
      setView('ilustracao');
      setZoom(0);
      d.showModal();
    }
  }, [product]);

  const handleClose = () => {
    onClose();
    returnFocusTo?.focus();
  };

  if (!product) return <dialog ref={ref} className="drawer" aria-label="Visualização rápida" onClose={handleClose} />;

  const media = view === 'foto' && product.photo ? product.photo : product.image;
  const scale = ZOOM_STEPS[zoom];

  return (
    <dialog ref={ref} className="drawer" aria-labelledby="qv-title" onClose={handleClose}>
      <div className="drawer__head">
        <p>{familyLabel}</p>
        <button type="button" className="modal__close" onClick={() => ref.current?.close()} autoFocus>
          <Icon name="close" />
          Fechar
        </button>
      </div>
      <div className="drawer__body">
        <h2 id="qv-title">{product.name}</h2>

        {product.photo && (
          <div className="view-tabs" role="group" aria-label="Tipo de imagem">
            <button type="button" aria-pressed={view === 'ilustracao'} onClick={() => { setView('ilustracao'); setZoom(0); }}>
              Ilustração técnica
            </button>
            <button type="button" aria-pressed={view === 'foto'} onClick={() => { setView('foto'); setZoom(0); }}>
              Foto recebida
            </button>
          </div>
        )}

        <figure style={{ margin: 0, display: 'grid', gap: 8 }}>
          <div className={`zoom-frame${view === 'ilustracao' ? ' zoom-frame--light' : ''}`}>
            <span className="media__label badge badge--dark" style={{ zIndex: 2 }}>
              <Icon name={view === 'foto' ? 'info' : 'image'} />
              {media.label}
            </span>
            {media.src && <img src={media.src} alt={media.alt} width={media.width} height={media.height} style={{ transform: `scale(${scale})` }} />}
          </div>
          <div className="zoom-controls">
            <button type="button" onClick={() => setZoom((z) => Math.max(0, z - 1))} disabled={zoom === 0} aria-label="Diminuir zoom">−</button>
            <output aria-live="polite">{Math.round(scale * 100)}%</output>
            <button type="button" onClick={() => setZoom((z) => Math.min(ZOOM_STEPS.length - 1, z + 1))} disabled={zoom === ZOOM_STEPS.length - 1} aria-label="Aumentar zoom">+</button>
            <span className="hint">Zoom limitado a 250%. {view === 'foto' ? 'Foto de baixa resolução, tratada digitalmente.' : 'Ilustração sem medidas reais.'}</span>
          </div>
        </figure>

        <p style={{ color: 'var(--text-secondary)' }}>{product.description}</p>
        <p className="hint">Especificações técnicas sob consulta — validar com a equipe da PSTEC.</p>
      </div>
      <div className="drawer__foot">
        <Link href={`/contato?produto=${product.slug}#formulario`} className="btn btn--primary btn--block btn--shine">
          Tenho interesse nesta solução
          <Icon name="arrow" />
        </Link>
        <Link href={`/produtos/${product.slug}`} className="btn btn--ghost btn--block">
          Ver ficha completa
        </Link>
      </div>
    </dialog>
  );
}
