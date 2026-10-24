import type { MetadataRoute } from 'next';
import { flags, siteUrl } from '@/content/site';

/** robots.txt não protege conteúdo; o bloqueio real é a meta tag + X-Robots-Tag. */
export default function robots(): MetadataRoute.Robots {
  if (!flags.allowIndexing) {
    return { rules: { userAgent: '*', disallow: '/' } };
  }
  return { rules: { userAgent: '*', allow: '/' }, sitemap: `${siteUrl}/sitemap.xml` };
}
