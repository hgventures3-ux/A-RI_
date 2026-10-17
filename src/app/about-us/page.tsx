import type { Metadata } from 'next';
import AboutUsClient from '@/components/AboutUsClient';

export const metadata: Metadata = {
  title: 'About Us | H&G Ventures, Part of KHT Group | AÉRI Makhana',
  description:
    'AÉRI Makhana is a brand of H&G Ventures Private Limited, part of KHT Group. Partner facilities in Jaipur, Katihar, Purnea and Ahmedabad.',
  openGraph: {
    title: 'About Us | H&G Ventures, Part of KHT Group | AÉRI Makhana',
    description:
      'AÉRI Makhana is a brand of H&G Ventures Private Limited, part of KHT Group. Partner facilities in Jaipur, Katihar, Purnea and Ahmedabad.',
    url: 'https://www.aerisnacks.com/about-us',
    siteName: 'AÉRI Makhana',
    images: [
      {
        url: '/hero-makhana-bag.webp',
        width: 1200,
        height: 1200,
        alt: 'About AÉRI Makhana - H&G Ventures, Part of KHT Group',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About Us | H&G Ventures, Part of KHT Group | AÉRI Makhana',
    description:
      'AÉRI Makhana is a brand of H&G Ventures Private Limited, part of KHT Group. Partner facilities in Jaipur, Katihar, Purnea and Ahmedabad.',
    images: ['/hero-makhana-bag.webp'],
  },
};

export default function AboutUsPage() {
  return <AboutUsClient />;
}
