'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useContactModal } from '@/context/ContactModalContext';
import { JournalArticle } from '@/lib/journalData';

const suitableForList = [
  {
    title: 'Food Importers & Distributors',
    desc: 'Expand your snack portfolio with high-margin, shelf-stable popped water lily seeds packaged for global distribution.',
    icon: '🚢',
  },
  {
    title: 'Supermarket & Retail Chains',
    desc: 'Introduce premium store-brand health snacks with customized retail packaging, barcoding, and destination compliance.',
    icon: '🛒',
  },
  {
    title: 'Health & Wellness Brands',
    desc: 'Complement dietary, keto, gluten-free, and vegan product lines with clean-label, plant-based superfood snacks.',
    icon: '🌿',
  },
  {
    title: 'Food Entrepreneurs & Startups',
    desc: 'Launch a new snack brand quickly with lower capital expenditure, flexible initial order volumes, and expert R&D.',
    icon: '🚀',
  },
  {
    title: 'Established Snack Manufacturers',
    desc: 'Add roasted or raw Makhana to existing snack catalogs without investing in specialized roasting and grading machinery.',
    icon: '🏭',
  },
];

const flavourProfiles = [
  {
    category: 'Classic & Savoury',
    items: [
      { name: 'Himalayan Salt & Pepper', note: 'Clean, light seasoning accentuating natural nuttiness.' },
      { name: 'Peri Peri', note: 'Zesty, spicy bird’s eye chili blend with vibrant tang.' },
      { name: 'Artisanal Cheese', note: 'Rich, savoury cheddar notes for mainstream indulgence.' },
      { name: 'Lemon & Garden Mint', note: 'Refreshing herbaceous notes with a citrus twist.' },
    ],
  },
  {
    category: 'Gourmet & Confectionery',
    items: [
      { name: 'Black Truffle', note: 'Luxurious earthy aroma paired with sea salt crystals.' },
      { name: 'Dark Chocolate', note: 'Velvety cocoa glaze offering a guilt-free sweet crunch.' },
      { name: 'Caramel & Sea Salt', note: 'Golden buttery sweetness balanced by mineral salt.' },
      { name: 'Strawberry Infusion', note: 'Fruity sweetness appealing to premium dessert snackers.' },
    ],
  },
];

const packagingFormats = [
  {
    title: 'Stand-Up Pouches (Doypack)',
    desc: 'Ziplock resealable with nitrogen flush for maximum crunch preservation and eye-catching shelf presence.',
    idealFor: 'Retail snack aisles, health stores, premium delis',
  },
  {
    title: 'Clear PET Jars',
    desc: 'Rigid transparent containers with golden or black screw-caps showcasing popped kernel size and quality.',
    idealFor: 'Gourmet gift sets, luxury retail, pantry display',
  },
  {
    title: 'Pillow Pouches',
    desc: 'Cost-effective high-speed flexible packaging with gas flushing for volume impulse retail.',
    idealFor: 'Single-serve packs, airlines, convenience stores',
  },
  {
    title: 'Composite Cans (Canisters)',
    desc: 'Rigid spiral-wound paperboard canisters with peel-off foil membrane and overcap for superior protection.',
    idealFor: 'High-end export markets, duty-free shops',
  },
];

const workflowSteps = [
  {
    step: '01',
    title: 'Buyer Enquiry',
    desc: 'Share your brand vision, target country, preferred product type, packaging format, and quantity expectations.',
  },
  {
    step: '02',
    title: 'Product Selection',
    desc: 'Select raw grade (4+, 5+, 6+ suta) or roasted flavour profiles from our standard catalog or submit a custom recipe brief.',
  },
  {
    step: '03',
    title: 'Quotation & MOQ',
    desc: 'Receive transparent commercial pricing, tier discounts, MOQ breakdown, and estimated production lead times.',
  },
  {
    step: '04',
    title: 'Sample Approval',
    desc: 'Taste and approve customized product samples and seasoning balance dispatched directly to your international address.',
  },
  {
    step: '05',
    title: 'Packaging Finalisation',
    desc: 'Integrate your brand logo, regulatory dietary labels, nutrition tables, and destination-market barcode specifications.',
  },
  {
    step: '06',
    title: 'Batch Production',
    desc: 'Automated roasting in olive oil, controlled pneumatic spice enrobing, and nitrogen-flushed packaging under strict HACCP conditions.',
  },
  {
    step: '07',
    title: 'Quality Checks',
    desc: 'Rigorous laboratory analysis for moisture control (<3%), kernel size grading, microbiological clearance, and COA issuance.',
  },
  {
    step: '08',
    title: 'Global Dispatch',
    desc: 'Container loading, palletization, and export documentation (Phytosanitary, Certificate of Origin, Bill of Lading, US FDA notice).',
  },
];

