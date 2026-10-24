import type { Metadata } from 'next';
import Link from 'next/link';
import { ProductCatalog } from '@/components/ProductCatalog';
import { Notice, PageHero } from '@/components/ui';
import { families, products } from '@/content/products';

export const metadata: Metadata = {
  title: 'Produtos',
  description: 'Catálogo demonstrativo da PSTEC: componentes em cobre, alumínio, aço inoxidável, contatos elétricos e componentes para seccionadoras e disjuntores.',
  alternates: { canonical: '/produtos' },
};

export default function ProdutosPage() {
  return (
    <>
      <PageHero
        crumbs={[{ href: '/', label: 'Início' }, { label: 'Produtos' }]}
        eyebrow="Catálogo demonstrativo"
        title="Produtos e famílias de componentes"
        lead="Busque por nome ou filtre por família. Especificações técnicas são confirmadas caso a caso com a equipe da PSTEC."
      />
      <section className="section" aria-label="Catálogo">
        <div className="container">
          <div style={{ marginBottom: 32 }}>
            <Notice>
              <p>
                <strong>Catálogo em validação.</strong> Famílias baseadas em referência pública e itens baseados nas fotos recebidas. Não
                há SKU, preço, estoque, capacidade elétrica ou certificação informados.
              </p>
            </Notice>
          </div>
          <ProductCatalog products={products} families={families} />
          <p className="action-note" style={{ marginTop: 32 }}>
            Catálogo técnico para download indisponível nesta versão.{' '}
            <Link href="/contato#formulario">Solicite informações pelo formulário</Link>.
          </p>
        </div>
      </section>
    </>
  );
}
