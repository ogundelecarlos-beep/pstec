'use client';

import { useState } from 'react';
import { Icon } from './Icon';

export function CopyButton({ value, label }: { value: string; label: string }) {
  const [state, setState] = useState<'idle' | 'ok' | 'error'>('idle');

  async function copy() {
    try {
      await navigator.clipboard.writeText(value);
      setState('ok');
    } catch {
      setState('error');
    }
    window.setTimeout(() => setState('idle'), 2400);
  }

  return (
    <>
      <button type="button" className={`copy-btn${state === 'ok' ? ' is-done' : ''}`} onClick={copy} aria-label={`Copiar ${label}`}>
        <Icon name={state === 'ok' ? 'check' : 'copy'} />
        {state === 'ok' ? 'Copiado' : 'Copiar'}
      </button>
      <span className="visually-hidden" role="status">
        {state === 'ok' ? `${label} copiado para a área de transferência.` : state === 'error' ? `Não foi possível copiar ${label}.` : ''}
      </span>
    </>
  );
}
