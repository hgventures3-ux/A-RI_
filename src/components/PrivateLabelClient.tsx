'use client';

import React from 'react';
import Image from 'next/image';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useContactModal } from '@/context/ContactModalContext';

export default function PrivateLabelClient() {
  const { openModal } = useContactModal();

  const options = [
    {
      title: 'Raw Phool Makhana',
      image: '/private-label-bulk.webp',
      alt: 'Raw Phool Makhana bulk export packaging',
      description:
        'Your brand on raw Phool Makhana, in bulk bags or retail packs. 4, 5 and 6+ suta, handpicked.',
      product: 'Private Label: Raw',
    },
    {
      title: 'Roasted Plain',
      image: '/mockup-pouch-clean.webp',
      alt: 'Roasted makhana pouch mockup',
      description:
        'Roasted makhana with a light salt finish, packed in nitrogen-flushed pouches.',
      product: 'Private Label: Roasted or Flavored',
    },
    {
      title: 'Flavored',
      image: '/mockup-pouch-clean.webp',
      alt: 'Flavored makhana custom brand pouch mockup',
      description:
        'Himalayan Salt & Pepper, Gourmet Truffle and Dark Chocolate, or send us your own flavor brief.',
      product: 'Private Label: Roasted or Flavored',
    },
  ];

  const terms = [
    {
      label: 'Pack formats',
      value: 'Pillow pouch, stand-up pouch, PET jar, bulk bags.',
    },
    {
      label: 'MOQ',
      value: 'Flexible. Contact us for your quantity.',
    },
    {
      label: 'Lead time',
      value: 'About 1 week after sample and artwork approval.',
    },
    {
      label: 'Packaging',
      value: 'Custom artwork and label design support.',
    },
  ];

  const steps = [
    {
      num: '01',
      title: 'Brief',
      desc: 'Tell us the product, quantity, flavor and packaging.',
    },
    {
      num: '02',
      title: 'Samples',
      desc: 'Samples are dispatched within 7 to 10 business days.',
    },
    {
      num: '03',
      title: 'Production',
      desc: 'Production takes about 1 week after approval.',
    },
    {
      num: '04',
      title: 'Ship',
      desc: 'Export shipping with full documentation.',
    },
  ];

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#1C1C1C] flex flex-col font-montserrat">
      <Navbar />

      <main className="flex-1 pt-24 lg:pt-28">
        {/* ── Hero ── */}
        <section className="max-w-4xl mx-auto px-4 sm:px-6 py-12 md:py-16 text-center">
          <span className="inline-block px-3 py-1 mb-4 rounded-full border border-[#1C1C1C]/20 text-[11px] font-semibold tracking-[0.25em] uppercase text-[#1C1C1C]/70">
            CONTRACT MANUFACTURING
          </span>
          <h1
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#1C1C1C] leading-tight mb-4 tracking-tight"
            style={{ fontFamily: 'var(--font-didot)' }}
          >
            Private Label and Contract Manufacturing
          </h1>
          <p className="text-base sm:text-lg text-[#1C1C1C]/80 max-w-2xl mx-auto leading-relaxed font-normal">
            Your brand on raw, roasted or flavored makhana. Low minimum order. Fast
            turnaround.
          </p>
        </section>

        {/* ── 3 Options with WebP Mockup Images ── */}
        <section className="max-w-6xl mx-auto px-4 sm:px-6 pb-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {options.map((opt) => (
              <div
                key={opt.title}
                className="bg-white rounded-2xl border border-[#1C1C1C]/10 overflow-hidden shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow"
              >
                <div>
                  <div className="relative w-full aspect-square bg-[#F5F3F0] overflow-hidden">
                    <Image
                      src={opt.image}
                      alt={opt.alt}
                      fill
                      sizes="(max-width: 768px) 100vw, 380px"
                      className="object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-[#1C1C1C] mb-2">
                      {opt.title}
                    </h3>
                    <p className="text-sm text-gray-700 leading-relaxed font-normal">
                      {opt.description}
                    </p>
                  </div>
                </div>

                <div className="p-6 pt-0">
                  <button
                    onClick={() => openModal(opt.product)}
                    type="button"
                    className="w-full min-h-[44px] bg-[#1C1C1C] text-white text-sm font-semibold rounded-lg hover:bg-black transition-colors active:scale-95 shadow-sm"
                  >
                    Contact Us
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── Terms (4 info boxes) ── */}
        <section className="bg-[#F5F3F0] py-16 border-y border-[#1C1C1C]/10">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-12">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {terms.map((term) => (
                <div
                  key={term.label}
                  className="bg-white rounded-2xl p-6 border border-[#1C1C1C]/10 shadow-sm"
                >
                  <h4 className="text-xs font-semibold tracking-[0.2em] uppercase text-[#1C1C1C]/50 mb-2">
                    {term.label}
                  </h4>
                  <p className="text-sm text-gray-800 font-medium leading-relaxed">
                    {term.value}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── 4-Step Process ── */}
        <section className="max-w-6xl mx-auto px-4 sm:px-6 md:px-12 py-16 md:py-20">
          <h2
            className="text-2xl sm:text-3xl font-bold text-[#1C1C1C] mb-12 text-center tracking-tight"
            style={{ fontFamily: 'var(--font-didot)' }}
          >
            How It Works
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step) => (
              <div key={step.num} className="relative">
                <div className="text-4xl font-extrabold text-[#555555] mb-2 font-mono select-none">
                  {step.num}
                </div>
                <h3 className="text-base font-bold text-[#1C1C1C] mb-2">
                  {step.title}
                </h3>
                <p className="text-sm text-gray-700 leading-relaxed font-normal">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
