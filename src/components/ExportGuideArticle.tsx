'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useContactModal } from '@/context/ContactModalContext';
import { JournalArticle } from '@/lib/journalData';

const certificationsData = [
  {
    name: 'FSSAI License',
    purpose: 'Indian food business regulatory compliance',
  },
  {
    name: 'US FDA Facility Registration',
    purpose:
      'Registration of applicable food manufacturing, processing, packing or holding facilities exporting to the USA',
  },
  {
    name: 'HACCP',
    purpose:
      'Hazard Analysis and Critical Control Points for food safety management',
  },
  {
    name: 'ISO 22000',
    purpose: 'Food safety management systems',
  },
  {
    name: 'BRCGS',
    purpose:
      'Internationally recognised food safety and quality certification',
  },
  {
    name: 'FSSC 22000',
    purpose: 'Food safety management system certification',
  },
  {
    name: 'Halal Certification',
    purpose: 'Compliance with applicable Halal requirements',
  },
  {
    name: 'Kosher Certification',
    purpose: 'Compliance with applicable Kosher requirements',
  },
  {
    name: 'Organic Certification',
    purpose: 'Verification of organic production and handling requirements',
  },
];

const testingParameters = [
  {
    title: 'Certificate of Analysis (COA)',
    desc: 'Product-specific quality and testing results.',
  },
  {
    title: 'Microbiological Testing',
    desc: 'Assessment of relevant microorganisms and food safety parameters.',
  },
  {
    title: 'Heavy Metals Testing',
    desc: 'Testing for contaminants such as lead, arsenic, cadmium and mercury.',
  },
  {
    title: 'Pesticide Residue Analysis',
    desc: 'Verification of applicable pesticide residue limits.',
  },
  {
    title: 'Moisture Analysis',
    desc: 'Particularly important for maintaining the crunchiness and shelf life of roasted and flavoured Makhana.',
  },
  {
    title: 'Nutritional Analysis',
    desc: 'Information on calories, protein, carbohydrates, fats and other nutritional parameters.',
  },
  {
    title: 'Shelf-Life Testing',
    desc: 'Assessment of product stability under specified storage conditions.',
  },
  {
    title: 'Allergen Declaration',
    desc: 'Information about allergens and potential cross-contact.',
  },
];

const exportDocuments = [
  {
    name: 'Import Export Code (IEC)',
    purpose: 'Essential exporter identification for Indian exports',
  },
  {
    name: 'Commercial Invoice',
    purpose: 'Declares product value and transaction details',
  },
  {
    name: 'Packing List',
    purpose: 'Details shipment packaging, quantity and weights',
  },
  {
    name: 'Certificate of Origin',
    purpose: 'Establishes the country of origin',
  },
  {
    name: 'Bill of Lading',
    purpose: 'Shipping document issued by the carrier',
  },
  {
    name: 'Certificate of Analysis',
    purpose: 'Confirms agreed product testing parameters',
  },
  {
    name: 'Phytosanitary Certificate',
    purpose: 'Required for applicable plant products and destination requirements',
  },
  {
    name: 'Health Certificate',
    purpose: 'Required where applicable under destination-market regulations',
  },
];

const countryRequirements = [
  {
    country: 'USA',
    details:
      'Applicable FDA food facility registration, prior notice and importer obligations under the Foreign Supplier Verification Program (FSVP).',
  },
  {
    country: 'Canada',
    details:
      'Canadian Food Inspection Agency (CFIA) requirements, applicable importer licensing and food safety regulations.',
  },
  {
    country: 'Switzerland',
    details:
      'Swiss Federal Food Safety and Veterinary Office (FSVO) requirements, food safety standards and applicable labelling regulations.',
  },
  {
    country: 'Australia',
    details:
      'Department of Agriculture, Fisheries and Forestry (DAFF) biosecurity requirements and applicable Food Standards Australia New Zealand (FSANZ) regulations.',
  },
];

