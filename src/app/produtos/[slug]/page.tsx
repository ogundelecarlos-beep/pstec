import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Icon } from '@/components/Icon';
import { ProductCatalog } from '@/components/ProductCatalog';
import { MediaFigure, PageHero, PendingBadge } from '@/components/ui';
import { families, familyName, getProduct, products } from '@/content/products';
import { siteUrl } from '@/content/site';
import type { Field } from '@/content/types';
import { whatsappUrl } from '@/lib/channels';

export const dynamicParams = false;

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const product = getProduct((await params).slug);
  if (!product) return {};
  return {
    title: product.name === familyName(product.family) ? product.name : `${product.name} — ${familyName(product.family)}`,
    description: product.summary,
    alternates: { canonical: `/produtos/${product.slug}` },
  };
}

function SpecValue({ field }: { field: Field<string | string[]> }) {
  if (field.value === null) {
    return <span className="pending">{field.note ?? 'Sob consulta — validar especificação'}</span>;
  }
  const text = Array.isArray(field.value) ? field.value.join(', ') : field.value;
  return (
    <>
      {text}
      {field.status !== 'aprovado' && (
        <>
          {' '}
          <PendingBadge>A validar</PendingBadge>
        </>
      )}
    </>
  );
}

export default async function ProductPage({ params }: Props) {
  const product = getProduct((await params).slug);
  if (!product) notFound();

  const productUrl = `${siteUrl}/produtos/${product.slug}`;
  const wa = whatsappUrl(`Produto: ${product.name} — ${productUrl}`);
  const related = products.filter((p) => p.slug !== product.slug && p.family === product.family).concat(
    products.filter((p) => p.slug !== product.slug && p.family !== product.family),
  ).slice(0, 3);

  const specs: [string, Field<string | string[]>][] = [
    ['Materiais', product.materials],
    ['Aplicação', product.application],
    ['Processo', product.process],
    ['Dimensões', product.dimensions],
    ['Acabamento', product.finish],
    ['Documento técnico', product.technicalDocument],
  ];

  return (
    <>
      <PageHero
        crumbs={[
          { href: '/', label: 'Início' },
          { href: '/produtos', label: 'Produtos' },
          { label: product.name },
        ]}
        eyebrow={familyName(product.family)}
        title={product.name}
        lead={product.summary}
      >
        <div className="btn-row" style={{ marginTop: 24 }}>
          <Link href={"/contato#formulario"} className="btn btn--primary">
            Fale com a PSTEC
          </Link>
        </div>
      </PageHero>

      <section className="section">
        <div className="container product-layout">
          <div style={{ display: 'grid', gap: 32 }}>
            {product.image.kind === 'ilustracao' ? (
              <MediaFigure media={product.image} priority showCaption sizes="(min-width: 960px) 58vw, 100vw" />
            ) : (
              <MediaFigure media={product.image} priority showCaption contain sizes="(min-width: 960px) 58vw, 100vw" className="photo-frame" />
            )}

            <div className="prose">
              <h2>Descrição</h2>
              <p>{product.description}</p>
            </div>

            <div>
              <h2 style={{ marginBottom: 16 }}>Especificações</h2>
              <table className="spec-table">
                <caption className="visually-hidden">Especificações de {product.name}</caption>
                <tbody>
                  {specs.map(([label, field]) => (
                    <tr key={label}>
                      <th scope="row">{label}</th>
                      <td><SpecValue field={field} /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <aside className="sticky-aside" aria-label="Contato">
            <div className="panel">
              <h2 style={{ fontSize: 'var(--h3)', color: 'var(--text-primary)' }}>Interessado nesta peça?</h2>
              <p style={{ color: 'var(--text-secondary)' }}>
                Deixe seu contato e a equipe da PSTEC retorna para conversar sobre a sua aplicação.
              </p>
              <Link href={"/contato#formulario"} className="btn btn--primary btn--block btn--shine">
                Fale com a PSTEC
                <Icon name="arrow" />
              </Link>
              {wa ? (
                <a href={wa} className="btn btn--ghost btn--block" target="_blank" rel="noopener noreferrer">
                  <Icon name="whatsapp" />
                  Falar pelo WhatsApp
                </a>
              ) : (
                <p className="action-note" style={{ marginTop: 0 }}>
                  Canal de WhatsApp em configuração — use o formulário.
                </p>
              )}
              <p className="action-note" style={{ marginTop: 0 }}>
                Documento técnico: indisponível nesta versão.
              </p>
            </div>
            <div className="panel panel--muted">
              <p style={{ fontWeight: 600 }}>Status do conteúdo</p>
              <p style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-sm)' }}>
                Ficha demonstrativa. Nome, descrição e família são propostas e dependem de revisão técnica da PSTEC.
              </p>
            </div>
          </aside>
        </div>
      </section>

      <section className="section section--muted" aria-labelledby="relacionados">
        <div className="container">
          <h2 id="relacionados" style={{ marginBottom: 32 }}>Outros itens do catálogo</h2>
          <ProductCatalog products={related} families={families} showFilters={false} headingLevel="h3" />
        </div>
      </section>
    </>
  );
}
