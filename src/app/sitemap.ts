import { MetadataRoute } from 'next';
import { initialArticles } from '@/lib/journalData';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.aerisnacks.com';

  const staticPages = [
    '',
    '/raw-phool-makhana',
    '/private-label',
    '/about-us',
    '/brand',
    '/products',
    '/journal',
    '/legal/legal-notice',
    '/legal/t-c',
    '/legal/return-policy',
    '/legal/privacy',
  ];

  const staticEntries: MetadataRoute.Sitemap = staticPages.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === '' ? 'weekly' : 'monthly',
    priority: route === '' ? 1.0 : route.startsWith('/legal') ? 0.3 : 0.8,
  }));

  const journalEntries: MetadataRoute.Sitemap = initialArticles.map((article) => ({
    url: `${baseUrl}/journal/${article.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  return [...staticEntries, ...journalEntries];
}
