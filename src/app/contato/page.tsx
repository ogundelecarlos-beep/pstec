import type { Metadata } from 'next';
import { Suspense } from 'react';
import { ContactForm } from '@/components/ContactForm';
import { ContactLocation } from '@/components/ContactLocation';
import { PageHero } from '@/components/ui';
import { familyName, products } from '@/content/products';
import { flags } from '@/content/site';

export const metadata: Metadata = {
  title: 'Contato e orçamento',
  description: 'Solicite um orçamento à PSTEC — Produtos e Serviços Técnicos. Formulário, canais de atendimento e localização em Franco da Rocha — SP.',
  alternates: { canonical: '/contato' },
};

export default function ContatoPage() {
  const options = products.map((p) => ({ slug: p.slug, name: p.name, family: familyName(p.family), image: p.image.src }));
  return (
    <>
      <PageHero
        crumbs={[{ href: '/', label: 'Início' }, { label: 'Contato' }]}
        eyebrow="Contato"
        title="Solicitar orçamento"
        lead="Conte qual é a aplicação e o componente de que você precisa. Solicitamos apenas os dados necessários para o retorno."
      />
      <section className="section" aria-labelledby="formulario-titulo" id="formulario" data-hide-fab>
        <div className="container" style={{ maxWidth: 'calc(820px + 2 * var(--gutter))' }}>
          <h2 id="formulario-titulo" style={{ marginBottom: 24 }}>Formulário de orçamento</h2>
          <Suspense fallback={<p>Carregando formulário…</p>}>
            <ContactForm products={options} demoMode={flags.demoMode} />
          </Suspense>
        </div>
      </section>
      <ContactLocation />
    </>
  );
}
