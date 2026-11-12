'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useContactModal } from '@/context/ContactModalContext';

const suitableFor = [
  {
    title: 'Food Importers & Distributors',
    desc: 'High-margin, shelf-stable popped water lily seeds packaged and documented for international distribution.',
    icon: '🚢',
  },
  {
    title: 'Supermarket & Retail Chains',
    desc: 'Customized private-label packaging with barcoding, nutritional panels, and destination compliance.',
    icon: '🛒',
  },
  {
    title: 'Health & Wellness Brands',
    desc: 'Keto, gluten-free, vegan, plant-based protein superfood snacks to complement clean-label product portfolios.',
    icon: '🌿',
  },
  {
    title: 'Food Entrepreneurs & Startups',
    desc: 'Rapid brand launch with low capital expenditure, flexible initial MOQ volumes, and custom R&D.',
    icon: '🚀',
  },
  {
    title: 'Established Snack Manufacturers',
    desc: 'Expand snack catalogs into popped fox nuts without investing in specialized roasting machinery.',
    icon: '🏭',
  },
];

const productOptions = [
  {
    title: 'Raw Phool Makhana',
    badge: 'Category A',
    image: '/private-label-bulk.webp',
    alt: 'Raw Phool Makhana bulk export packaging',
    description:
      'Popped, unseasoned white Makhana available in commercial grades (4+, 5+, and 6+ suta), with handpicked sorting for improved size consistency and zero residue.',
    specs: ['4+, 5+, 6+ Suta Grades', 'Moisture <3% for Crispness', 'Multi-wall Bulk or Retail Bags'],
    product: 'Private Label: Raw',
  },
  {
    title: 'Olive Oil-Roasted & Flavoured',
    badge: 'Category B',
    image: '/private-label-mockup-pouch.webp',
    alt: 'Olive oil roasted and flavoured makhana branded pouch',
    description:
      'Ready-to-eat Makhana roasted in 100% pure olive oil and selected premium oils, with customized seasoning formulations and uniform enrobing.',
    specs: ['Slow Olive Oil Roasting', 'Nitrogen Gas Flushed', '12+ Months Crisp Shelf-Life'],
    product: 'Private Label: Roasted or Flavored',
  },
  {
    title: 'Retail Packaging Formats',
    badge: 'Packaging',
    image: '/private-label-mockup-jars.webp',
    alt: 'Clear PET Jars and custom composite cans',
    description:
      'Turnkey private-label packaging across PET jars with induction seals, stand-up resealable doypacks, pillow pouches, and composite cans.',
    specs: ['PET Jars & Golden Lids', 'Stand-up Zipper Pouches', 'Composite Paper Canisters'],
    product: 'Private Label: Packaging Inquiry',
  },
];

const flavours = [
  {
    category: 'Classic & Savoury',
    items: [
      { name: 'Himalayan Salt & Pepper', desc: 'Light, mineral-rich salt with cracked black pepper.' },
      { name: 'Peri Peri', desc: 'Vibrant bird’s eye chili with zesty citrus tang.' },
      { name: 'Artisanal Cheese', desc: 'Rich savoury cheddar note for mainstream snacking.' },
      { name: 'Lemon & Garden Mint', desc: 'Herbaceous coolness with a delicate citrus punch.' },
    ],
  },
  {
    category: 'Gourmet & Sweet Indulgence',
    items: [
      { name: 'Black Truffle', desc: 'Luxurious earthy aroma balanced by fine sea salt.' },
      { name: 'Dark Chocolate', desc: 'Velvety cocoa glaze offering a guilt-free sweet crunch.' },
      { name: 'Caramel & Sea Salt', desc: 'Rich golden sweetness with sea salt contrast.' },
      { name: 'Strawberry Infusion', desc: 'Delicate berry fruitiness for dessert snack aisles.' },
    ],
  },
];

const packagingOptions = [
  {
    name: 'Stand-Up Pouches (Doypack)',
    desc: 'Resealable zip with nitrogen flushing to maintain freshness and crisp bite. Matt or gloss finish.',
  },
  {
    name: 'Clear PET Jars',
    desc: 'Rigid transparent jars with gold/black screw caps and tamper-evident foil induction seal.',
  },
  {
    name: 'Pillow Pouches',
    desc: 'Cost-effective high-speed flexible retail pouches ideal for volume impulse sales and airlines.',
  },
  {
    name: 'Composite Cans (Canisters)',
    desc: 'Spiral-wound paperboard canisters with foil inner membrane and plastic snap overcap.',
  },
];