const faqs = [
  {
    q: '1. What certifications are required to export Makhana from India?',
    a: 'Requirements depend on the destination market and buyer. Commonly relevant registrations and standards include FSSAI, applicable FDA food facility registration, APEDA, HACCP, ISO 22000 and BRCGS. Halal and Kosher certifications may also be required by specific buyers.',
  },
  {
    q: '2. Is FDA registration required for exporting Makhana to the USA?',
    a: 'Applicable foreign food facilities manufacturing, processing, packing or holding food for consumption in the USA generally need FDA registration, unless exempt. FDA registration is not the same as FDA product approval or certification.',
  },
  {
    q: '3. What laboratory tests are required for Makhana exports?',
    a: 'Common tests include microbiological analysis, heavy metals, pesticide residues and moisture analysis. Nutritional analysis and shelf-life testing may also be required depending on the product and buyer specifications.',
  },
  {
    q: '4. Is a phytosanitary certificate required for exporting Makhana?',
    a: "Phytosanitary requirements depend on the product's processing, classification and destination-country regulations. Buyers should confirm the applicable requirement before shipment.",
  },
  {
    q: '5. Can AÉRI provide BRCGS, Halal and Kosher-certified Makhana?',
    a: 'Yes. AÉRI coordinates production through partner manufacturing facilities with relevant certifications, subject to facility certification scope, product specifications and order requirements.',
  },
];

