import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import '@/styles/tokens.css';
import '@/styles/base.css';
import '@/styles/components.css';
import '@/styles/experience.css';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { FloatingWhatsApp } from '@/components/FloatingWhatsApp';
import { RevealObserver } from '@/components/Reveal';
import { ReadingProgress } from '@/components/Motion';
import { flags, siteUrl } from '@/content/site';
import { whatsappUrl } from '@/lib/channels';

const inter = Inter({ subsets: ['latin'], display: 'swap', variable: '--font-inter' });

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: 'PSTEC — Produtos e Serviços Técnicos', template: '%s | PSTEC' },
  description:
    'Componentes e soluções técnicas para aplicações industriais e elétricas. PSTEC — Produtos e Serviços Técnicos, Franco da Rocha — SP.',
  applicationName: 'PSTEC',
  robots: flags.allowIndexing ? { index: true, follow: true } : { index: false, follow: false, nocache: true },
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    siteName: 'PSTEC — Produtos e Serviços Técnicos',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Ilustração de conexão flexível laminada com a marca PSTEC' }],
  },
  twitter: { card: 'summary_large_image' },
};

export const viewport: Viewport = {
  themeColor: '#1b2a4a',
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
};

/* Dados estruturados apenas com propriedades verificáveis (sem endereço, avaliações ou clientes). */
const orgJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'PSTEC',
  alternateName: 'Produtos e Serviços Técnicos',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={inter.variable}>
      <body>
        <ReadingProgress />
        <a className="skip-link" href="#conteudo">
          Pular para o conteúdo
        </a>
        <div className="proto-bar" role="note">
          <div className="container">
            <strong>Protótipo de apresentação.</strong> Dados, imagens e referências em validação com a PSTEC.
          </div>
        </div>
        <Header />
        <main id="conteudo" tabIndex={-1}>
          {children}
        </main>
        <Footer />
        <FloatingWhatsApp href={whatsappUrl()} />
        <RevealObserver />
        {flags.allowIndexing && (
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }} />
        )}
      </body>
    </html>
  );
}
