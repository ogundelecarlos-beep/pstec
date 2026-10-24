import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Página não encontrada',
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <section className="container not-found">
      <div style={{ display: 'grid', gap: 16, justifyItems: 'center' }}>
        <p className="not-found__code" aria-hidden="true">404</p>
        <h1 style={{ fontSize: 'var(--h2)' }}>Página não encontrada</h1>
        <p style={{ color: 'var(--text-secondary)', maxWidth: '48ch' }}>
          O endereço pode ter mudado ou não existir. Volte ao início ou consulte o catálogo de produtos.
        </p>
        <div className="btn-row" style={{ justifyContent: 'center', marginTop: 8 }}>
          <Link href="/" className="btn btn--primary">Ir para o início</Link>
          <Link href="/produtos" className="btn btn--secondary">Ver produtos</Link>
        </div>
      </div>
    </section>
  );
}