const eightSteps = [
  { num: '01', title: 'Buyer Enquiry', desc: 'Initial discussion on product requirements, target market, packaging format, and quantity expectations.' },
  { num: '02', title: 'Product Selection', desc: 'Selection of raw grade (4+, 5+, 6+ suta) or roasted flavour profiles from catalog or custom brief.' },
  { num: '03', title: 'Quotation & MOQ', desc: 'Assessment of requirements and provision of transparent pricing, tier discounts, and MOQ terms.' },
  { num: '04', title: 'Sample Approval', desc: 'Dispatch of customized product samples and seasoning formulation for buyer evaluation and sign-off.' },
  { num: '05', title: 'Packaging Finalisation', desc: 'Integration of brand logo, packaging dielines, regulatory nutrition labels, and destination barcodes.' },
  { num: '06', title: 'Batch Production', desc: 'Olive oil roasting, automated seasoning enrobing, and nitrogen gas flushed packing under strict HACCP controls.' },
  { num: '07', title: 'Quality Checks', desc: 'Moisture analysis (<3%), sizing verification, microbiological testing, and issuance of Certificate of Analysis (COA).' },
  { num: '08', title: 'Global Dispatch', desc: 'Palletization, container stuffing, and export logistics documentation (Phytosanitary, COO, Bill of Lading).' },
];

const faqs = [
  {
    q: 'Can I manufacture Makhana under my own brand name in India?',
    a: 'Yes. AÉRI Makhana provides private-label manufacturing for international food brands, supermarkets, and distributors — including customized flavours, product specifications, retail packaging, and branding under your own identity.',
  },
  {
    q: 'What is the MOQ for private-label Makhana?',
    a: 'MOQ depends on the product category (raw vs. roasted), flavour formulation, and packaging format (e.g. printed film rolls vs. custom labeled pre-formed pouches or PET jars). Contact our team with your estimated order quantity for an exact quotation.',
  },
  {
    q: 'Can I customise Makhana flavours?',
    a: 'Yes. AÉRI offers flavour customisation for private-label orders. Buyers can select from our popular catalogue profiles or request bespoke flavour formulations developed by our food technologists according to your target market.',
  },
  {
    q: 'What packaging options are available for private-label Makhana?',
    a: 'Available formats include PET jars, stand-up resealable pouches (doypack), pillow pouches, composite canisters, and bulk multi-wall bags, subject to product and order requirements.',
  },
  {
    q: 'Can AÉRI supply private-label Makhana internationally?',
    a: 'Yes. AÉRI caters to international sourcing and private-label enquiries worldwide, with export supply coordination and comprehensive product documentation (FDA compliance, COA, Phytosanitary, Certificate of Origin) according to applicable market requirements.',
  },
];

