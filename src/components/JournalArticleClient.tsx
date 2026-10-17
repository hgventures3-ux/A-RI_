'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useContactModal } from '@/context/ContactModalContext';
import { JournalArticle } from '@/lib/journalData';

export default function JournalArticleClient({ article }: { article: JournalArticle }) {
  const { openModal } = useContactModal();

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#1C1C1C] flex flex-col font-montserrat">
      <Navbar />

      <main className="flex-1 pt-24 lg:pt-28 pb-20">
        <article className="max-w-3xl mx-auto px-4 sm:px-6">
          {/* Back to Journal */}
          <Link
            href="/journal"
            className="inline-flex items-center text-xs font-semibold uppercase tracking-wider text-gray-500 hover:text-black mb-8 transition-colors"
          >
            ← Back to Journal
          </Link>

          {/* Meta Info */}
          <div className="text-xs font-medium text-gray-500 tracking-wider uppercase mb-3">
            {article.date} · By {article.author}
          </div>

          {/* Single H1 Heading */}
          <h1
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#1C1C1C] leading-[1.2] mb-4 tracking-tight"
            style={{ fontFamily: 'var(--font-didot)' }}
          >
            {article.title}
          </h1>

          <p className="text-lg text-gray-600 mb-8 font-normal leading-relaxed">
            {article.subtitle}
          </p>

          {/* Optional Article Image */}
          {article.image && (
            <div className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden mb-10 border border-gray-200 shadow-sm bg-white">
              <Image
                src={article.image}
                alt={article.title}
                fill
                priority
                sizes="(max-width: 768px) 100vw, 768px"
                className="object-cover"
              />
            </div>
          )}

          {/* Body Paragraphs */}
          <div className="space-y-6 text-base text-gray-800 leading-relaxed font-normal">
            {article.paragraphs.map((p, idx) => (
              <p key={idx}>{p}</p>
            ))}
          </div>

          {/* Box at the end: Questions about sourcing makhana? with a Contact Us button */}
          <div className="mt-14 p-8 rounded-2xl bg-white border border-gray-200 text-center shadow-sm">
            <h3 className="text-xl font-bold text-[#1C1C1C] mb-2">
              Questions about sourcing makhana?
            </h3>
            <p className="text-sm text-gray-600 mb-6">
              Our export specialists reply within 1 business day with full grade and specification details.
            </p>
            <button
              onClick={() => openModal('Raw Phool Makhana')}
              type="button"
              className="min-h-[44px] px-8 py-3 bg-[#1C1C1C] text-white text-sm font-semibold rounded-lg hover:bg-black transition-colors active:scale-95 shadow-sm"
            >
              Contact Us
            </button>
          </div>
        </article>
      </main>

      <Footer />
    </div>
  );
}
