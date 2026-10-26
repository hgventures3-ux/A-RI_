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

        {/* ── Articles Section ── */}
        <section className="max-w-6xl mx-auto px-4 sm:px-6">
          {/* Featured Article Card */}
          {initialArticles.length > 0 && (
            <article className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow mb-12">
              <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
                <Link
                  href={`/journal/${initialArticles[0].slug}`}
                  className="lg:col-span-5 relative min-h-[260px] lg:min-h-full bg-[#F5F3F0] block overflow-hidden group"
                >
                  <Image
                    src={initialArticles[0].image}
                    alt={initialArticles[0].title}
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 500px"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 rounded-full bg-[#1C1C1C] text-white text-[10px] font-semibold tracking-widest uppercase shadow-sm">
                      FEATURED B2B GUIDE
                    </span>
                  </div>
                </Link>

                <div className="lg:col-span-7 p-6 sm:p-8 lg:p-10 flex flex-col justify-between">
                  <div>
                    <p className="text-xs font-semibold tracking-wider uppercase text-gray-500 mb-2">
                      {initialArticles[0].date} · By {initialArticles[0].author}
                    </p>
                    <h2
                      className="text-xl sm:text-2xl lg:text-3xl font-bold text-[#1C1C1C] mb-3 leading-snug"
                      style={{ fontFamily: 'var(--font-didot)' }}
                    >
                      <Link
                        href={`/journal/${initialArticles[0].slug}`}
                        className="hover:underline"
                      >
                        {initialArticles[0].title}
                      </Link>
                    </h2>
                    <p className="text-sm sm:text-base text-gray-600 font-normal leading-relaxed mb-6">
                      {initialArticles[0].summary}
                    </p>
                  </div>

                  <div>
                    <Link
                      href={`/journal/${initialArticles[0].slug}`}
                      className="inline-flex items-center min-h-[44px] px-6 py-2.5 bg-[#1C1C1C] text-white text-xs font-semibold uppercase tracking-wider rounded-lg hover:bg-black transition-colors"
                    >
                      Read Full Guide →
                    </Link>
                  </div>
                </div>
              </div>
            </article>
          )}

          {/* More Articles Heading */}
          <div className="pt-4 pb-6 border-t border-gray-200">
            <h3 className="text-xs font-bold uppercase tracking-widest text-gray-500">
              More Articles &amp; Insights
            </h3>
          </div>

          {/* Remaining Articles Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {initialArticles.slice(1).map((article) => (
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