export default function ExportGuideArticle({
  article,
}: {
  article: JournalArticle;
}) {
  const { openModal } = useContactModal();
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#1C1C1C] flex flex-col font-montserrat">
      <Navbar />

      <main className="flex-1 pt-24 lg:pt-28 pb-20">
        <article className="max-w-4xl mx-auto px-4 sm:px-6">
          {/* Back Link */}
          <Link
            href="/journal"
            className="inline-flex items-center text-xs font-semibold uppercase tracking-wider text-gray-500 hover:text-black mb-8 transition-colors"
          >
            ← Back to Journal
          </Link>

          {/* Badge & Meta */}
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <span className="inline-block px-3 py-1 rounded-full bg-[#1C1C1C] text-white text-[10px] font-semibold tracking-widest uppercase">
              B2B Sourcing Guide
            </span>
            <span className="text-xs font-medium text-gray-500 tracking-wider uppercase">
              {article.date} · -by {article.author}
            </span>
          </div>

          {/* Single H1 Heading */}
          <h1
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-[#1C1C1C] leading-[1.25] mb-6 tracking-tight"
            style={{ fontFamily: 'var(--font-didot)' }}
          >
            {article.title}
          </h1>

          <p className="text-base sm:text-lg text-gray-600 mb-8 leading-relaxed font-normal">
            {article.subtitle}
          </p>

          {/* Featured Image */}
          <div className="relative w-full aspect-[16/10] sm:aspect-[16/9] rounded-2xl overflow-hidden mb-12 border border-gray-200 shadow-sm bg-white">
            <Image
              src={article.image}
              alt={article.title}
              fill
              priority
              sizes="(max-width: 896px) 100vw, 896px"
              className="object-cover"
            />
            <div className="absolute bottom-3 right-3 bg-black/60 backdrop-blur-sm text-white text-[11px] px-3 py-1 rounded-lg">
              Export-grade Phool Makhana
            </div>
          </div>

          {/* Introduction Content */}
          <div className="prose max-w-none text-gray-800 leading-relaxed space-y-5 mb-14 text-base sm:text-lg font-normal">
            <p>
              India is the world&apos;s leading producer of Makhana (Fox Nuts),
              supplying raw, roasted and flavoured products to international
              food brands, importers and distributors.
            </p>
            <p>
              For international buyers, selecting a Makhana exporter involves
              more than comparing prices. Food safety certifications, product
              testing, manufacturing standards and export documentation are
              essential when importing food products into markets such as the
              USA, Canada, Switzerland, Australia and Europe.
            </p>
            <p className="font-medium text-[#1C1C1C]">
              This guide covers the key certifications, quality documents and
              export requirements buyers should verify when sourcing Makhana
              from India.
            </p>
          </div>

          {/* ──────────────── Section 1: Food Safety Certifications ──────────────── */}
          <section className="mb-14 scroll-mt-24">
            <h2
              className="text-2xl sm:text-3xl font-bold text-[#1C1C1C] mb-4 pb-2 border-b border-gray-200"
              style={{ fontFamily: 'var(--font-didot)' }}
            >
              1. Food Safety Certifications for Makhana Manufacturers in India
            </h2>
            <p className="text-gray-700 leading-relaxed mb-6">
              International buyers often require manufacturers and suppliers to
              meet specific food safety standards before approving a sourcing
              arrangement.
            </p>
            <p className="text-sm font-semibold uppercase tracking-wider text-gray-600 mb-3">
              The following certifications and registrations are relevant to the
              Indian food export industry:
            </p>

            {/* Responsive Table */}
            <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white shadow-sm mb-6">
              <table className="w-full text-left text-sm border-collapse min-w-[550px]">
                <thead>
                  <tr className="bg-[#1C1C1C] text-white">
                    <th className="py-3 px-4 font-semibold text-xs tracking-wider uppercase w-1/3">
                      Certification / Registration
                    </th>
                    <th className="py-3 px-4 font-semibold text-xs tracking-wider uppercase">
                      Purpose
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {certificationsData.map((row, idx) => (
                    <tr
                      key={idx}
                      className={idx % 2 === 0 ? 'bg-white' : 'bg-[#FAF8F5]'}
                    >
                      <td className="py-3 px-4 font-semibold text-[#1C1C1C]">
                        {row.name}
                      </td>
                      <td className="py-3 px-4 text-gray-700 leading-relaxed">
                        {row.purpose}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Note Box */}
            <div className="p-4 sm:p-5 rounded-xl bg-[#F5F3F0] border-l-4 border-[#1C1C1C] space-y-2 text-sm text-gray-800">
              <p>
                <strong className="text-[#1C1C1C]">Important:</strong> These
                certifications are not interchangeable. Requirements depend on
                the buyer, product, destination market and manufacturing facility.
              </p>
              <p>
                BRCGS, Halal and Kosher certifications are particularly relevant
                for buyers supplying international supermarket chains, retail
                brands and specialised food markets.
              </p>
            </div>
          </section>

          {/* ──────────────── Section 2: Product Testing & Quality Documentation ──────────────── */}
          <section className="mb-14 scroll-mt-24">
            <h2
              className="text-2xl sm:text-3xl font-bold text-[#1C1C1C] mb-4 pb-2 border-b border-gray-200"
              style={{ fontFamily: 'var(--font-didot)' }}
            >
              2. Product Testing and Quality Documentation
            </h2>
            <p className="text-gray-700 leading-relaxed mb-6">
              Product testing helps international buyers verify that Makhana meets
              agreed quality and food safety specifications.
            </p>
            <p className="text-sm font-semibold uppercase tracking-wider text-gray-600 mb-4">
              Depending on the product and destination market, buyers may
              require:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              {testingParameters.map((param, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-xl bg-white border border-gray-200 shadow-sm flex flex-col justify-start"
                >
                  <h3 className="font-semibold text-sm text-[#1C1C1C] mb-1.5 flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#1C1C1C] mt-1.5 shrink-0" />
                    <span>{param.title}</span>
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-600 leading-relaxed pl-3.5">
                    {param.desc}
                  </p>
                </div>
              ))}
            </div>

            <p className="p-4 rounded-xl bg-white border border-gray-200 text-sm text-gray-800 italic">
              At AÉRI, product quality is assessed against agreed
              specifications, with relevant laboratory reports and documentation
              provided according to buyer requirements.
            </p>
          </section>

          {/* ──────────────── Section 3: Export Documentation ──────────────── */}
          <section className="mb-14 scroll-mt-24">
            <h2
              className="text-2xl sm:text-3xl font-bold text-[#1C1C1C] mb-4 pb-2 border-b border-gray-200"
              style={{ fontFamily: 'var(--font-didot)' }}
            >
              3. Export Documentation for Shipping Makhana from India
            </h2>
            <p className="text-gray-700 leading-relaxed mb-6">
              Export documentation is essential for customs clearance, shipment
              processing and destination-market compliance.
            </p>
            <p className="text-sm font-semibold uppercase tracking-wider text-gray-600 mb-3">
              Commonly required export documents include:
            </p>

            {/* Responsive Table */}
            <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white shadow-sm mb-6">
              <table className="w-full text-left text-sm border-collapse min-w-[550px]">
                <thead>
                  <tr className="bg-[#1C1C1C] text-white">
                    <th className="py-3 px-4 font-semibold text-xs tracking-wider uppercase w-1/3">
                      Document
                    </th>
                    <th className="py-3 px-4 font-semibold text-xs tracking-wider uppercase">
                      Purpose
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {exportDocuments.map((row, idx) => (
                    <tr
                      key={idx}
                      className={idx % 2 === 0 ? 'bg-white' : 'bg-[#FAF8F5]'}
                    >
                      <td className="py-3 px-4 font-semibold text-[#1C1C1C]">
                        {row.name}
                      </td>
                      <td className="py-3 px-4 text-gray-700 leading-relaxed">
                        {row.purpose}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="p-4 sm:p-5 rounded-xl bg-[#F5F3F0] text-sm text-gray-800 space-y-2">
              <p>
                The exact documentation depends on the product, ingredients,
                destination country and applicable import regulations.
              </p>
              <p>
                For example, food import requirements differ between the USA,
                Canada, Switzerland and Australia. Importers should verify the
                applicable requirements before shipment.
              </p>
            </div>
          </section>

          {/* ──────────────── Section 4: Country-Specific Import Requirements ──────────────── */}
          <section className="mb-14 scroll-mt-24">
            <h2
              className="text-2xl sm:text-3xl font-bold text-[#1C1C1C] mb-4 pb-2 border-b border-gray-200"
              style={{ fontFamily: 'var(--font-didot)' }}
            >
              4. Country-Specific Import Requirements
            </h2>
            <p className="text-gray-700 leading-relaxed mb-6">
              Different markets have different food safety, labelling and import
              requirements:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              {countryRequirements.map((c, idx) => (
                <div
                  key={idx}
                  className="p-5 rounded-xl bg-white border border-gray-200 shadow-sm"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <span className="w-2 h-2 rounded-full bg-[#1C1C1C]" />
                    <h3 className="font-bold text-base text-[#1C1C1C]">
                      {c.country}
                    </h3>
                  </div>
                  <p className="text-xs sm:text-sm text-gray-700 leading-relaxed">
                    {c.details}
                  </p>
                </div>
              ))}
            </div>

            <p className="text-sm text-gray-800 font-medium bg-[#FAF8F5] p-3 rounded-lg border border-gray-200 text-center">
              AÉRI coordinates product documentation and export requirements
              according to the destination market and buyer&apos;s
              specifications.
            </p>
          </section>

          {/* ──────────────── Section 5: AÉRI Makhana Capabilities ──────────────── */}
          <section className="mb-14 scroll-mt-24">
            <h2
              className="text-2xl sm:text-3xl font-bold text-[#1C1C1C] mb-4 pb-2 border-b border-gray-200"
              style={{ fontFamily: 'var(--font-didot)' }}
            >
              5. AÉRI Makhana: Quality Compliance and Export Documentation
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              AÉRI Makhana works with international food importers, distributors
              and private-label brands through an established network of
              manufacturing partners across India.
            </p>
            <p className="text-gray-700 leading-relaxed mb-8">
              Our sourcing and export operations are supported by applicable
              regulatory registrations, food safety documentation, product
              testing and quality control procedures.
            </p>

            <div className="bg-white rounded-2xl border border-gray-200 p-6 sm:p-8 shadow-sm space-y-8 mb-8">
              <h3 className="text-xl font-bold text-[#1C1C1C] pb-2 border-b border-gray-100">
                Our Compliance and Documentation Capabilities
              </h3>

              {/* Sub-grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-3">
                    Regulatory Registrations
                  </h4>
                  <ul className="space-y-2 text-sm text-gray-800">
                    <li className="flex items-center gap-2">
                      <span className="text-green-600 font-bold">✓</span> FSSAI
                      licensing
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-green-600 font-bold">✓</span> US FDA
                      food facility registration (where applicable)
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-green-600 font-bold">✓</span> APEDA
                      registration
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-green-600 font-bold">✓</span> Import
                      Export Code (IEC)
                    </li>
                  </ul>
                </div>

                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-3">
                    International Certifications (Partner Network)
                  </h4>
                  <p className="text-xs text-gray-600 mb-2">
                    Production coordinated through partner facilities holding:
                  </p>
                  <div className="flex flex-wrap gap-2 text-xs font-medium text-gray-800">
                    {['BRCGS', 'HACCP', 'ISO 22000 / FSSC 22000', 'Halal', 'Kosher', 'Organic'].map(
                      (cert) => (
                        <span
                          key={cert}
                          className="px-2.5 py-1 rounded bg-[#FAF8F5] border border-gray-200"
                        >
                          {cert}
                        </span>
                      )
                    )}
                  </div>
                  <p className="text-[11px] text-gray-500 mt-2">
                    Subject to selected facility, certification scope and product
                    requirements.
                  </p>
                </div>

                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-3">
                    Product Testing &amp; Quality Reports
                  </h4>
                  <ul className="space-y-1 text-xs text-gray-700">
                    <li>• Certificate of Analysis (COA)</li>
                    <li>• Heavy metals testing</li>
                    <li>• Microbiological testing</li>
                    <li>• Pesticide residue analysis</li>
                    <li>• Moisture analysis</li>
                    <li>• Nutritional analysis</li>
                    <li>• Shelf-life documentation</li>
                  </ul>
                </div>

                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-3">
                    Export Documentation Handled
                  </h4>
                  <ul className="space-y-1 text-xs text-gray-700">
                    <li>• Commercial Invoice and Packing List</li>
                    <li>• Certificate of Origin</li>
                    <li>• Bill of Lading</li>
                    <li>• Phytosanitary Certificate (where applicable)</li>
                    <li>• Destination-market compliance documentation</li>
                  </ul>
                </div>
              </div>

              {/* Quality Checks Across Supply Network */}
              <div className="pt-6 border-t border-gray-100">
                <h4 className="text-base font-bold text-[#1C1C1C] mb-2">
                  Quality Checks Across Our Supply Network
                </h4>
                <p className="text-sm text-gray-700 leading-relaxed mb-3">
                  We maintain strict product specifications and quality checks
                  across our sourcing and manufacturing network.
                </p>
                <p className="text-sm text-gray-700 leading-relaxed mb-4">
                  Our focus includes grading consistency for raw Phool Makhana,
                  moisture control for roasted and flavoured products, packaging
                  integrity and batch-level quality documentation.
                </p>
                <p className="text-sm font-medium text-[#1C1C1C] bg-[#FAF8F5] p-3 rounded-lg border border-gray-200">
                  Whether you require raw Phool Makhana, olive oil-roasted
                  products or private-label Makhana, AÉRI coordinates sourcing
                  and manufacturing according to your specifications and
                  compliance requirements.
                </p>
              </div>
            </div>
          </section>

          {/* ──────────────── Section 6: Frequently Asked Questions ──────────────── */}
          <section className="mb-14 scroll-mt-24">
            <h2
              className="text-2xl sm:text-3xl font-bold text-[#1C1C1C] mb-6 pb-2 border-b border-gray-200"
              style={{ fontFamily: 'var(--font-didot)' }}
            >
              Frequently Asked Questions
            </h2>

            <div className="space-y-3">
              {faqs.map((faq, idx) => {
                const isOpen = openFaq === idx;
                return (
                  <div
                    key={idx}
                    className="rounded-xl border border-gray-200 bg-white overflow-hidden transition-all shadow-sm"
                  >
                    <button
                      onClick={() => toggleFaq(idx)}
                      type="button"
                      className="w-full py-4 px-5 text-left font-semibold text-sm sm:text-base text-[#1C1C1C] flex items-center justify-between gap-4 hover:bg-[#FAF8F5] transition-colors"
                    >
                      <span>{faq.q}</span>
                      <span className="text-lg font-bold text-gray-400 shrink-0">
                        {isOpen ? '−' : '+'}
                      </span>
                    </button>
                    {isOpen && (
                      <div className="px-5 pb-5 pt-1 text-sm text-gray-700 leading-relaxed border-t border-gray-100 bg-[#FAF8F5]/50">
                        {faq.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </section>

          {/* ──────────────── Section 7: Looking for an Export-Ready Supplier CTA Box ──────────────── */}
          <div className="rounded-2xl bg-[#1C1C1C] text-white p-6 sm:p-10 shadow-lg text-center">
            <h3
              className="text-2xl sm:text-3xl font-bold mb-4 tracking-tight"
              style={{ fontFamily: 'var(--font-didot)' }}
            >
              Looking for an Export-Ready Makhana Supplier in India?
            </h3>
            <p className="text-sm sm:text-base text-gray-300 max-w-2xl mx-auto mb-4 leading-relaxed font-normal">
              AÉRI Makhana supplies raw Phool Makhana and olive oil-roasted and
              flavoured Makhana to international importers, distributors and food
              brands.
            </p>
            <p className="text-xs sm:text-sm text-gray-400 max-w-2xl mx-auto mb-6 leading-relaxed font-normal">
              With regulatory documentation, product testing, quality checks and
              access to appropriately certified manufacturing facilities, we
              support buyers with their bulk sourcing and private-label
              requirements.
            </p>
            <p className="text-sm text-white font-medium mb-6">
              Get in touch with the AÉRI Makhana team for product specifications,
              certification requirements, laboratory reports and export
              quotations.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
              <button
                onClick={() => openModal('Raw Phool Makhana')}
                type="button"
                className="w-full sm:w-auto min-h-[48px] px-8 py-3 bg-white text-[#1C1C1C] text-sm font-semibold rounded-xl hover:bg-gray-100 transition-colors active:scale-95 shadow-sm"
              >
                Contact Us
              </button>
              <a
                href="mailto:kriya@aerisnacks.com"
                className="w-full sm:w-auto min-h-[48px] px-8 py-3 border border-white/30 text-white text-sm font-semibold rounded-xl hover:bg-white/10 transition-colors flex items-center justify-center"
              >
                Email: kriya@aerisnacks.com
              </a>
            </div>

            <div className="pt-6 border-t border-white/15 text-xs text-gray-400 space-y-1">
              <p className="font-semibold text-white/90">
                AÉRI Makhana | Your Makhana Sourcing &amp; Export Partner in India
              </p>
              <p>A brand of H&amp;G Ventures Private Limited, India.</p>
              <p className="text-white/60">
                Website: <span className="underline">www.aerisnacks.com</span>
              </p>
            </div>
          </div>
        </article>
      </main>

      <Footer />
    </div>
  );
}