export default function PrivateLabelClient() {
  const { openModal } = useContactModal();
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#1C1C1C] flex flex-col font-montserrat">
      <Navbar />

      <main className="flex-1 pt-24 lg:pt-28">
        {/* ── Hero Section ── */}
        <section className="max-w-5xl mx-auto px-4 sm:px-6 py-12 md:py-16 text-center">
          <span className="inline-block px-3.5 py-1 mb-4 rounded-full border border-[#1C1C1C]/20 text-[11px] font-semibold tracking-[0.25em] uppercase text-[#1C1C1C]/80 bg-white/60">
            PRIVATE LABEL &amp; CONTRACT MANUFACTURING IN INDIA
          </span>
          <h1
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-[#1C1C1C] leading-[1.15] mb-5 tracking-tight"
            style={{ fontFamily: 'var(--font-didot)' }}
          >
            Launch Your Own Fox Nuts Snack Brand
          </h1>
          <p className="text-base sm:text-lg text-[#1C1C1C]/80 max-w-3xl mx-auto leading-relaxed font-normal mb-8">
            The global demand for healthier snack alternatives is creating high-margin opportunities for food brands, distributors, and retailers. AÉRI Makhana provides turnkey private-label manufacturing in India — offering raw grading, custom olive-oil roasting, flavour development, retail packaging, and bulk export supply.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={() => openModal('Private Label: Hero CTA')}
              type="button"
              className="min-h-[48px] px-8 py-3 bg-[#1C1C1C] text-white text-sm font-semibold rounded-xl hover:bg-black transition-colors shadow-md active:scale-95"
            >
              Request a Private-Label Quotation
            </button>
            <Link
              href="/journal/private-label-makhana-manufacturing-guide"
              className="min-h-[48px] px-6 py-3 border border-[#1C1C1C]/30 text-[#1C1C1C] text-sm font-semibold rounded-xl hover:bg-white transition-colors inline-flex items-center gap-2"
            >
              Read In-Depth Guide →
            </Link>
          </div>
        </section>

        {/* ── Visual Banner: Real Mockups Showcase ── */}
        <section className="max-w-6xl mx-auto px-4 sm:px-6 mb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white p-6 sm:p-8 rounded-3xl border border-[#1C1C1C]/10 shadow-sm">
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-[#F5F3F0]">
              <Image
                src="/private-label-mockup-pouch.webp"
                alt="Start your own brand with AÉRI Makhana - Custom Pouch Mockup"
                fill
                priority
                sizes="(max-width: 768px) 100vw, 550px"
                className="object-cover"
              />
              <div className="absolute bottom-3 left-3 bg-black/70 backdrop-blur-sm text-white text-xs px-3 py-1.5 rounded-lg">
                Custom Stand-Up Pouches (Your Brand Name)
              </div>
            </div>

            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-[#F5F3F0]">
              <Image
                src="/private-label-mockup-jars.webp"
                alt="Stacked Clear PET Jars with Your Brand Name labels"
                fill
                priority
                sizes="(max-width: 768px) 100vw, 550px"
                className="object-cover"
              />
              <div className="absolute bottom-3 left-3 bg-black/70 backdrop-blur-sm text-white text-xs px-3 py-1.5 rounded-lg">
                Clear PET Jars &amp; Golden Screw Caps
              </div>
            </div>
          </div>
        </section>

        {/* ── Who Is This For? (Suitable For) ── */}
        <section className="bg-[#F5F3F0] py-16 border-y border-[#1C1C1C]/10 mb-16">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <span className="text-xs font-bold uppercase tracking-widest text-[#1C1C1C]/60 mb-2 block">
                TARGET PARTNERS
              </span>
              <h2
                className="text-2xl sm:text-3xl font-bold text-[#1C1C1C]"
                style={{ fontFamily: 'var(--font-didot)' }}
              >
                Who Can Benefit from Private-Label Makhana?
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {suitableFor.map((item) => (
                <div
                  key={item.title}
                  className="bg-white p-6 rounded-2xl border border-[#1C1C1C]/10 shadow-sm flex flex-col justify-start"
                >
                  <div className="text-3xl mb-3">{item.icon}</div>
                  <h3 className="text-base font-bold text-[#1C1C1C] mb-2">{item.title}</h3>
                  <p className="text-sm text-gray-700 leading-relaxed font-normal">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── 3 Primary Product Offerings ── */}
        <section className="max-w-6xl mx-auto px-4 sm:px-6 pb-20">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-widest text-[#1C1C1C]/60 mb-2 block">
              PRIMARY PRODUCT CATEGORIES
            </span>
            <h2
              className="text-2xl sm:text-3xl font-bold text-[#1C1C1C]"
              style={{ fontFamily: 'var(--font-didot)' }}
            >
              Raw, Roasted, or Ready-to-Eat Under Your Brand
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {productOptions.map((opt) => (
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
                    <span className="absolute top-3 left-3 bg-[#1C1C1C] text-white text-[10px] font-semibold tracking-wider uppercase px-2.5 py-1 rounded">
                      {opt.badge}
                    </span>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-[#1C1C1C] mb-2">
                      {opt.title}
                    </h3>
                    <p className="text-sm text-gray-700 leading-relaxed font-normal mb-4">
                      {opt.description}
                    </p>

                    <div className="space-y-1.5 pt-3 border-t border-gray-100">
                      {opt.specs.map((spec) => (
                        <div key={spec} className="text-xs text-gray-600 flex items-center gap-1.5">
                          <span className="text-emerald-700 font-bold">✓</span> {spec}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="p-6 pt-0">
                  <button
                    onClick={() => openModal(opt.product)}
                    type="button"
                    className="w-full min-h-[44px] bg-[#1C1C1C] text-white text-sm font-semibold rounded-lg hover:bg-black transition-colors active:scale-95 shadow-sm"
                  >
                    Inquire for {opt.title}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── Flavour Catalog & Custom R&D ── */}
        <section className="max-w-6xl mx-auto px-4 sm:px-6 pb-20">
          <div className="bg-white rounded-3xl border border-[#1C1C1C]/10 p-8 sm:p-12 shadow-sm">
            <div className="max-w-2xl mb-8">
              <span className="text-xs font-bold uppercase tracking-widest text-[#1C1C1C]/60 mb-2 block">
                FLAVOUR INNOVATION
              </span>
              <h2
                className="text-2xl sm:text-3xl font-bold text-[#1C1C1C] mb-3"
                style={{ fontFamily: 'var(--font-didot)' }}
              >
                Signature &amp; Custom Seasoning Profiles
              </h2>
              <p className="text-sm text-gray-700 leading-relaxed">
                Choose from our validated commercial best-sellers roasted in olive oil, or collaborate with our flavour technicians to develop proprietary seasonings matching your brand guidelines.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              {flavours.map((group) => (
                <div key={group.category} className="bg-[#FAF8F5] p-6 rounded-2xl border border-gray-200">
                  <h3 className="text-sm font-bold uppercase tracking-wider text-[#1C1C1C] mb-4 pb-2 border-b border-gray-300">
                    {group.category}
                  </h3>
                  <div className="space-y-3">
                    {group.items.map((item) => (
                      <div key={item.name} className="flex flex-col">
                        <span className="text-sm font-bold text-[#1C1C1C]">{item.name}</span>
                        <span className="text-xs text-gray-600 font-normal">{item.desc}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="p-5 rounded-xl bg-[#1C1C1C] text-white flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <h4 className="text-sm font-bold">Have an exclusive flavour concept in mind?</h4>
                <p className="text-xs text-gray-300">We formulate custom sodium-free, organic, cheese, barbecue, or sweet profiles.</p>
              </div>
              <button
                onClick={() => openModal('Private Label: Custom Flavor')}
                type="button"
                className="min-h-[40px] px-5 py-2 bg-white text-[#1C1C1C] text-xs font-bold rounded-lg hover:bg-gray-100 transition-colors whitespace-nowrap"
              >
                Brief Our R&amp;D Team
              </button>
            </div>
          </div>
        </section>

        {/* ── Packaging Options & Services ── */}
        <section className="bg-[#F5F3F0] py-16 border-y border-[#1C1C1C]/10 mb-16">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <span className="text-xs font-bold uppercase tracking-widest text-[#1C1C1C]/60 mb-2 block">
                PACKAGING &amp; BRANDING
              </span>
              <h2
                className="text-2xl sm:text-3xl font-bold text-[#1C1C1C]"
                style={{ fontFamily: 'var(--font-didot)' }}
              >
                Custom Packaging Across Multiple Formats
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
              {packagingOptions.map((pkg) => (
                <div key={pkg.name} className="bg-white p-6 rounded-2xl border border-[#1C1C1C]/10 shadow-sm flex flex-col justify-between">
                  <div>
                    <h3 className="text-base font-bold text-[#1C1C1C] mb-2">{pkg.name}</h3>
                    <p className="text-xs text-gray-700 leading-relaxed font-normal">{pkg.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-[#1C1C1C]/10">
              <h4 className="text-sm font-bold text-[#1C1C1C] uppercase tracking-wider mb-4">
                Full-Service Private-Label Execution:
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 text-xs sm:text-sm text-gray-700">
                <div className="flex items-center gap-2">✓ Custom brand packaging design</div>
                <div className="flex items-center gap-2">✓ Logo and artwork integration</div>
                <div className="flex items-center gap-2">✓ Product &amp; flavour selection</div>
                <div className="flex items-center gap-2">✓ Ingredient specification coordination</div>
                <div className="flex items-center gap-2">✓ Retail-ready barcodes &amp; nutrition tables</div>
                <div className="flex items-center gap-2">✓ Destination market regulatory compliance</div>
              </div>
            </div>
          </div>
        </section>

        {/* ── 8-Step Manufacturing Process ── */}
        <section className="max-w-6xl mx-auto px-4 sm:px-6 pb-20">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-widest text-[#1C1C1C]/60 mb-2 block">
              STRUCTURED ORDER WORKFLOW
            </span>
            <h2
              className="text-2xl sm:text-3xl font-bold text-[#1C1C1C]"
              style={{ fontFamily: 'var(--font-didot)' }}
            >
              How Does the Private Label Process Work?
            </h2>
            <p className="text-sm text-gray-600 mt-2">
              From your initial brief to global dispatch, every milestone is managed with precision.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {eightSteps.map((step) => (
              <div
                key={step.num}
                className="bg-white rounded-2xl p-6 border border-[#1C1C1C]/10 shadow-sm relative flex flex-col justify-start"
              >
                <div className="text-3xl font-extrabold text-[#999999] mb-3 font-mono">
                  {step.num}
                </div>
                <h3 className="text-base font-bold text-[#1C1C1C] mb-2">{step.title}</h3>
                <p className="text-xs text-gray-700 leading-relaxed font-normal">{step.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── Quality Control & Global Export ── */}
        <section className="bg-[#FAF8F5] pb-20">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="bg-white rounded-3xl border border-[#1C1C1C]/10 p-8 sm:p-12 shadow-sm">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-7">
                  <span className="text-xs font-bold uppercase tracking-widest text-[#1C1C1C]/60 mb-2 block">
                    QUALITY CONTROL &amp; COMPLIANCE
                  </span>
                  <h2
                    className="text-2xl sm:text-3xl font-bold text-[#1C1C1C] mb-4"
                    style={{ fontFamily: 'var(--font-didot)' }}
                  >
                    Engineered for International Retail Standards
                  </h2>
                  <p className="text-sm text-gray-700 leading-relaxed mb-6 font-normal">
                    Product consistency is paramount when supplying competitive retail markets in the USA, Europe, Canada, and Australia. AÉRI Makhana operates through partner facilities maintaining rigorous standards:
                  </p>
                  <ul className="space-y-2.5 text-xs sm:text-sm text-gray-800">
                    <li className="flex items-center gap-2">✓ <strong>Moisture Management:</strong> Maintained strictly below 3% for lasting crispness.</li>
                    <li className="flex items-center gap-2">✓ <strong>Grading Consistency:</strong> Size screening to guarantee uniform popped appearance.</li>
                    <li className="flex items-center gap-2">✓ <strong>Controlled Roasting:</strong> Uniform heat transfer without burning or oily residue.</li>
                    <li className="flex items-center gap-2">✓ <strong>Laboratory Documentation:</strong> COA for microbiology, pesticide residue, and heavy metals.</li>
                    <li className="flex items-center gap-2">✓ <strong>Destination Market Support:</strong> US FDA prior notice, FSVP, EU FIC, APEDA certifications.</li>
                  </ul>
                </div>

                <div className="lg:col-span-5 bg-[#F5F3F0] p-6 sm:p-8 rounded-2xl border border-gray-200">
                  <h3 className="text-sm font-bold text-[#1C1C1C] uppercase tracking-wider mb-2">
                    Why Choose AÉRI Makhana?
                  </h3>
                  <p className="text-xs text-gray-600 mb-4 leading-relaxed">
                    AÉRI Makhana is an export brand of <strong>H&amp;G Ventures Private Limited</strong>, India. We combine farm-gate sourcing in Bihar with world-class processing, custom flavour R&amp;D, and complete export handling.
                  </p>
                  <div className="pt-4 border-t border-gray-300">
                    <button
                      onClick={() => openModal('Private Label: QC Inquiry')}
                      type="button"
                      className="w-full min-h-[44px] bg-[#1C1C1C] text-white text-xs font-semibold rounded-lg hover:bg-black transition-colors shadow-sm"
                    >
                      Inquire About Export Compliance
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── FAQ Section ── */}
        <section className="max-w-4xl mx-auto px-4 sm:px-6 pb-20">
          <div className="text-center mb-10">
            <span className="text-xs font-bold uppercase tracking-widest text-[#1C1C1C]/60 mb-2 block">
              QUESTIONS &amp; ANSWERS
            </span>
            <h2
              className="text-2xl sm:text-3xl font-bold text-[#1C1C1C]"
              style={{ fontFamily: 'var(--font-didot)' }}
            >
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div
                  key={faq.q}
                  className="bg-white border border-[#1C1C1C]/10 rounded-2xl overflow-hidden shadow-sm transition-all"
                >
                  <button
                    type="button"
                    onClick={() => toggleFaq(index)}
                    className="w-full py-4 px-6 text-left font-semibold text-sm sm:text-base text-[#1C1C1C] flex justify-between items-center hover:bg-gray-50 focus:outline-none"
                  >
                    <span className="pr-4">{faq.q}</span>
                    <span className="text-xl font-light text-gray-500">
                      {isOpen ? '−' : '+'}
                    </span>
                  </button>
                  {isOpen && (
                    <div className="px-6 pb-5 pt-1 text-sm text-gray-700 leading-relaxed border-t border-gray-100 font-normal">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* ── Request a Private-Label Quotation CTA Box ── */}
        <section className="max-w-5xl mx-auto px-4 sm:px-6 pb-20">
          <div className="bg-[#1C1C1C] text-white p-8 sm:p-12 rounded-3xl shadow-xl text-center sm:text-left">
            <span className="inline-block px-3 py-1 mb-4 rounded-full bg-white/10 text-white/90 text-[10px] font-semibold tracking-widest uppercase">
              GET IN TOUCH
            </span>
            <h2
              className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4"
              style={{ fontFamily: 'var(--font-didot)' }}
            >
              Request a Private-Label Quotation
            </h2>
            <p className="text-gray-300 text-sm sm:text-base mb-8 max-w-2xl font-normal leading-relaxed">
              Contact the AÉRI Makhana team today to discuss your project specifications and receive a tailored quotation. Please specify your requirements:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-8 text-xs text-gray-300 bg-white/5 p-6 rounded-2xl border border-white/10 text-left">
              <div>• <strong>Product:</strong> Raw or roasted/flavoured</div>
              <div>• <strong>Flavour profile:</strong> Catalog or custom</div>
              <div>• <strong>Packaging format:</strong> Pouch, jar, or can</div>
              <div>• <strong>Target country:</strong> Destination port</div>
              <div>• <strong>Estimated order quantity:</strong> Units / kg</div>
              <div>• <strong>Brand timeline:</strong> Expected launch date</div>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 justify-start">
              <button
                onClick={() => openModal('Private Label: Quotation Request')}
                type="button"
                className="min-h-[48px] px-8 py-3 bg-white text-[#1C1C1C] text-sm font-bold rounded-xl hover:bg-gray-100 transition-colors shadow-md text-center"
              >
                Submit Requirement Brief
              </button>

              <a
                href="https://wa.me/919499729424?text=Hello%20A%C3%89RI%20Team%2C%20I%20am%20interested%20in%20Private%20Label%20Makhana%20manufacturing%20and%20would%20like%20to%20request%20a%20quotation."
                target="_blank"
                rel="noopener noreferrer"
                className="min-h-[48px] px-6 py-3 border border-white/20 text-white text-sm font-semibold rounded-xl hover:bg-white/10 transition-colors text-center inline-flex items-center justify-center gap-2"
              >
                WhatsApp Direct Inquiry
              </a>
            </div>

            <div className="mt-8 pt-6 border-t border-white/10 text-xs text-gray-400 flex flex-wrap gap-6 justify-between items-center">
              <div>
                <span>Email: <a href="mailto:kriya@aerisnacks.com" className="text-white underline">kriya@aerisnacks.com</a></span>
                <span className="ml-4">Web: <a href="https://www.aerisnacks.com" className="text-white underline">www.aerisnacks.com</a></span>
              </div>
              <div>AÉRI Makhana | Your Private-Label Partner in India</div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
