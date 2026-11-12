import type { Metadata } from 'next';
import PrivateLabelClient from '@/components/PrivateLabelClient';

export const metadata: Metadata = {
  title: 'Private Label Makhana Manufacturing in India | Launch Your Brand | AÉRI',
  description:
    'Private-label contract manufacturing for raw, olive oil roasted and flavoured Makhana in India. Custom flavours, retail packaging (pouches, PET jars, composite cans), and global export supply.',
  openGraph: {
    title: 'Private Label Makhana Manufacturing in India | Launch Your Brand | AÉRI',
    description:
      'Private-label contract manufacturing for raw, olive oil roasted and flavoured Makhana in India. Custom flavours, retail packaging (pouches, PET jars, composite cans), and global export supply.',
    url: 'https://www.aerisnacks.com/private-label',
    siteName: 'AÉRI Makhana',
    images: [
      {
        url: '/private-label-mockup-pouch.webp',
        width: 1120,
        height: 1404,
        alt: 'Private Label Makhana Contract Manufacturing - AÉRI',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Private Label Makhana Manufacturing in India | Launch Your Brand | AÉRI',
    description:
      'Private-label contract manufacturing for raw, olive oil roasted and flavoured Makhana in India. Custom flavours, retail packaging (pouches, PET jars, composite cans), and global export supply.',
    images: ['/private-label-mockup-pouch.webp'],
  },
};

export default function PrivateLabelPage() {
  return <PrivateLabelClient />;
}
