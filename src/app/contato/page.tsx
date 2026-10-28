import type { Metadata } from 'next';
import { Suspense } from 'react';
import { ContactForm } from '@/components/ContactForm';
import { ContactLocation } from '@/components/ContactLocation';
import { PageHero } from '@/components/ui';
import { flags } from '@/content/site';

export const metadata: Metadata = {
  title: 'Contato',
  description: 'Fale com a PSTEC — Produtos e Serviços Técnicos. Formulário, canais de atendimento e localização em Franco da Rocha — SP.',
  alternates: { canonical: '/contato' },
};

export default function ContatoPage() {
  return (
    <>
      <PageHero
        crumbs={[{ href: '/', label: 'Início' }, { label: 'Contato' }]}
        eyebrow="Contato"
        title="Fale com a PSTEC"
        lead="Deixe seus dados e uma mensagem: a equipe da PSTEC entra em contato. Solicitamos apenas o necessário para o retorno."
      />
      <section className="section" aria-labelledby="formulario-titulo" id="formulario" data-hide-fab>
        <div className="container" style={{ maxWidth: 'calc(820px + 2 * var(--gutter))' }}>
          <h2 id="formulario-titulo" style={{ marginBottom: 24 }}>Envie uma mensagem</h2>
          <Suspense fallback={<p>Carregando formulário…</p>}>
            <ContactForm demoMode={flags.demoMode} />
          </Suspense>
        </div>
      </section>
      <ContactLocation />
    </>
  );
}
