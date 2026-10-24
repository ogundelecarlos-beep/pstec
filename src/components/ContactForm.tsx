'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useRef, useState, type FormEvent } from 'react';
import { Icon } from './Icon';
import { siteUrl } from '@/content/site';
import { whatsappUrl } from '@/lib/channels';

type Values = { nome: string; empresa: string; email: string; telefone: string; assunto: string; mensagem: string };
type Errors = Partial<Record<keyof Values, string>>;

const LIMITS = { nome: 100, empresa: 120, email: 120, telefone: 20, mensagem: 2000 } as const;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const ORDER: (keyof Values)[] = ['nome', 'empresa', 'email', 'telefone', 'assunto', 'mensagem'];

function validate(v: Values): Errors {
  const e: Errors = {};
  const nome = v.nome.trim();
  if (!nome) e.nome = 'Informe seu nome.';
  else if (nome.length < 2) e.nome = 'O nome deve ter pelo menos 2 caracteres.';
  else if (nome.length > LIMITS.nome) e.nome = `Use no máximo ${LIMITS.nome} caracteres.`;

  if (v.empresa.length > LIMITS.empresa) e.empresa = `Use no máximo ${LIMITS.empresa} caracteres.`;

  const email = v.email.trim();
  if (!email) e.email = 'Informe seu e-mail.';
  else if (email.length > LIMITS.email) e.email = `Use no máximo ${LIMITS.email} caracteres.`;
  else if (!EMAIL_RE.test(email)) e.email = 'Informe um e-mail válido, como nome@empresa.com.br.';

  const tel = v.telefone.trim();
  if (tel) {
    const digits = tel.replace(/\D/g, '');
    if (!/^[\d\s()+-]+$/.test(tel) || digits.length < 10 || digits.length > 13) e.telefone = 'Informe o telefone com DDD, como (11) 0000-0000.';
  }

  if (!v.assunto) e.assunto = 'Selecione o assunto ou produto.';

  const msg = v.mensagem.trim();
  if (!msg) e.mensagem = 'Descreva sua necessidade.';
  else if (msg.length < 10) e.mensagem = 'Escreva pelo menos 10 caracteres.';
  else if (msg.length > LIMITS.mensagem) e.mensagem = `Use no máximo ${LIMITS.mensagem} caracteres.`;
  return e;
}

type ProductOption = { slug: string; name: string; family: string; image: string | null };

/** Mantém ?produto= na URL sem criar entradas novas de histórico. */
function syncProductParam(slug: string | null) {
  const url = new URL(window.location.href);
  if (slug) url.searchParams.set('produto', slug);
  else url.searchParams.delete('produto');
  window.history.replaceState(window.history.state, '', url.pathname + url.search + url.hash);
}

