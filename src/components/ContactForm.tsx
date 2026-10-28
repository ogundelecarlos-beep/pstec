'use client';

import { useSearchParams } from 'next/navigation';
import { useRef, useState, type FormEvent } from 'react';
import { Icon } from './Icon';

type Values = { nome: string; empresa: string; email: string; telefone: string; mensagem: string };
type Errors = Partial<Record<keyof Values, string>>;

const LIMITS = { nome: 100, empresa: 120, email: 120, telefone: 20, mensagem: 2000 } as const;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const ORDER: (keyof Values)[] = ['nome', 'empresa', 'email', 'telefone', 'mensagem'];

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

  const msg = v.mensagem.trim();
  if (!msg) e.mensagem = 'Escreva sua mensagem.';
  else if (msg.length < 10) e.mensagem = 'Escreva pelo menos 10 caracteres.';
  else if (msg.length > LIMITS.mensagem) e.mensagem = `Use no máximo ${LIMITS.mensagem} caracteres.`;
  return e;
}

/**
 * Pedido de contato. A PSTEC prefere ser contatada a receber pedidos pelo
 * site: não há seleção de produto nem item na solicitação.
 */
export function ContactForm({ demoMode }: { demoMode: boolean }) {
  const params = useSearchParams();
  const [values, setValues] = useState<Values>({ nome: '', empresa: '', email: '', telefone: '', mensagem: '' });
  const [errors, setErrors] = useState<Errors>({});
  const [state, setState] = useState<'idle' | 'loading' | 'done' | 'error'>('idle');
  const formRef = useRef<HTMLFormElement>(null);
  const viaWhatsapp = params.get('canal') === 'whatsapp';

  const set = (k: keyof Values) => (e: { target: { value: string } }) => {
    setValues((v) => ({ ...v, [k]: e.target.value }));
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
    <form ref={formRef} className="form" noValidate onSubmit={onSubmit} aria-label="Pedido de contato" aria-describedby={demoMode ? 'form-aviso' : undefined}>
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

      <div className="field">
        <label htmlFor="mensagem">Mensagem</label>
        <textarea id="mensagem" name="mensagem" className="input" required maxLength={LIMITS.mensagem + 50}
          value={values.mensagem} onChange={set('mensagem')} aria-invalid={!!errors.mensagem} aria-describedby={describe('mensagem', 'dica')} />
        <span className="hint" id="mensagem-dica">
          Conte brevemente como podemos ajudar. A equipe entra em contato. {values.mensagem.length}/{LIMITS.mensagem}
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