const faqs = [
  {
    q: '1. Can I manufacture Makhana under my own brand name in India?',
    a: 'Yes. AÉRI Makhana provides complete private-label contract manufacturing for international food brands, supermarkets, and distributors. We handle raw ingredient sourcing, roasting, custom seasoning formulation, branded packaging, and export compliance under your brand identity.',
  },
  {
    q: '2. What is the MOQ for private-label Makhana?',
    a: 'Minimum Order Quantities depend on the product category (raw vs. roasted), flavour formulation complexity, and packaging format (printed rolls vs. custom labeled plain pouches or PET jars). Contact our team with your estimated requirements to receive an exact MOQ and tailored quotation.',
  },
  {
    q: '3. Can I customise Makhana flavours?',
    a: 'Yes. In addition to our popular catalog (Himalayan Salt & Pepper, Peri Peri, Cheese, Mint, Truffle, Dark Chocolate, Caramel & Salt, Strawberry), our food technicians formulate bespoke recipes according to your target market, sodium requirements, oil type (such as 100% extra virgin olive oil), and regional palate preferences.',
  },
  {
    q: '4. What packaging options are available for private-label Makhana?',
    a: 'Available formats include stand-up ziplock pouches (doypack), clear PET jars with induction-sealed lids, pillow pouches, and composite canisters. All flexible packaging formats support nitrogen gas flushing to ensure prolonged crunchiness and shelf-life.',
  },
  {
    q: '5. Can AÉRI supply private-label Makhana internationally?',
    a: 'Yes. AÉRI caters to international private-label and bulk sourcing enquiries worldwide. We provide complete export logistics coordination and required documentation — including Certificates of Analysis (COA), Phytosanitary Certificates, Certificates of Origin, and destination-market compliance paperwork for the USA, Europe, Canada, Australia, and the Middle East.',
  },
];