export function ContactForm({ products, demoMode }: { products: ProductOption[]; demoMode: boolean }) {
  const params = useSearchParams();
  const [values, setValues] = useState<Values>({ nome: '', empresa: '', email: '', telefone: '', assunto: '', mensagem: '' });
  const [errors, setErrors] = useState<Errors>({});
  const [state, setState] = useState<'idle' | 'loading' | 'done' | 'error'>('idle');
  const formRef = useRef<HTMLFormElement>(null);
  const viaWhatsapp = params.get('canal') === 'whatsapp';

  const [itemNote, setItemNote] = useState('');
  const selectRef = useRef<HTMLSelectElement>(null);

  // Produto vindo da URL (?produto=slug): só aceito se existir no catálogo.
  // A URL é a fonte de verdade — vale para atualizar, compartilhar e voltar/avançar.
  const paramSlug = params.get('produto');
  useEffect(() => {
    if (paramSlug && products.some((p) => p.slug === paramSlug)) {
      setValues((v) => (v.assunto === `produto:${paramSlug}` ? v : { ...v, assunto: `produto:${paramSlug}` }));
    }
  }, [paramSlug, products]);

  const selectedProduct = values.assunto.startsWith('produto:')
    ? products.find((p) => `produto:${p.slug}` === values.assunto) ?? null
    : null;
  const productWa = selectedProduct ? whatsappUrl(`Produto: ${selectedProduct.name} — ${siteUrl}/produtos/${selectedProduct.slug}`) : null;

  const removeItem = () => {
    setValues((v) => ({ ...v, assunto: '' }));
    syncProductParam(null);
    setItemNote('Item removido da solicitação.');
    selectRef.current?.focus();
  };

  const set = (k: keyof Values) => (e: { target: { value: string } }) => {
    setValues((v) => ({ ...v, [k]: e.target.value }));
    if (k === 'assunto') {
      const v = e.target.value;
      syncProductParam(v.startsWith('produto:') ? v.slice(8) : null);
      setItemNote('');
    }
    if (errors[k]) setErrors((er) => ({ ...er, [k]: undefined }));
    if (state === 'done') setState('idle');
  };

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (state === 'loading') return;
    const found = validate(values);
    setErrors(found);
    const first = ORDER.find((k) => found[k]);
    if (first) {
      setState('idle');
      formRef.current?.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
      return;
    }
    setState('loading');
    // Modo demonstração: nada é enviado nem registrado.
    await new Promise((r) => setTimeout(r, 700));
    setState(demoMode ? 'done' : 'error');
  }

  const describe = (k: keyof Values, hint?: string) =>
    [hint ? `${k}-dica` : null, errors[k] ? `${k}-erro` : null].filter(Boolean).join(' ') || undefined;

  const err = (k: keyof Values) =>
    errors[k] ? (
      <span className="field__error" id={`${k}-erro`}>
        <Icon name="alert" />
        {errors[k]}
      </span>
    ) : null;

  const errorCount = Object.values(errors).filter(Boolean).length;

  return (
    <form ref={formRef} className="form" noValidate onSubmit={onSubmit} aria-label="Solicitação de orçamento" aria-describedby={demoMode ? 'form-aviso' : undefined}>
      {viaWhatsapp && (
        <div className="notice notice--info" role="note">
          <Icon name="whatsapp" />
          <p>Canal de WhatsApp em configuração. Enquanto isso, envie sua solicitação por este formulário.</p>
        </div>
      )}
      {demoMode && (
        <div className="notice" id="form-aviso">
          <Icon name="info" />
          <p>
            <strong>Modo de demonstração.</strong> Este formulário valida os dados, mas não envia nem armazena nenhuma informação.
          </p>
        </div>
      )}

      <div className="form__row form__row--2">
        <div className="field">
          <label htmlFor="nome">Nome</label>
          <input id="nome" name="nome" className="input" autoComplete="name" required maxLength={LIMITS.nome + 20}
            value={values.nome} onChange={set('nome')} aria-invalid={!!errors.nome} aria-describedby={describe('nome')} />
          {err('nome')}
        </div>
        <div className="field">
          <label htmlFor="empresa">Empresa <span className="optional">(opcional)</span></label>
          <input id="empresa" name="empresa" className="input" autoComplete="organization" maxLength={LIMITS.empresa + 20}
            value={values.empresa} onChange={set('empresa')} aria-invalid={!!errors.empresa} aria-describedby={describe('empresa')} />
          {err('empresa')}
        </div>
      </div>

      <div className="form__row form__row--2">
        <div className="field">
          <label htmlFor="email">E-mail</label>
          <input id="email" name="email" type="email" className="input" autoComplete="email" inputMode="email" required
            maxLength={LIMITS.email + 20} value={values.email} onChange={set('email')} aria-invalid={!!errors.email} aria-describedby={describe('email')} />
          {err('email')}
        </div>
        <div className="field">
          <label htmlFor="telefone">Telefone <span className="optional">(opcional)</span></label>
          <input id="telefone" name="telefone" type="tel" className="input" autoComplete="tel" inputMode="tel"
            maxLength={LIMITS.telefone} value={values.telefone} onChange={set('telefone')} aria-invalid={!!errors.telefone}
            aria-describedby={describe('telefone', 'dica')} />
          <span className="hint" id="telefone-dica">Com DDD.</span>
          {err('telefone')}
        </div>
      </div>

      {selectedProduct && (
        <div className="picked" aria-labelledby="picked-title">
          {selectedProduct.image && <img className="picked__img" src={selectedProduct.image} alt="" width={96} height={72} />}
          <div className="picked__body">
            <p className="picked__eyebrow">Item selecionado · {selectedProduct.family}</p>
            <p id="picked-title" className="picked__name">{selectedProduct.name}</p>
            <div className="picked__actions">
              <button type="button" className="btn btn--link btn--sm" onClick={() => selectRef.current?.focus()}>
                Trocar item
              </button>
              <button type="button" className="btn btn--link btn--sm" onClick={removeItem}>
                Remover
              </button>
              <a className="btn btn--link btn--sm" href={`/produtos/${selectedProduct.slug}`}>
                Ver ficha
              </a>
            </div>
            {productWa ? (
              <a className="btn btn--ghost btn--sm" href={productWa} target="_blank" rel="noopener noreferrer">
                <Icon name="whatsapp" />
                Conversar pelo WhatsApp sobre este item
                <span className="visually-hidden"> (abre em nova aba)</span>
              </a>
            ) : (
              <p className="hint">WhatsApp em configuração — esta solicitação segue por este formulário.</p>
            )}
          </div>
        </div>
      )}
      <p className="visually-hidden" role="status">{itemNote}</p>

      <div className="field">
        <label htmlFor="assunto">Assunto ou produto</label>
        <select ref={selectRef} id="assunto" name="assunto" className="input" required value={values.assunto} onChange={set('assunto')}
          aria-invalid={!!errors.assunto} aria-describedby={describe('assunto')}>
          <option value="">Selecione…</option>
          <optgroup label="Produtos (catálogo demonstrativo)">
            {products.map((p) => (
              <option key={p.slug} value={`produto:${p.slug}`}>{p.name}</option>
            ))}
          </optgroup>
          <optgroup label="Outros assuntos">
            <option value="orcamento-desenho">Orçamento conforme desenho ou amostra</option>
            <option value="fornecedor">Sou fornecedor ou parceiro</option>
            <option value="outro">Outro assunto</option>
          </optgroup>
        </select>
        {err('assunto')}
      </div>

      <div className="field">
        <label htmlFor="mensagem">Mensagem</label>
        <textarea id="mensagem" name="mensagem" className="input" required maxLength={LIMITS.mensagem + 50}
          value={values.mensagem} onChange={set('mensagem')} aria-invalid={!!errors.mensagem} aria-describedby={describe('mensagem', 'dica')} />
        <span className="hint" id="mensagem-dica">
          Descreva aplicação, material, quantidade e prazo desejado, se souber. {values.mensagem.length}/{LIMITS.mensagem}
        </span>
        {err('mensagem')}
      </div>

      <p className="hint">Anexos técnicos não são recebidos nesta versão. Se houver desenho, mencione na mensagem.</p>

      <div>
        <button type="submit" className={`btn btn--primary${state === 'loading' ? ' is-loading' : ''}`} aria-disabled={state === 'loading'}>
          {state === 'loading' ? <span className="spinner" aria-hidden="true" /> : <Icon name="check" />}
          {state === 'loading' ? 'Verificando…' : demoMode ? 'Testar solicitação' : 'Enviar solicitação'}
        </button>
      </div>

      <div role="status" aria-live="polite" aria-atomic="true">
        {state === 'done' && (
          <div className="form-status form-status--ok">
            <svg className="check-draw" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" strokeWidth="1.6" opacity=".35" />
              <path d="M7 12.5l3.2 3.2L17 9" pathLength={1} />
            </svg>
            <p>Demonstração concluída. Nenhuma mensagem foi enviada.</p>
          </div>
        )}
        {state === 'error' && (
          <div className="form-status form-status--error">
            <Icon name="alert" />
            <p>O envio real ainda não está configurado. Nenhuma mensagem foi enviada.</p>
          </div>
        )}
        {state === 'idle' && errorCount > 0 && (
          <p className="visually-hidden">
            {errorCount === 1 ? 'Há 1 campo para corrigir.' : `Há ${errorCount} campos para corrigir.`}
          </p>
        )}
      </div>
    </form>
  );
}
