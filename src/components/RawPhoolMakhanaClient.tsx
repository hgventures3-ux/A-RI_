'use client';

import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useContactModal } from '@/context/ContactModalContext';

export default function RawPhoolMakhanaClient() {
  const { openModal } = useContactModal();

  const gradeCards = [
    { grade: '4 Suta' },
    { grade: '5 Suta' },
    { grade: '6+ Suta' },
  ];

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#1C1C1C] flex flex-col font-montserrat">
      <Navbar />

      <main className="flex-1 pt-24 lg:pt-28">
        {/* ── Hero ── */}
        <section className="max-w-4xl mx-auto px-4 sm:px-6 py-12 md:py-16 text-center">
          <span className="inline-block px-3 py-1 mb-4 rounded-full border border-[#1C1C1C]/20 text-[11px] font-semibold tracking-[0.25em] uppercase text-[#1C1C1C]/70">
            EXPORT GRADE
          </span>
          <h1
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#1C1C1C] leading-tight mb-4 tracking-tight"
            style={{ fontFamily: 'var(--font-didot)' }}
          >
            Raw Phool Makhana
          </h1>
          <p className="text-base sm:text-lg text-[#1C1C1C]/80 max-w-2xl mx-auto leading-relaxed font-normal">
            Export-grade raw Phool Makhana from Bihar, India. Handpicked and available
            in bulk or under your own brand.
          </p>
        </section>

        {/* ── Available Grades Section ── */}
        <section className="max-w-5xl mx-auto px-4 sm:px-6 pb-14">
          <h2
            className="text-2xl sm:text-3xl font-bold text-[#1C1C1C] text-center mb-10 tracking-tight"
            style={{ fontFamily: 'var(--font-didot)' }}
          >
            Available Grades
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {gradeCards.map((item) => (
              <div
                key={item.grade}
                className="bg-white rounded-2xl border border-[#1C1C1C]/10 p-8 text-center shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow"
              >
                <div className="py-4">
                  <h3 className="text-2xl sm:text-3xl font-bold text-[#1C1C1C] mb-2">
                    {item.grade}
                  </h3>
                  <p className="text-sm font-medium text-gray-500 tracking-wide uppercase">
                    Handpicked
                  </p>
                </div>

                <div className="pt-6">
                  <button
                    onClick={() => openModal(`Raw Phool Makhana - ${item.grade}`)}
                    type="button"
                    className="w-full min-h-[44px] bg-[#1C1C1C] text-white text-sm font-semibold rounded-lg hover:bg-black transition-colors active:scale-95 shadow-sm"
                  >
                    Request a Quote
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Three short lines under the cards */}
          <div className="max-w-xl mx-auto text-center space-y-2 text-sm text-gray-700 font-medium mb-12">
            <p>Graded by size in suta (1 suta = 3.175 mm).</p>
            <p>Origin: Bihar, India.</p>
            <p>Private label available on every grade.</p>
          </div>

          {/* Specification inquiry CTA */}
          <div className="max-w-2xl mx-auto p-8 rounded-2xl bg-white border border-[#1C1C1C]/10 text-center shadow-sm">
            <p className="text-base sm:text-lg font-semibold text-[#1C1C1C] mb-4">
              Need the exact size or specification? Contact us and we will send it to you.
            </p>
            <button
              onClick={() => openModal('Raw Phool Makhana')}
              type="button"
              className="min-h-[44px] px-8 py-3 bg-[#1C1C1C] text-white text-sm font-semibold rounded-lg hover:bg-black transition-colors"
            >
              Contact Us
            </button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
