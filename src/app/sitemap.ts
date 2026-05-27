import { MetadataRoute } from 'next';

const baseUrl = 'https://aerisnacks.com';

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    '',
    '/brand',
    '/contact',
    '/products',
    '/blog/apero',
    '/blog/supermarket',
    '/blog/wine',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1 : 0.8,
  }));

  const products = [
    'himalayan-salt',
    'herbes-de-provence',
    'black-truffle',
    'coming-soon',
    'sel-de-l-himalaya',
    'truffe-noire',
    'bientot',
  ].map((slug) => ({
    url: `${baseUrl}/products/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  const companyPages = [
    'our-story',
    'transparency',
    'certifications',
    'pro-portal',
    'notre-histoire',
    'transparence',
    'certifications-fr',
    'espace-pro',
  ].map((slug) => ({
    url: `${baseUrl}/company/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  const legalPages = [
    'return-policy',
    't-c',
    'legal-notice',
    'privacy',
    'politique-de-retour',
    'cgv',
    'mentions-legales',
    'confidentialite',
  ].map((slug) => ({
    url: `${baseUrl}/legal/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'yearly' as const,
    priority: 0.3,
  }));

  return [...staticRoutes, ...products, ...companyPages, ...legalPages];
}
