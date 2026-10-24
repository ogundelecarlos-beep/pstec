import type { MetadataRoute } from 'next';
import { products } from '@/content/products';
import { siteUrl } from '@/content/site';

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ['', '/empresa', '/produtos', '/servicos', '/estrutura', '/qualidade', '/contato', '/privacidade'];
  return [
    ...pages.map((p) => ({ url: `${siteUrl}${p}` })),
    ...products.map((p) => ({ url: `${siteUrl}/produtos/${p.slug}` })),
  ];
}
