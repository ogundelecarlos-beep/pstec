'use client';

import Link from 'next/link';
import { useEffect, useMemo, useRef, useState } from 'react';
import { flushSync } from 'react-dom';
import type { Product, ProductFamily } from '@/content/types';
import { Icon } from './Icon';
import { ProductCard } from './ProductCard';
import { QuickView } from './QuickView';

const normalize = (s: string) => s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();

/**
 * Vitrine de produtos com busca, filtro por família (refletidos na URL),
 * reorganização animada via View Transitions quando disponível e painel
 * de visualização rápida. A ordem do DOM (e do foco) segue a ordem visual.
 */
export function ProductCatalog({
  products,
  families,
  showFilters = true,
  headingLevel = 'h2',
  gridClass = 'grid--3',
}: {
  products: Product[];
  families: ProductFamily[];
  showFilters?: boolean;
  headingLevel?: 'h2' | 'h3';
  gridClass?: string;
}) {
  const [query, setQuery] = useState('');
  const [family, setFamily] = useState<string>('todas');
  const [cleared, setCleared] = useState(false);
  const [quick, setQuick] = useState<Product | null>(null);
  const [trigger, setTrigger] = useState<HTMLElement | null>(null);
  const ready = useRef(false);
  const searchRef = useRef<HTMLInputElement>(null);
  const countRef = useRef<HTMLParagraphElement>(null);

  // Estado inicial a partir da URL (?q=&familia=) — permite compartilhar o filtro.
  useEffect(() => {
    if (!showFilters) return;
    const params = new URLSearchParams(window.location.search);
    setQuery(params.get('q') ?? '');
    const f = params.get('familia');
    if (f && families.some((x) => x.id === f)) setFamily(f);
    ready.current = true;
  }, [families, showFilters]);

  useEffect(() => {
    if (!ready.current) return;
    const params = new URLSearchParams();
    if (query.trim()) params.set('q', query.trim());
    if (family !== 'todas') params.set('familia', family);
    const qs = params.toString();
    window.history.replaceState(window.history.state, '', `${window.location.pathname}${qs ? `?${qs}` : ''}`);
  }, [query, family]);

  const results = useMemo(() => {
    const q = normalize(query.trim());
    return products.filter((p) => {
      if (family !== 'todas' && p.family !== family) return false;
      if (!q) return true;
      const hay = normalize([p.name, p.summary, p.description, ...p.keywords].join(' '));
      return q.split(/\s+/).every((term) => hay.includes(term));
    });
  }, [products, query, family]);

  const famName = (id: string) => families.find((f) => f.id === id)?.name ?? id;
  const shortName = (id: string) => families.find((f) => f.id === id)?.shortName ?? id;

  /** Reorganização suave quando o navegador suporta View Transitions. */
  const animated = (update: () => void) => {
    const doc = document as Document & { startViewTransition?: (cb: () => void) => unknown };
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (doc.startViewTransition && !reduce) doc.startViewTransition(() => flushSync(update));
    else update();
  };

  const flash = () => {
    const el = countRef.current;
    if (!el) return;
    el.classList.remove('is-flash');
    void el.offsetWidth;
    el.classList.add('is-flash');
  };

  const chooseFamily = (id: string) => {
    setCleared(false);
    animated(() => setFamily(id));
    flash();
  };

  const clear = () => {
    animated(() => {
      setQuery('');
      setFamily('todas');
      setCleared(true);
    });
    flash();
    searchRef.current?.focus();
  };

  return (
    <div>
      {showFilters && (
        <>
          <div className="filters" role="search" aria-label="Filtrar catálogo">
            <div className="field">
              <label htmlFor="busca">Buscar por nome ou descrição</label>
              <input
                ref={searchRef}
                id="busca"
                className="input"
                type="search"
                value={query}
                onChange={(e) => {
                  setCleared(false);
                  setQuery(e.target.value);
                }}
                maxLength={80}
                autoComplete="off"
                aria-describedby="busca-dica"
              />
              <span id="busca-dica" className="hint">Ex.: cordoalha, barra, contato</span>
            </div>
            <div>
              <p id="familia-label" style={{ fontWeight: 600, marginBottom: 6 }}>
                Família / material
              </p>
              <div className="chip-group" role="group" aria-labelledby="familia-label">
                <button type="button" className="chip" aria-pressed={family === 'todas'} onClick={() => chooseFamily('todas')}>
                  Todas
                </button>
                {families.map((f) => (
                  <button key={f.id} type="button" className="chip" aria-pressed={family === f.id} onClick={() => chooseFamily(f.id)}>
                    {f.shortName}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <p ref={countRef} className="results-count" role="status" aria-live="polite">
            {cleared && (
              <span className="badge badge--ok" style={{ marginRight: 8 }}>
                <Icon name="check" />
                Filtros limpos
              </span>
            )}
            {results.length === 1 ? '1 item encontrado' : `${results.length} itens encontrados`}
            {family !== 'todas' ? ` em ${famName(family)}` : ''}
            {query.trim() ? ` para “${query.trim()}”` : ''}
          </p>
        </>
      )}

      {results.length > 0 ? (
        <ul className={`grid ${gridClass}`} style={{ listStyle: 'none', padding: 0, margin: 0 }}>
          {results.map((p) => (
            <li key={p.slug} className="catalog-item" style={{ viewTransitionName: `card-${p.slug}` }}>
              <ProductCard
                product={p}
                familyLabel={shortName(p.family)}
                headingLevel={headingLevel}
                onQuickView={(btn) => {
                  setTrigger(btn);
                  setQuick(p);
                }}
              />
            </li>
          ))}
        </ul>
      ) : (
        <div className="empty-state">
          <Icon name="search" className="card__icon" />
          <h2 style={{ fontSize: 'var(--h3)' }}>Nenhum item corresponde aos filtros</h2>
          <p>Revise o termo buscado ou descreva sua necessidade no formulário de orçamento.</p>
          <div className="btn-row" style={{ justifyContent: 'center' }}>
            <button type="button" className="btn btn--secondary" onClick={clear}>
              Limpar filtros
            </button>
            <Link href="/contato#formulario" className="btn btn--primary">
              Solicitar orçamento
            </Link>
          </div>
        </div>
      )}

      <QuickView
        product={quick}
        familyLabel={quick ? famName(quick.family) : ''}
        onClose={() => setQuick(null)}
        returnFocusTo={trigger}
      />
    </div>
  );
}
