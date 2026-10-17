import type { Metadata } from 'next';
import PrivateLabelClient from '@/components/PrivateLabelClient';

export const metadata: Metadata = {
  title: 'Private Label Makhana | Contract Manufacturing | AÉRI',
  description:
    'Private label and contract manufacturing for raw, roasted and flavored makhana from India.',
  openGraph: {
    title: 'Private Label Makhana | Contract Manufacturing | AÉRI',
    description:
      'Private label and contract manufacturing for raw, roasted and flavored makhana from India.',
    url: 'https://www.aerisnacks.com/private-label',
    siteName: 'AÉRI Makhana',
    images: [
      {
        url: '/private-label-bulk.webp',
        width: 1000,
        height: 1000,
        alt: 'Private Label Makhana Contract Manufacturing - AÉRI',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Private Label Makhana | Contract Manufacturing | AÉRI',
    description:
      'Private label and contract manufacturing for raw, roasted and flavored makhana from India.',
    images: ['/private-label-bulk.webp'],
  },
};

export default function PrivateLabelPage() {
  return <PrivateLabelClient />;
}
