'use client';

import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useContactModal } from '@/context/ContactModalContext';

export default function AboutUsClient() {
  const { openModal } = useContactModal();

  const exportDocs = [
    'Commercial Invoice',
    'Packing List',
    'Bill of Lading (B/L)',
    'Certificate of Origin (COO)',
    'Phytosanitary Certificate',
    'FSSAI / Health Certificate',
    'Laboratory Analysis Report',
    'Fumigation Certificate (if required by destination)',
  ];

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#1C1C1C] flex flex-col font-montserrat">
      <Navbar />

      <main className="flex-1 pt-24 lg:pt-28">
        {/* ── Hero ── */}
        <section className="max-w-4xl mx-auto px-4 sm:px-6 py-12 md:py-16 text-center">
          <span className="inline-block px-3 py-1 mb-4 rounded-full border border-[#1C1C1C]/20 text-[11px] font-semibold tracking-[0.25em] uppercase text-[#1C1C1C]/70">
            CORPORATE OVERVIEW
          </span>
          <h1
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#1C1C1C] leading-tight mb-4 tracking-tight"
            style={{ fontFamily: 'var(--font-didot)' }}
          >
            About Us
          </h1>
          <p className="text-base sm:text-lg text-[#1C1C1C]/80 max-w-2xl mx-auto leading-relaxed font-normal">
            AÉRI Makhana is a brand of H&amp;G Ventures Private Limited, part of KHT
            Group, a business group with 25+ years of experience.
          </p>
        </section>

        {/* ── Section KHT Group ── */}
        <section className="max-w-6xl mx-auto px-4 sm:px-6 pb-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            <div className="p-5 rounded-xl border border-gray-200 bg-white text-center flex flex-col justify-center min-h-[90px] shadow-sm">
              <p className="font-bold text-[#1C1C1C] text-sm">KHT Group</p>
            </div>

            <div className="p-5 rounded-xl border border-gray-200 bg-white text-center flex flex-col justify-center min-h-[90px] shadow-sm">
              <p className="font-bold text-[#1C1C1C] text-sm">KHT Developers</p>
              <p className="text-xs text-gray-500 mt-1">Real estate</p>
            </div>

            <div className="p-5 rounded-xl border border-gray-200 bg-white text-center flex flex-col justify-center min-h-[90px] shadow-sm">
              <p className="font-bold text-[#1C1C1C] text-sm">
                KHT Pharma Private Limited
              </p>
            </div>

            <div className="p-5 rounded-xl border border-gray-200 bg-white text-center flex flex-col justify-center min-h-[90px] shadow-sm">
              <p className="font-bold text-[#1C1C1C] text-sm">KHT Polymers</p>
              <p className="text-xs text-gray-500 mt-1">
                Plastic carry bags manufacturing
              </p>
            </div>

            <div className="p-5 rounded-xl border border-gray-200 bg-white text-center flex flex-col justify-center min-h-[90px] shadow-sm">
              <p className="font-bold text-[#1C1C1C] text-sm">
                Moksh Tarpaulin India Pvt Ltd
              </p>
              <p className="text-xs text-gray-500 mt-1">Tarpaulin manufacturing</p>
            </div>
          </div>
        </section>

        {/* ── Section Manufacturing Network ── */}
        <section className="bg-[#F5F3F0] py-16 border-y border-[#1C1C1C]/10">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-12">
            <h2
              className="text-2xl sm:text-3xl font-bold text-[#1C1C1C] text-center mb-3 tracking-tight"
              style={{ fontFamily: 'var(--font-didot)' }}
            >
              Manufacturing Network
            </h2>
            <p className="text-sm text-gray-700 text-center max-w-2xl mx-auto mb-10 leading-relaxed font-normal">
              Partner facilities in Rajasthan, Bihar and Gujarat. Facility details are
              shared with qualified buyers.
            </p>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-6">
              {/* Four Cities List */}
              <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { city: 'Jaipur, Rajasthan' },
                  { city: 'Katihar, Bihar' },
                  { city: 'Purnea, Bihar' },
                  { city: 'Ahmedabad, Gujarat' },
                ].map((item) => (
                  <div
                    key={item.city}
                    className="p-5 rounded-xl bg-white border border-[#1C1C1C]/10 shadow-sm"
                  >
                    <p className="font-bold text-[#1C1C1C] text-base mb-1">
                      {item.city}
                    </p>
                    <p className="text-xs text-gray-500 font-medium">Partner facility</p>
                  </div>
                ))}
              </div>

              {/* India Map with 4 pins */}
              <div className="lg:col-span-6 flex justify-center">
                <div className="relative w-full max-w-sm aspect-[4/5] bg-white rounded-2xl border border-gray-200 p-6 shadow-sm flex flex-col justify-between">
                  <div className="text-center mb-2">
                    <span className="text-xs font-semibold text-gray-500 tracking-wider uppercase">
                      India Partner Facility Locations
                    </span>
                  </div>

                  <svg
                    viewBox="0 0 300 340"
                    className="w-full h-auto text-gray-800"
                    fill="none"
                    stroke="currentColor"
                  >
                    {/* Simplified schematic map outline of India */}
                    <path
                      d="M130,20 L150,15 L170,30 L160,55 L180,75 L210,80 L235,95 L255,100 L245,120 L210,130 L220,150 L200,165 L180,190 L160,240 L150,290 L140,320 L135,290 L115,240 L90,200 L60,185 L50,155 L75,140 L85,110 L105,95 L115,65 Z"
                      fill="#FAF8F5"
                      stroke="#D1D5DB"
                      strokeWidth="2"
                    />

                    {/* Jaipur Pin (Rajasthan) */}
                    <g transform="translate(100, 115)">
                      <circle cx="0" cy="0" r="4" fill="#1C1C1C" />
                      <circle cx="0" cy="0" r="7" stroke="#1C1C1C" strokeWidth="1.5" />
                      <text x="12" y="4" fontSize="10" fill="#1C1C1C" fontWeight="600" fontFamily="sans-serif">
                        Jaipur
                      </text>
                    </g>

                    {/* Ahmedabad Pin (Gujarat) */}
                    <g transform="translate(80, 160)">
                      <circle cx="0" cy="0" r="4" fill="#1C1C1C" />
                      <circle cx="0" cy="0" r="7" stroke="#1C1C1C" strokeWidth="1.5" />
                      <text x="-70" y="4" fontSize="10" fill="#1C1C1C" fontWeight="600" fontFamily="sans-serif">
                        Ahmedabad
                      </text>
                    </g>

                    {/* Purnea Pin (Bihar) */}
                    <g transform="translate(205, 125)">
                      <circle cx="0" cy="0" r="4" fill="#1C1C1C" />
                      <circle cx="0" cy="0" r="7" stroke="#1C1C1C" strokeWidth="1.5" />
                      <text x="12" y="2" fontSize="10" fill="#1C1C1C" fontWeight="600" fontFamily="sans-serif">
                        Purnea
                      </text>
                    </g>

                    {/* Katihar Pin (Bihar) */}
                    <g transform="translate(205, 145)">
                      <circle cx="0" cy="0" r="4" fill="#1C1C1C" />
                      <circle cx="0" cy="0" r="7" stroke="#1C1C1C" strokeWidth="1.5" />
                      <text x="12" y="4" fontSize="10" fill="#1C1C1C" fontWeight="600" fontFamily="sans-serif">
                        Katihar
                      </text>
                    </g>
                  </svg>

                  <div className="text-center text-[11px] text-gray-500 mt-2">
                    Sourcing, Processing, Grading &amp; Export Dispatch Centers
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Section Certifications ── */}
        <section className="py-16 bg-white border-b border-[#1C1C1C]/10 text-center">
          <div className="max-w-5xl mx-auto px-4 sm:px-6">
            <h2
              className="text-2xl sm:text-3xl font-bold text-[#1C1C1C] mb-6 tracking-tight"
              style={{ fontFamily: 'var(--font-didot)' }}
            >
              Certifications
            </h2>
            <div className="flex flex-wrap gap-2.5 justify-center mb-6">
              {[
                'US FDA registered',
                'FSSC 22000',
                'BRCGS (in progress)',
                'Halal',
                'Kosher',
                'FSSAI',
                'APEDA',
                'Vegan',
              ].map((badge) => (
                <span
                  key={badge}
                  className="px-4 py-2 rounded-full border border-gray-300 text-xs font-semibold text-gray-800 bg-[#FAF8F5]"
                >
                  {badge}
                </span>
              ))}
            </div>
            <p className="text-sm text-gray-600 font-medium">
              Laboratory testing at NABL-accredited labs.
            </p>
          </div>
        </section>

        {/* ── Section Export Documentation & Packing Details ── */}
        <section className="py-16 bg-[#FAF8F5] border-b border-[#1C1C1C]/10">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 md:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
              {/* Documents List */}
              <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm">
                <h3 className="text-xl font-bold text-[#1C1C1C] mb-6">
                  Standard Export Documentation
                </h3>
                <ul className="space-y-3">
                  {exportDocs.map((doc) => (
                    <li
                      key={doc}
                      className="flex items-center gap-3 text-sm text-gray-700 font-medium"
                    >
                      <svg
                        className="w-4 h-4 text-[#1C1C1C] shrink-0"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2.5"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      <span>{doc}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Packing Details */}
              <div className="flex flex-col gap-6">
                <div className="bg-white p-7 rounded-2xl border border-gray-200 shadow-sm">
                  <h4 className="text-xs font-semibold tracking-[0.2em] uppercase text-gray-500 mb-2">
                    Raw
                  </h4>
                  <p className="text-sm text-gray-800 leading-relaxed font-normal">
                    10 kg multi-layer food-grade poly bags in master cartons or PP woven bags
                  </p>
                </div>

                <div className="bg-white p-7 rounded-2xl border border-gray-200 shadow-sm">
                  <h4 className="text-xs font-semibold tracking-[0.2em] uppercase text-gray-500 mb-2">
                    Private Label Retail
                  </h4>
                  <p className="text-sm text-gray-800 leading-relaxed font-normal">
                    Nitrogen-flushed pillow pouches or stand-up doypacks, in export cartons
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Section Leadership ── */}
        <section className="py-16 bg-white border-b border-[#1C1C1C]/10 text-center">
          <div className="max-w-xl mx-auto px-4 sm:px-6">
            <h2
              className="text-2xl sm:text-3xl font-bold text-[#1C1C1C] mb-4 tracking-tight"
              style={{ fontFamily: 'var(--font-didot)' }}
            >
              Leadership
            </h2>
            <div className="inline-flex items-center gap-3 p-5 rounded-2xl bg-[#FAF8F5] border border-gray-200">
              <span className="text-base font-bold text-[#1C1C1C]">
                Kriya Kanunga, Founder &amp; Director
              </span>
              <a
                href="https://www.linkedin.com/in/kriya-kanunga"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Kriya Kanunga LinkedIn Profile"
                className="w-8 h-8 rounded-full bg-[#1C1C1C] text-white flex items-center justify-center hover:bg-black transition-colors"
              >
                <svg
                  className="w-4 h-4 fill-current"
                  viewBox="0 0 24 24"
                >
                  <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
                </svg>
              </a>
            </div>
          </div>
        </section>

        {/* ── End Section: Buyer Factory Visits ── */}
        <section className="py-16 bg-[#FAF8F5] text-center">
          <div className="max-w-xl mx-auto px-4 sm:px-6">
            <p className="text-lg font-semibold text-[#1C1C1C] mb-6">
              Buyer factory visits can be arranged.
            </p>
            <button
              onClick={() => openModal()}
              type="button"
              className="min-h-[44px] px-8 py-3 bg-[#1C1C1C] text-white text-sm font-semibold rounded-lg hover:bg-black transition-colors active:scale-95 shadow-sm"
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
