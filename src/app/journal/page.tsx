import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { initialArticles } from '@/lib/journalData';

export const metadata: Metadata = {
  title: 'Journal | Guides and Insights on Phool Makhana | AÉRI',
  description:
    'Guides and insights on Phool Makhana, sourcing and export from India.',
  openGraph: {
    title: 'Journal | Guides and Insights on Phool Makhana | AÉRI',
    description:
      'Guides and insights on Phool Makhana, sourcing and export from India.',
    url: 'https://www.aerisnacks.com/journal',
    siteName: 'AÉRI Makhana',
    images: [
      {
        url: '/hero-makhana-bag.webp',
        width: 1200,
        height: 1200,
        alt: 'AÉRI Makhana Journal - Guides & Insights',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Journal | Guides and Insights on Phool Makhana | AÉRI',
    description:
      'Guides and insights on Phool Makhana, sourcing and export from India.',
    images: ['/hero-makhana-bag.webp'],
  },
};

export default function JournalPage() {
  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#1C1C1C] flex flex-col font-montserrat">
      <Navbar />

      <main className="flex-1 pt-24 lg:pt-28 pb-20">
        {/* ── Header ── */}
        <section className="max-w-4xl mx-auto px-4 sm:px-6 py-12 md:py-16 text-center">
          <span className="inline-block px-3 py-1 mb-4 rounded-full border border-[#1C1C1C]/20 text-[11px] font-semibold tracking-[0.25em] uppercase text-[#1C1C1C]/70">
            KNOWLEDGE &amp; MARKET INSIGHTS
          </span>
          <h1
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#1C1C1C] leading-tight mb-4 tracking-tight"
            style={{ fontFamily: 'var(--font-didot)' }}
          >
            Journal
          </h1>
          <p className="text-base sm:text-lg text-[#1C1C1C]/80 max-w-2xl mx-auto leading-relaxed font-normal">
            Guides and insights on Phool Makhana, sourcing and export.
          </p>
        </section>

        {/* ── Article Cards Grid ── */}
        <section className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {initialArticles.map((article) => (
              <article
                key={article.slug}
                className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
              >
                <div>
                  <Link href={`/journal/${article.slug}`} className="block relative w-full aspect-[16/10] bg-[#F5F3F0]">
                    <Image
                      src={article.image}
                      alt={article.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 400px"
                      className="object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </Link>
                  <div className="p-6">
                    <p className="text-xs font-semibold tracking-wider uppercase text-gray-500 mb-2">
                      {article.date} · By {article.author}
                    </p>
                    <h2 className="text-lg font-bold text-[#1C1C1C] mb-3 leading-snug line-clamp-2">
                      <Link
                        href={`/journal/${article.slug}`}
                        className="hover:underline"
                      >
                        {article.title}
                      </Link>
                    </h2>
                    <p className="text-sm text-gray-600 line-clamp-2 font-normal leading-relaxed">
                      {article.summary}
                    </p>
                  </div>
                </div>

                <div className="p-6 pt-0">
                  <Link
                    href={`/journal/${article.slug}`}
                    className="inline-flex items-center text-xs font-semibold uppercase tracking-wider text-[#1C1C1C] hover:underline"
                  >
                    Read Article →
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
