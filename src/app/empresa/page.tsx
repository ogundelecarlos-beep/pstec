import type { Metadata } from 'next';
import Link from 'next/link';
import { Icon } from '@/components/Icon';
import { Notice, PageHero, PendingBadge, SectionTitle } from '@/components/ui';
import { company } from '@/content/site';

export const metadata: Metadata = {
  title: 'Empresa',
  description: 'Conheça a PSTEC — Produtos e Serviços Técnicos: posicionamento, estrutura e abordagem de qualidade, em Franco da Rocha — SP.',
  alternates: { canonical: '/empresa' },
};

export default function EmpresaPage() {
  return (
    <>
      <PageHero
        crumbs={[{ href: '/', label: 'Início' }, { label: 'Empresa' }]}
        eyebrow="Empresa"
        title="PSTEC — Produtos e Serviços Técnicos"
        lead="Componentes e soluções técnicas para aplicações do setor industrial e elétrico, a partir de Franco da Rocha — SP."
      />

      <section className="section" aria-labelledby="apresentacao">
        <div className="container split">
          <div className="prose">
            <h2 id="apresentacao">Apresentação</h2>
            <p>
              A PSTEC fornece componentes técnicos para o contexto industrial e elétrico, com famílias em cobre, alumínio e aço inoxidável,
              contatos elétricos e componentes para aplicações em seccionadoras e disjuntores.
            </p>
            <p>
              O atendimento parte da aplicação do cliente: entender a peça, o equipamento e as condições de uso antes de indicar material,
              processo e acabamento.
            </p>
          </div>
          <div className="panel panel--muted">
            <h3>Dados institucionais</h3>
            <dl style={{ margin: 0, display: 'grid', gap: 12 }}>
              <div>
                <dt style={{ fontWeight: 600, color: 'var(--text-secondary)', fontSize: 'var(--text-sm)' }}>Marca</dt>
                <dd style={{ margin: 0 }}>{company.brand.value}</dd>
              </div>
              <div>
                <dt style={{ fontWeight: 600, color: 'var(--text-secondary)', fontSize: 'var(--text-sm)' }}>Nome apresentado</dt>
                <dd style={{ margin: 0 }}>{company.displayName.value}</dd>
              </div>
              <div>
                <dt style={{ fontWeight: 600, color: 'var(--text-secondary)', fontSize: 'var(--text-sm)' }}>Localização</dt>
                <dd style={{ margin: 0 }}>{company.city.value}</dd>
              </div>
              <div>
                <dt style={{ fontWeight: 600, color: 'var(--text-secondary)', fontSize: 'var(--text-sm)' }}>Razão social e CNPJ</dt>
                <dd style={{ margin: 0 }}><PendingBadge>Em validação</PendingBadge></dd>
              </div>
              <div>
                <dt style={{ fontWeight: 600, color: 'var(--text-secondary)', fontSize: 'var(--text-sm)' }}>História e tempo de mercado</dt>
                <dd style={{ margin: 0 }}><PendingBadge>Aguardando informações da PSTEC</PendingBadge></dd>
              </div>
            </dl>
          </div>
        </div>
      </section>

      <section className="section section--muted" aria-labelledby="posicionamento">
        <div className="container">
          <SectionTitle id="posicionamento" eyebrow="Posicionamento" title="Como a PSTEC trabalha" />
          <div className="grid grid--3">
            <article className="card card--plain">
              <span className="card__icon"><Icon name="search" /></span>
              <h3>Entendimento da aplicação</h3>
              <p>Levantamento de desenho, amostra ou descrição de uso antes de qualquer proposta.</p>
            </article>
            <article className="card card--plain">
              <span className="card__icon"><Icon name="layers" /></span>
              <h3>Materiais técnicos</h3>
              <p>Componentes em cobre, alumínio e aço inoxidável, conforme especificação do cliente.</p>
            </article>
            <article className="card card--plain">
              <span className="card__icon"><Icon name="mail" /></span>
              <h3>Canal direto</h3>
              <p>Contato com a equipe para tirar dúvidas e conversar sobre sua aplicação.</p>
            </article>
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="estrutura-qualidade">
        <div className="container split">
          <div>
            <SectionTitle id="estrutura-qualidade" eyebrow="Estrutura e qualidade" title="Evidências reais da operação" />
            <p style={{ color: 'var(--text-secondary)' }}>
              Fotos de equipamentos, vídeos de automações internas e informações de qualidade serão publicados conforme o material for
              aprovado pela PSTEC.
            </p>
            <div className="btn-row" style={{ marginTop: 24 }}>
              <Link href="/estrutura" className="btn btn--secondary">Ver estrutura</Link>
              <Link href="/qualidade" className="btn btn--ghost">Qualidade</Link>
            </div>
          </div>
          <Notice tone="info" title="Sem indicadores inventados">
            <p>
              Números de anos de mercado, clientes atendidos, capacidade produtiva ou certificações só serão exibidos após confirmação
              documental.
            </p>
          </Notice>
        </div>
      </section>
    </>
  );
}
