import type { Metadata } from 'next';
import Link from 'next/link';
import { Icon } from '@/components/Icon';
import { Notice, PageHero, PendingBadge } from '@/components/ui';

export const metadata: Metadata = {
  title: 'Qualidade',
  description: 'Abordagem de qualidade da PSTEC e espaço preparado para certificados e documentos técnicos aprovados.',
  alternates: { canonical: '/qualidade' },
};

const slots = [
  { icon: 'shield' as const, title: 'Certificados', text: 'Certificados vigentes, com escopo, número e validade.' },
  { icon: 'doc' as const, title: 'Documentos técnicos', text: 'Fichas e desenhos técnicos de produtos aprovados.' },
  { icon: 'check' as const, title: 'Controle de qualidade', text: 'Descrição das etapas de inspeção adotadas pela PSTEC.' },
];

export default function QualidadePage() {
  return (
    <>
      <PageHero
        crumbs={[{ href: '/', label: 'Início' }, { href: '/empresa', label: 'Empresa' }, { label: 'Qualidade' }]}
        eyebrow="Qualidade"
        title="Qualidade e documentos técnicos"
        lead="Área institucional preparada para receber documentos reais."
      />
      <section className="section">
        <div className="container">
          <div style={{ marginBottom: 32 }}>
            <Notice tone="info">Informações de qualidade e documentos técnicos serão disponibilizados após validação.</Notice>
          </div>
          <div className="grid grid--3">
            {slots.map((s) => (
              <article key={s.title} className="card card--plain">
                <span className="card__icon"><Icon name={s.icon} /></span>
                <h2 style={{ fontSize: 'var(--h3)', color: 'var(--text-primary)' }}>{s.title}</h2>
                <p>{s.text}</p>
                <div><PendingBadge>Não disponível</PendingBadge></div>
              </article>
            ))}
          </div>
          <p className="action-note" style={{ marginTop: 32 }}>
            Nenhum selo, norma, acreditação ou rastreabilidade é apresentado sem evidência documental.{' '}
            <Link href="/contato#formulario">Fale com a equipe</Link> para solicitar informações técnicas.
          </p>
        </div>
      </section>
    </>
  );
}
