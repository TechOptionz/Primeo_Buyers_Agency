import type { MetadataRoute } from 'next';
import { SITE } from '@/config/site';
import { ROUTES } from '@/lib/seo';

export default function sitemap(): MetadataRoute.Sitemap {
  return ROUTES.map((path) => ({
    url: `${SITE.url}${path === '/' ? '' : path}`,
    changeFrequency: path === '/privacy' || path === '/terms' ? 'yearly' : 'monthly',
    priority: path === '/' ? 1 : path === '/privacy' || path === '/terms' ? 0.2 : 0.8,
  }));
}
