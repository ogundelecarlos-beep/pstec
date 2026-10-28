import type { Metadata } from 'next';
import Link from 'next/link';
import { Icon } from '@/components/Icon';
import { Notice, PageHero, PendingBadge, StatusBadge } from '@/components/ui';
import { services } from '@/content/services';

export const metadata: Metadata = {
  title: 'Serviços',
  description: 'Serviços técnicos da PSTEC: atendimento na especificação e fornecimento de componentes conforme a aplicação. Escopo em validação.',
  alternates: { canonical: '/servicos' },
};

const icons = ['ruler', 'layers', 'gear', 'shield'] as const;

export default function ServicosPage() {
  return (
    <>
      <PageHero
        crumbs={[{ href: '/', label: 'Início' }, { label: 'Serviços' }]}
        eyebrow="Serviços técnicos"
        title="Atendimento técnico para entender a necessidade de cada aplicação"
        lead="Descrições conservadoras enquanto o escopo de cada serviço é confirmado com a PSTEC."
      />
      <section className="section">
        <div className="container">
          <div style={{ marginBottom: 32 }}>
            <Notice>
              Esta página não anuncia automação industrial, manutenção em campo, usinagem, ensaios ou engenharia de projetos. Esses itens só
              serão incluídos se confirmados pela empresa.
            </Notice>
          </div>
          <div className="grid grid--2">
            {services.map((s, i) => (
              <article key={s.id} className="card card--plain">
                <span className="card__icon"><Icon name={icons[i % icons.length]} /></span>
                <h2 style={{ fontSize: 'var(--h3)', color: 'var(--text-primary)' }}>{s.title}</h2>
                <p>{s.summary}</p>
                <div>{s.note ? <PendingBadge>{s.note}</PendingBadge> : <StatusBadge status={s.scopeStatus}>Proposta de texto</StatusBadge>}</div>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="section section--muted" aria-labelledby="como-solicitar">
        <div className="container split">
          <div className="prose">
            <h2 id="como-solicitar">Como solicitar</h2>
            <ol>
              <li>Descreva a aplicação, o material e a quantidade estimada.</li>
              <li>Informe se há desenho técnico ou peça de referência.</li>
              <li>A equipe retorna para alinhar especificação e próximos passos.</li>
            </ol>
          </div>
          <div className="btn-row">
            <Link href="/contato#formulario" className="btn btn--primary">
              Fale com a PSTEC
              <Icon name="arrow" />
            </Link>
            <Link href="/produtos" className="btn btn--secondary">Ver produtos</Link>
          </div>
        </div>
      </section>
    </>
  );
}
