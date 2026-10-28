import Link from 'next/link';
import type { Metadata } from 'next';
import { ClientsSection } from '@/components/ClientsSection';
import { ContactLocation } from '@/components/ContactLocation';
import { HeroStage } from '@/components/HeroStage';
import { Icon } from '@/components/Icon';
import { TraceDivider } from '@/components/Motion';
import { ProductCatalog } from '@/components/ProductCatalog';
import { SealsSection } from '@/components/SealsSection';
import { SectorsSection } from '@/components/SectorsSection';
import { PendingBadge, SectionTitle } from '@/components/ui';
import { families, products } from '@/content/products';
import { services } from '@/content/services';
import { company } from '@/content/site';

export const metadata: Metadata = {
  title: { absolute: 'PSTEC — Componentes e soluções técnicas para transmissão de energia' },
  description:
    'Há 30 anos no mercado. Conheça os componentes em cobre, alumínio, aço inoxidável e contatos elétricos da PSTEC — Produtos e Serviços Técnicos, em Franco da Rocha — SP.',
  alternates: { canonical: '/' },
};

const serviceIcons = ['ruler', 'layers', 'gear', 'shield'] as const;

export default function Home() {
  const years = company.yearsInMarket.value;
  return (
    <>
      {/* Momento 1 — Hero */}
      <HeroStage />

      {/* 30 anos de trabalho */}
      <section className="section" aria-labelledby="quem-somos" id="quem-somos-secao">
        <div className="container years-band reveal">
          <p className="years-band__num" aria-hidden="true">
            <strong>{years}</strong>
            <span>anos</span>
          </p>
          <div>
            <SectionTitle id="quem-somos" eyebrow="30 anos de trabalho" title={`Há ${years} anos no mercado de transmissão de energia`} />
            <div className="prose">
              <p>
                A PSTEC — Produtos e Serviços Técnicos está há {years} anos no mercado, fabricando em Franco da Rocha — SP componentes em
                cobre, alumínio e aço inoxidável e contatos para equipamentos elétricos.
              </p>
              <p>
                Cada solicitação começa por entender a aplicação do cliente, para orientar especificação, material e acabamento com a equipe
                técnica.
              </p>
            </div>
            <ul className="years-band__facts">
              <li><strong>{years} anos</strong><span>de atuação no mercado</span></li>
              <li><strong>Sob desenho</strong><span>peças conforme desenho ou amostra do cliente</span></li>
              <li><strong>Franco da Rocha — SP</strong><span>fabricação própria</span></li>
            </ul>
            <div className="btn-row" style={{ marginTop: 24 }}>
              <Link href="/empresa" className="btn btn--ghost">
                Conhecer a empresa
                <Icon name="arrow" />
              </Link>
            </div>
          </div>
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
            Fotos reais enviadas pela PSTEC, tratadas digitalmente. Serão substituídas por fotos profissionais das peças.
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
            <Link href="/servicos" className="btn btn--primary">
              Explorar serviços
              <Icon name="arrow" />
            </Link>
          </div>
        </div>
      </section>

      {/* Setores */}
      <SectorsSection />

      <TraceDivider />

      {/* Marcas */}
      <ClientsSection />

      {/* Selos */}
      <SealsSection />

      {/* Encerramento — Contato & Localização */}
      <ContactLocation />
    </>
  );
}