export default function PrivateLabelGuideArticle({
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
          {/* Breadcrumb / Back Link */}
          <Link
            href="/journal"
            className="inline-flex items-center text-xs font-semibold uppercase tracking-wider text-gray-500 hover:text-black mb-8 transition-colors"
          >
            ← Back to Journal
          </Link>

          {/* Badge & Meta Info */}
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <span className="inline-block px-3 py-1 rounded-full bg-[#1C1C1C] text-white text-[10px] font-semibold tracking-widest uppercase shadow-sm">
              B2B Contract Manufacturing Guide
            </span>
            <span className="text-xs font-medium text-gray-500 tracking-wider uppercase">
              {article.date} · -by {article.author}
            </span>
          </div>

          {/* Single H1 Title */}
          <h1
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-[#1C1C1C] leading-[1.25] mb-6 tracking-tight"
            style={{ fontFamily: 'var(--font-didot)' }}
          >
            {article.title}
          </h1>

          <p className="text-base sm:text-lg text-gray-600 mb-8 leading-relaxed font-normal">
            {article.subtitle}
          </p>

          {/* Visual Dual Mockups Showcase */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            <div className="relative rounded-2xl overflow-hidden border border-gray-200 bg-white shadow-sm group">
              <div className="relative w-full aspect-[4/5] bg-[#F5F3F0]">
                <Image
                  src="/private-label-mockup-pouch.webp"
                  alt="Custom Stand-up Pouch with Your Brand Name and roasted makhana"
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, 450px"
                  className="object-cover group-hover:scale-102 transition-transform duration-500"
                />
              </div>
              <div className="p-4 bg-white border-t border-gray-100 flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#1C1C1C]">
                    Stand-Up Pouches (Doypack)
                  </h4>
                  <p className="text-[11px] text-gray-500">Nitrogen-flushed with custom label/printing</p>
                </div>
                <span className="text-[10px] uppercase font-semibold px-2.5 py-1 bg-[#F5F3F0] rounded text-[#1C1C1C]">
                  Your Brand
                </span>
              </div>
            </div>

            <div className="relative rounded-2xl overflow-hidden border border-gray-200 bg-white shadow-sm group">
              <div className="relative w-full aspect-[4/5] bg-[#F5F3F0]">
                <Image
                  src="/private-label-mockup-jars.webp"
                  alt="Clear PET Jars Stack with Your Brand Name labels"
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, 450px"
                  className="object-cover group-hover:scale-102 transition-transform duration-500"
                />
              </div>
              <div className="p-4 bg-white border-t border-gray-100 flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#1C1C1C]">
                    Clear PET Jars &amp; Composite Cans
                  </h4>
                  <p className="text-[11px] text-gray-500">Golden screw-top lids &amp; foil induction seal</p>
                </div>
                <span className="text-[10px] uppercase font-semibold px-2.5 py-1 bg-[#F5F3F0] rounded text-[#1C1C1C]">
                  Retail-Ready
                </span>
              </div>
            </div>
          </div>

          {/* Intro Section */}
          <div className="prose max-w-none text-gray-800 leading-relaxed space-y-5 mb-14 text-base sm:text-lg font-normal">
            <p>
              The global demand for healthier snack alternatives is creating unprecedented opportunities for food brands,
              distributors, and retailers to introduce <strong>Makhana (Fox Nuts / Popped Water Lily Seeds)</strong> into their product portfolios.
            </p>
            <p>
              Private-label Makhana manufacturing allows businesses to sell premium roasted, flavoured, or raw Makhana under their own brand name
              without setting up expensive agricultural processing or roasting facilities in India.
            </p>
            <p className="font-medium text-[#1C1C1C] bg-[#F5F3F0] p-4 rounded-xl border border-gray-200">
              <strong>AÉRI Makhana</strong> provides end-to-end private-label Makhana manufacturing in India, offering seed grading, flavour development,
              retail packaging, and bulk container export for your food brand.
            </p>
          </div>

          {/* ──────────────── Section 1: What Is Private Label? ──────────────── */}
          <section className="mb-14 scroll-mt-24">
            <h2
              className="text-2xl sm:text-3xl font-bold text-[#1C1C1C] mb-4 pb-2 border-b border-gray-200"
              style={{ fontFamily: 'var(--font-didot)' }}
            >
              1. What Is Private Label Makhana Manufacturing?
            </h2>
            <p className="text-gray-700 leading-relaxed mb-6">
              Private-label manufacturing allows businesses to sell products under their own brand name while outsourcing
              product manufacturing, recipe formulation, and packaging to a dedicated manufacturing partner in India.
            </p>
            <p className="text-gray-700 leading-relaxed mb-6">
              With private-label Makhana, you own the brand identity, trademark, and customer relationships, while <strong>AÉRI</strong> handles
              the agreed product development, raw sourcing, slow roasting, seasoning, and retail packaging requirements.
            </p>

            <h3 className="text-sm font-bold uppercase tracking-wider text-gray-600 mb-4">
              This Model Is Suitable For:
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {suitableForList.map((item) => (
                <div
                  key={item.title}
                  className="p-5 bg-white rounded-xl border border-gray-200 shadow-sm flex flex-col justify-start"
                >
                  <div className="text-2xl mb-2">{item.icon}</div>
                  <h4 className="text-base font-bold text-[#1C1C1C] mb-1">{item.title}</h4>
                  <p className="text-sm text-gray-600 leading-relaxed font-normal">{item.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* ──────────────── Section 2: Products Offered ──────────────── */}
          <section className="mb-14 scroll-mt-24">
            <h2
              className="text-2xl sm:text-3xl font-bold text-[#1C1C1C] mb-4 pb-2 border-b border-gray-200"
              style={{ fontFamily: 'var(--font-didot)' }}
            >
              2. Private Label Makhana Products
            </h2>
            <p className="text-gray-700 leading-relaxed mb-6">
              AÉRI offers two primary product categories for private-label and white-label contract requirements:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {/* Category A */}
              <div className="p-6 bg-white rounded-xl border border-gray-200 shadow-sm">
                <span className="inline-block px-2.5 py-0.5 rounded bg-gray-100 text-xs font-semibold text-gray-800 uppercase tracking-wider mb-3">
                  Category A
                </span>
                <h3 className="text-xl font-bold text-[#1C1C1C] mb-2">Raw Phool Makhana</h3>
                <p className="text-sm text-gray-700 leading-relaxed mb-4">
                  Popped, unseasoned white Makhana available in commercial grades (4+, 5+, and 6+ suta), including handpicked options for improved size consistency, low moisture, and zero residue.
                </p>
                <ul className="text-xs text-gray-600 space-y-1.5 list-disc list-inside">
                  <li>Available in bulk multi-wall bags (8kg - 10kg)</li>
                  <li>Retail-ready packs for home cooking &amp; roasting</li>
                  <li>Hand-sorted to remove blackened seed coats</li>
                </ul>
              </div>

              {/* Category B */}
              <div className="p-6 bg-white rounded-xl border border-gray-200 shadow-sm">
                <span className="inline-block px-2.5 py-0.5 rounded bg-[#1C1C1C] text-xs font-semibold text-white uppercase tracking-wider mb-3">
                  Category B
                </span>
                <h3 className="text-xl font-bold text-[#1C1C1C] mb-2">Olive Oil-Roasted &amp; Flavoured Makhana</h3>
                <p className="text-sm text-gray-700 leading-relaxed mb-4">
                  Ready-to-eat Makhana roasted using olive oil and selected premium oils, with customised seasoning formulations and uniform enrobing.
                </p>
                <ul className="text-xs text-gray-600 space-y-1.5 list-disc list-inside">
                  <li>Slow-roasted for persistent, shatteringly crisp bite</li>
                  <li>Zero trans fat, gluten-free seasonings</li>
                  <li>Nitrogen-flushed pack preservation</li>
                </ul>
              </div>
            </div>

            {/* Flavours Breakdown */}
            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-gray-200 shadow-sm mb-6">
              <h3 className="text-lg font-bold text-[#1C1C1C] mb-4">
                Popular Flavour Profiles Available
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {flavourProfiles.map((cat) => (
                  <div key={cat.category}>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-3 border-b border-gray-100 pb-1">
                      {cat.category}
                    </h4>
                    <div className="space-y-3">
                      {cat.items.map((item) => (
                        <div key={item.name} className="flex flex-col">
                          <span className="text-sm font-bold text-[#1C1C1C]">{item.name}</span>
                          <span className="text-xs text-gray-600">{item.note}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Bespoke R&D Note */}
              <div className="mt-6 pt-6 border-t border-gray-100 bg-[#FAF8F5] -mx-6 -mb-6 p-6 rounded-b-2xl">
                <p className="text-sm text-[#1C1C1C] font-medium">
                  💡 <strong>Looking for a flavour exclusive to your brand?</strong> We offer complete flavour R&amp;D according to your brand’s nutritional parameters, target market palate, and regional spice regulations.
                </p>
              </div>
            </div>
          </section>

          {/* ──────────────── Section 3: Custom Packaging ──────────────── */}
          <section className="mb-14 scroll-mt-24">
            <h2
              className="text-2xl sm:text-3xl font-bold text-[#1C1C1C] mb-4 pb-2 border-b border-gray-200"
              style={{ fontFamily: 'var(--font-didot)' }}
            >
              3. Custom Packaging and Branding
            </h2>
            <p className="text-gray-700 leading-relaxed mb-6">
              Packaging plays an essential role in product positioning, shelf appeal, and brand recognition in international retail stores.
              AÉRI supports customised private-label packaging across multiple formats:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              {packagingFormats.map((fmt) => (
                <div key={fmt.title} className="p-5 bg-white rounded-xl border border-gray-200 shadow-sm">
                  <h4 className="text-base font-bold text-[#1C1C1C] mb-1.5">{fmt.title}</h4>
                  <p className="text-xs text-gray-700 leading-relaxed mb-3">{fmt.desc}</p>
                  <p className="text-[11px] font-medium text-gray-500 uppercase tracking-wider">
                    Best for: <span className="text-[#1C1C1C]">{fmt.idealFor}</span>
                  </p>
                </div>
              ))}
            </div>

            <div className="bg-[#F5F3F0] p-6 rounded-xl border border-gray-200">
              <h3 className="text-sm font-bold uppercase tracking-wider text-[#1C1C1C] mb-3">
                Our Private-Label Packaging Services Include:
              </h3>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-gray-800">
                <li className="flex items-center gap-2">✓ Customised brand packaging &amp; dieline templates</li>
                <li className="flex items-center gap-2">✓ Logo and artwork integration</li>
                <li className="flex items-center gap-2">✓ Product and flavour selection</li>
                <li className="flex items-center gap-2">✓ Ingredient &amp; product specification coordination</li>
                <li className="flex items-center gap-2">✓ Packaging format selection</li>
                <li className="flex items-center gap-2">✓ Retail-ready product development &amp; barcoding</li>
              </ul>
              <p className="text-xs text-gray-600 mt-4 border-t border-gray-300 pt-3">
                Packaging specifications and labelling are finalized strictly according to the buyer’s requirements and destination-market food regulations (FDA, EU FIC 1169/2011, FSANZ).
              </p>
            </div>
          </section>

          {/* ──────────────── Section 4: MOQ ──────────────── */}
          <section className="mb-14 scroll-mt-24">
            <h2
              className="text-2xl sm:text-3xl font-bold text-[#1C1C1C] mb-4 pb-2 border-b border-gray-200"
              style={{ fontFamily: 'var(--font-didot)' }}
            >
              4. Minimum Order Quantity (MOQ) for Private Label Makhana
            </h2>
            <div className="prose max-w-none text-gray-700 leading-relaxed space-y-4 mb-6">
              <p>
                Minimum order quantities depend on the product category, flavour formulation, packaging format, and customisation requirements.
              </p>
              <p>
                For example, customised rotogravure printed film rolls require higher print runs, whereas standard pre-formed stand-up pouches or PET jars with custom branded adhesive labels offer much lower, startup-friendly MOQ thresholds.
              </p>
              <p className="font-semibold text-[#1C1C1C]">
                At AÉRI, we assess each enquiry individually based on the buyer’s product specifications and projected order frequency.
              </p>
            </div>

            <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <h4 className="text-sm font-bold text-[#1C1C1C]">Need specific MOQ for your brand?</h4>
                <p className="text-xs text-gray-600">Contact our sales team with your format and flavor requirements.</p>
              </div>
              <button
                onClick={() => openModal('Private Label: MOQ Inquiry')}
                type="button"
                className="min-h-[44px] px-6 py-2.5 bg-[#1C1C1C] text-white text-xs font-semibold rounded-lg hover:bg-black transition-colors whitespace-nowrap"
              >
                Inquire About MOQ
              </button>
            </div>
          </section>

          {/* ──────────────── Section 5: Quality Control & Export ──────────────── */}
          <section className="mb-14 scroll-mt-24">
            <h2
              className="text-2xl sm:text-3xl font-bold text-[#1C1C1C] mb-4 pb-2 border-b border-gray-200"
              style={{ fontFamily: 'var(--font-didot)' }}
            >
              5. Quality Control and Export Requirements
            </h2>
            <p className="text-gray-700 leading-relaxed mb-6">
              Product consistency is essential for private-label brands, particularly when supplying international supermarket shelves and maintaining consumer trust.
            </p>

            <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-4 mb-6">
              <h3 className="text-base font-bold text-[#1C1C1C]">Our Manufacturing Coordination Focuses On:</h3>
              <ul className="space-y-3 text-sm text-gray-700">
                <li className="flex items-start gap-3">
                  <span className="font-bold text-[#1C1C1C]">1. Consistent product grading:</span>
                  Rigorous sorting across commercial suta sizes with automated optical or manual handpicked screening.
                </li>
                <li className="flex items-start gap-3">
                  <span className="font-bold text-[#1C1C1C]">2. Controlled roasting &amp; seasoning:</span>
                  Precision temperature profiles ensuring complete crunch without scorched edges or flavor degradation.
                </li>
                <li className="flex items-start gap-3">
                  <span className="font-bold text-[#1C1C1C]">3. Moisture management:</span>
                  Maintained below 3% moisture content to prevent sogginess and guarantee prolonged crunchiness.
                </li>
                <li className="flex items-start gap-3">
                  <span className="font-bold text-[#1C1C1C]">4. Packaging integrity:</span>
                  Hermetic sealing with nitrogen flush to protect against oxygen degradation and provide 12+ months shelf life.
                </li>
                <li className="flex items-start gap-3">
                  <span className="font-bold text-[#1C1C1C]">5. Product testing &amp; quality documentation:</span>
                  NABL-accredited laboratory test reports for microbiology, heavy metals, pesticide residues, and aflatoxins.
                </li>
              </ul>
            </div>
            <p className="text-xs text-gray-600 italic">
              For export orders, all product documentation, packaging, and nutrition labelling are meticulously aligned with the applicable legal requirements of the destination country.
            </p>
          </section>

          {/* ──────────────── Section 6: 8-Step Manufacturing Process ──────────────── */}
          <section className="mb-14 scroll-mt-24">
            <h2
              className="text-2xl sm:text-3xl font-bold text-[#1C1C1C] mb-4 pb-2 border-b border-gray-200"
              style={{ fontFamily: 'var(--font-didot)' }}
            >
              6. How Does the Private Label Manufacturing Process Work?
            </h2>
            <p className="text-gray-700 leading-relaxed mb-6">
              AÉRI follows a structured 8-stage process for all private-label Makhana orders to ensure on-time delivery and strict adherence to agreed specifications:
            </p>

            {/* Process Flow Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              {workflowSteps.map((s) => (
                <div
                  key={s.step}
                  className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm relative flex flex-col justify-between"
                >
                  <div>
                    <span className="text-xs font-mono font-bold text-gray-400 mb-2 block">{s.step}</span>
                    <h4 className="text-sm font-bold text-[#1C1C1C] mb-2">{s.title}</h4>
                    <p className="text-xs text-gray-600 leading-relaxed font-normal">{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <p className="text-xs text-center text-gray-500 font-medium">
              Each stage is coordinated directly with the buyer to guarantee the finished product meets every commercial and sensory requirement.
            </p>
          </section>

          {/* ──────────────── Section 7: Why Choose AÉRI ──────────────── */}
          <section className="mb-14 scroll-mt-24">
            <h2
              className="text-2xl sm:text-3xl font-bold text-[#1C1C1C] mb-4 pb-2 border-b border-gray-200"
              style={{ fontFamily: 'var(--font-didot)' }}
            >
              7. Why Choose AÉRI Makhana for Private Label Manufacturing?
            </h2>
            <p className="text-gray-700 leading-relaxed mb-6">
              AÉRI Makhana works with international food brands, importers, distributors, and supermarket retailers looking for a reliable, transparent private-label Makhana partner in India.
            </p>

            <div className="bg-[#F5F3F0] p-6 sm:p-8 rounded-2xl border border-gray-200 mb-6">
              <h3 className="text-base font-bold text-[#1C1C1C] mb-4 uppercase tracking-wider text-xs">
                Our Core Manufacturing Capabilities:
              </h3>
              <ul className="space-y-3 text-sm text-gray-800">
                <li className="flex items-center gap-3">
                  <span className="w-2 h-2 rounded-full bg-[#1C1C1C]" />
                  <span><strong>Raw Phool Makhana sourcing</strong> directly from certified harvesting belts in Bihar across multiple commercial grades.</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-2 h-2 rounded-full bg-[#1C1C1C]" />
                  <span><strong>Olive oil-roasted and flavoured Makhana</strong> prepared in certified, hygienic processing facilities.</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-2 h-2 rounded-full bg-[#1C1C1C]" />
                  <span><strong>Custom flavour development</strong> with food technologists for unique regional preferences.</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-2 h-2 rounded-full bg-[#1C1C1C]" />
                  <span><strong>Private-label packaging &amp; branding</strong> in pouches, composite cans, and PET jars.</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-2 h-2 rounded-full bg-[#1C1C1C]" />
                  <span><strong>Bulk procurement and export supply coordination</strong> with door-to-port logistics.</span>
                </li>
              </ul>

              <div className="mt-6 pt-4 border-t border-gray-300 flex items-center justify-between flex-wrap gap-2">
                <span className="text-xs text-gray-600">
                  AÉRI Makhana is a brand of <strong>H&amp;G Ventures Private Limited</strong>, India.
                </span>
                <span className="text-[11px] font-semibold text-gray-800 uppercase tracking-wider bg-white px-3 py-1 rounded-full border border-gray-200">
                  Export Registered Partner
                </span>
              </div>
            </div>
          </section>

          {/* ──────────────── Section 8: Frequently Asked Questions ──────────────── */}
          <section className="mb-14 scroll-mt-24">
            <h2
              className="text-2xl sm:text-3xl font-bold text-[#1C1C1C] mb-4 pb-2 border-b border-gray-200"
              style={{ fontFamily: 'var(--font-didot)' }}
            >
              Frequently Asked Questions (FAQ)
            </h2>
            <p className="text-gray-600 text-sm mb-6">
              Common questions from food brands and retail buyers regarding private-label Makhana manufacturing in India:
            </p>

            <div className="space-y-4">
              {faqs.map((faq, index) => {
                const isOpen = openFaq === index;
                return (
                  <div
                    key={faq.q}
                    className="border border-gray-200 rounded-xl bg-white overflow-hidden shadow-sm transition-all"
                  >
                    <button
                      type="button"
                      onClick={() => toggleFaq(index)}
                      className="w-full py-4 px-5 text-left font-semibold text-sm sm:text-base text-[#1C1C1C] flex justify-between items-center hover:bg-gray-50 focus:outline-none"
                    >
                      <span className="pr-4">{faq.q}</span>
                      <span className="text-lg font-light text-gray-500">
                        {isOpen ? '−' : '+'}
                      </span>
                    </button>
                    {isOpen && (
                      <div className="px-5 pb-5 pt-1 text-sm text-gray-700 leading-relaxed border-t border-gray-100 font-normal">
                        {faq.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </section>

          {/* ──────────────── Section 9: Launch Your Own Brand CTA ──────────────── */}
          <section className="bg-[#1C1C1C] text-white p-8 sm:p-12 rounded-3xl shadow-lg">
            <span className="inline-block px-3 py-1 mb-4 rounded-full bg-white/10 text-white/90 text-[10px] font-semibold tracking-widest uppercase">
              Start Your Private Label Journey
            </span>
            <h2
              className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4"
              style={{ fontFamily: 'var(--font-didot)' }}
            >
              Launch Your Own Makhana Brand with AÉRI
            </h2>
            <p className="text-gray-300 text-sm sm:text-base mb-8 max-w-2xl font-normal leading-relaxed">
              Whether you are launching your first Makhana snack line or adding a clean-label product category to your existing retail portfolio,
              we are ready to formulate, roast, pack, and export under your brand name.
            </p>

            <div className="bg-white/5 border border-white/10 p-6 rounded-2xl mb-8">
              <h3 className="text-sm font-bold text-white mb-3 uppercase tracking-wider">
                Request a Private-Label Quotation — Information Needed:
              </h3>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs sm:text-sm text-gray-300">
                <li>• <strong>Product:</strong> Raw Phool Makhana or roasted &amp; flavoured</li>
                <li>• <strong>Flavour requirements:</strong> Catalog or custom formulation</li>
                <li>• <strong>Preferred packaging:</strong> Pouch, jar, can, or bulk</li>
                <li>• <strong>Target market:</strong> Country and destination port</li>
                <li>• <strong>Estimated order quantity:</strong> Units or metric tons</li>
              </ul>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <button
                onClick={() => openModal('Private Label: Guide Inquiry')}
                type="button"
                className="min-h-[48px] px-8 py-3 bg-white text-[#1C1C1C] text-sm font-bold rounded-xl hover:bg-gray-100 transition-colors shadow-md text-center"
              >
                Request a Private-Label Quotation
              </button>

              <a
                href="https://wa.me/919499729424?text=Hello%20A%C3%89RI%20Team%2C%20I%20am%20interested%20in%20Private%20Label%20Makhana%20manufacturing%20and%20would%20like%20to%20discuss%20quotations%20and%20MOQ."
                target="_blank"
                rel="noopener noreferrer"
                className="min-h-[48px] px-6 py-3 border border-white/20 text-white text-sm font-semibold rounded-xl hover:bg-white/10 transition-colors text-center inline-flex items-center justify-center gap-2"
              >
                Chat on WhatsApp
              </a>
            </div>

            <div className="mt-8 pt-6 border-t border-white/10 text-xs text-gray-400 flex flex-wrap gap-6">
              <span>Website: <a href="https://www.aerisnacks.com" className="text-white underline">www.aerisnacks.com</a></span>
              <span>Email: <a href="mailto:kriya@aerisnacks.com" className="text-white underline">kriya@aerisnacks.com</a></span>
              <span>AÉRI Makhana | Your Private-Label Makhana Manufacturing Partner in India</span>
            </div>
          </section>

          {/* Direct link to main /private-label page */}
          <div className="mt-12 text-center">
            <p className="text-xs text-gray-500 mb-2">Explore our manufacturing services and capabilities</p>
            <Link
              href="/private-label"
              className="text-sm font-semibold text-[#1C1C1C] hover:underline"
            >
              Visit the Main Private Label Services Page →
            </Link>
          </div>
        </article>
      </main>

      <Footer />
    </div>
  );
}
