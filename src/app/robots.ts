import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/login',
          '/cart',
          '/checkout',
          '/thank-you',
          '/api/',
          '/profile',
          '/journal/new',
        ],
      },
    ],
    sitemap: 'https://www.aerisnacks.com/sitemap.xml',
  };
}
