import Link from 'next/link';
import type { Metadata } from 'next';
import { ClientsSection } from '@/components/ClientsSection';
import { CompareSlider } from '@/components/CompareSlider';
import { ContactLocation } from '@/components/ContactLocation';
import { HeroStage } from '@/components/HeroStage';
import { Icon } from '@/components/Icon';
import { TraceDivider } from '@/components/Motion';
import { ProductCatalog } from '@/components/ProductCatalog';
import { FacilityExplorer } from '@/components/FacilityExplorer';
import { Notice, PendingBadge, SectionTitle } from '@/components/ui';
import { families, products } from '@/content/products';
import { services } from '@/content/services';

export const metadata: Metadata = {
  title: { absolute: 'PSTEC — Componentes e soluções técnicas para aplicações industriais' },
  description:
    'Conheça os componentes em cobre, alumínio, aço inoxidável e contatos elétricos da PSTEC — Produtos e Serviços Técnicos, em Franco da Rocha — SP.',
  alternates: { canonical: '/' },
};

const serviceIcons = ['ruler', 'layers', 'gear', 'shield'] as const;

export default function Home() {
  return (
    <>
      {/* Momento 1 — Hero */}
      <HeroStage />

      {/* Quem somos — leitura tranquila */}
      <section className="section" aria-labelledby="quem-somos" id="quem-somos-secao">
        <div className="container split reveal">
          <div>
            <SectionTitle id="quem-somos" eyebrow="Quem somos" title="Fabricação de componentes técnicos em Franco da Rocha — SP" />
            <div className="prose">
              <p>
                A PSTEC — Produtos e Serviços Técnicos atua no contexto industrial e elétrico, com componentes em cobre, alumínio e aço
                inoxidável e contatos para equipamentos elétricos.
              </p>
              <p>
                Cada solicitação começa por entender a aplicação do cliente, para orientar especificação, material e acabamento com a equipe
                técnica.
              </p>
            </div>
            <div className="btn-row" style={{ marginTop: 24 }}>
              <Link href="/empresa" className="btn btn--ghost">
                Conhecer a empresa
                <Icon name="arrow" />
              </Link>
            </div>
          </div>
          <figure className="media" style={{ aspectRatio: '4 / 3', background: 'var(--metal)', border: '1px solid var(--border)' }}>
            <span className="media__label badge badge--pending">
              <Icon name="clock" />
              Foto das instalações pendente
            </span>
            <div className="structure-card__ph" style={{ height: '100%', display: 'grid', placeContent: 'center', color: 'var(--text-secondary)' }}>
              <Icon name="factory" />
              <span>Espaço reservado para foto real da fachada ou da área produtiva da PSTEC.</span>
            </div>
          </figure>
        </div>
      </section>

      {/* Momento 2 — Comparador */}
      <section className="section compare-section" aria-labelledby="detalhe">
        <div className="container compare-layout">
          <div>
            <SectionTitle
              id="detalhe"
              eyebrow="Do detalhe à aplicação"
              title="Do desenho à peça"
              lead="Arraste o controle para comparar a mesma representação conceitual em linhas técnicas e com volume. Cada componente começa por um entendimento preciso da aplicação."
            />
            <ul className="checklist" style={{ marginTop: 0 }}>
              <li><Icon name="ruler" />Leitura do desenho ou da amostra</li>
              <li><Icon name="layers" />Definição de material e acabamento com a equipe</li>
              <li><Icon name="check" />Validação técnica antes do orçamento</li>
            </ul>
          </div>
          <CompareSlider />
        </div>
      </section>

      {/* Produtos — vitrines */}
      <section className="section section--muted" aria-labelledby="produtos">
        <div className="container reveal">
          <SectionTitle
            id="produtos"
            eyebrow="Produtos"
            title="Famílias de componentes"
            lead="Catálogo demonstrativo organizado por material e aplicação. Abra a visualização rápida ou a ficha completa."
            action={
              <Link href="/produtos" className="btn btn--secondary">
                Ver catálogo completo
              </Link>
            }
          />
          <ProductCatalog products={products.slice(0, 4)} families={families} showFilters={false} headingLevel="h3" gridClass="grid--4" />
          <p className="action-note" style={{ marginTop: 20 }}>
            Imagens identificadas como “Ilustração técnica” foram criadas para o protótipo a partir das fotos recebidas e não representam
            medidas reais.
          </p>
        </div>
      </section>

      {/* Serviços — leitura tranquila */}
      <section className="section" aria-labelledby="servicos">
        <div className="container reveal">
          <SectionTitle
            id="servicos"
            eyebrow="Serviços técnicos"
            title="Atendimento técnico para entender a necessidade de cada aplicação"
            lead="Os itens abaixo serão detalhados conforme o escopo confirmado pela PSTEC."
          />
          <div className="grid grid--4">
            {services.map((s, i) => (
              <article key={s.id} className="card card--plain">
                <span className="card__icon"><Icon name={serviceIcons[i % serviceIcons.length]} /></span>
                <h3>{s.title}</h3>
                <p>{s.summary}</p>
                {s.note && <div><PendingBadge>{s.note}</PendingBadge></div>}
              </article>
            ))}
          </div>
          <div className="btn-row" style={{ marginTop: 32 }}>
            <Link href="/servicos" className="btn btn--ghost">
              Ver serviços
              <Icon name="arrow" />
            </Link>
          </div>
        </div>
      </section>

      {/* Momento 3 — Estrutura explorável */}
      <section className="section section--dark on-dark" aria-labelledby="estrutura">
        <div className="container">
          <SectionTitle
            id="estrutura"
            eyebrow="Estrutura"
            title="Explore uma célula de produção"
            lead="Toque nos pontos para conhecer cada etapa representada. A ilustração é conceitual e será substituída por fotos e vídeos reais da PSTEC."
            action={
              <Link href="/estrutura" className="btn btn--secondary">
                Ver galeria
              </Link>
            }
          />
          <FacilityExplorer />
        </div>
      </section>

      <TraceDivider />

      {/* Marcas */}
      <ClientsSection />

      {/* Qualidade */}
      <section className="section section--muted" aria-labelledby="qualidade">
        <div className="container split reveal">
          <div>
            <SectionTitle id="qualidade" eyebrow="Qualidade" title="Qualidade e documentos técnicos" />
            <Notice tone="info">Informações de qualidade e documentos técnicos serão disponibilizados após validação.</Notice>
          </div>
          <div className="panel">
            <h3>Área preparada para</h3>
            <ul className="checklist" style={{ marginTop: 0 }}>
              <li><Icon name="doc" />Documentos técnicos de produtos aprovados</li>
              <li><Icon name="shield" />Certificados vigentes, com número e validade</li>
              <li><Icon name="check" />Descrição do controle de qualidade adotado</li>
            </ul>
            <Link href="/qualidade" className="btn btn--link">Saiba mais sobre a área de qualidade</Link>
          </div>
        </div>
      </section>

      {/* Encerramento — Contato & Localização */}
      <ContactLocation />
    </>
  );
}
