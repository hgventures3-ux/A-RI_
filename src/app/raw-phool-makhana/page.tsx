import type { Metadata } from 'next';
import RawPhoolMakhanaClient from '@/components/RawPhoolMakhanaClient';

export const metadata: Metadata = {
  title: 'Raw Phool Makhana Exporter India | Fox Nuts 4, 5, 6+ Suta | AÉRI',
  description:
    'Export-grade raw Phool Makhana (fox nuts) in 4, 5 and 6+ suta, handpicked. Bulk or private label.',
  openGraph: {
    title: 'Raw Phool Makhana Exporter India | Fox Nuts 4, 5, 6+ Suta | AÉRI',
    description:
      'Export-grade raw Phool Makhana (fox nuts) in 4, 5 and 6+ suta, handpicked. Bulk or private label.',
    url: 'https://www.aerisnacks.com/raw-phool-makhana',
    siteName: 'AÉRI Makhana',
    images: [
      {
        url: '/hero-makhana-bag.webp',
        width: 1200,
        height: 1200,
        alt: 'Raw Phool Makhana 4, 5, 6+ Suta Export - AÉRI Makhana',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Raw Phool Makhana Exporter India | Fox Nuts 4, 5, 6+ Suta | AÉRI',
    description:
      'Export-grade raw Phool Makhana (fox nuts) in 4, 5 and 6+ suta, handpicked. Bulk or private label.',
    images: ['/hero-makhana-bag.webp'],
  },
};

export default function RawPhoolMakhanaPage() {
  return <RawPhoolMakhanaClient />;
}
