"use client";

import React from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";

/* ─── Full content for each company page ─── */
const pages: Record<string, { title: string; badge: string; subtitle: string; sections: { heading: string; body: string }[]; cta?: { text: string; href: string } }> = {
  "our-story": {
    title: "Our Story",
    badge: "Heritage · Vision · Purpose",
    subtitle: "From the ancient ponds of Bihar to the gourmet tables of Paris — the journey of AÉRI is one of reverence, innovation, and an unwavering pursuit of perfection.",
    sections: [
      {
        heading: "Where It All Began",
        body: "AÉRI was born from a simple observation: the world's most nutritious snack was also the world's most overlooked. Makhana — the popped seed of the Euryale Ferox plant — has been consumed across Asia for over 3,000 years. In Indian households, it is a staple during festivals and fasting. In Ayurveda, it is revered for its cooling properties, its richness in protein, and its ability to sustain energy without the heaviness of conventional snacks. Yet, outside of Asia, almost no one had heard of it. We set out to change that. Not by stripping Makhana of its heritage, but by giving it the stage it deserves — introducing it to the European market with the same care, respect, and artistry that defines French gastronomy."
      },
      {
        heading: "The AÉRI Philosophy",
        body: "We believe that healthy eating should never mean compromising on taste, texture, or elegance. The snacking industry is flooded with products that hide behind 'natural' labels while loading their recipes with refined oils, artificial flavors, and excessive sodium. AÉRI takes the opposite approach. We start with one of nature's most perfect ingredients — a seed that is naturally high in protein, low in fat, and entirely free of gluten, cholesterol, and artificial additives. We then enhance it with the finest ingredients Europe has to offer: extra virgin olive oil from century-old Andalusian groves, herbes de Provence from the Luberon valley, black truffle from the Périgord, and hand-harvested Guérande sea salt. The result is not just a snack — it is a statement. A proof that indulgence and well-being can, and should, coexist."
      },
      {
        heading: "Our Partnership with Bihar",
        body: "Every AÉRI product begins its life in the freshwater ponds of Bihar, India — a region that produces over 90% of the world's Makhana. We work directly with local farming communities across 1,000 acres of preserved wetlands, ensuring fair wages, sustainable harvesting practices, and complete traceability from seed to shelf. Our partnership with Hybite Foods, an established leader in Makhana processing, allows us to maintain the highest quality standards while supporting the livelihoods of thousands of families. This is not just commerce — it is a bridge between two civilizations, connected by a shared love of food, tradition, and craftsmanship."
      },
      {
        heading: "Looking Ahead",
        body: "AÉRI is more than a brand. It is a movement to redefine what premium snacking means in the 21st century. We are currently preparing our launch across French retail, starting with Carrefour, and expanding to specialty stores, hotels, and Michelin-starred restaurants. Our R&D team is developing new flavor profiles that honor both Asian and European culinary traditions. And we are investing in research to further validate the health benefits of Makhana through clinical studies conducted in partnership with European nutrition institutes. The future of snacking is lighter, healthier, and infinitely more exciting. Welcome to AÉRI."
      }
    ],
    cta: { text: "Discover Our Products", href: "/products" }
  },
  "transparency": {
    title: "Transparency",
    badge: "Ethics · Traceability · Accountability",
    subtitle: "At AÉRI, transparency is not a marketing strategy — it is a foundational principle. Every grain we sell is tested, documented, and traceable back to the pond it was harvested from.",
    sections: [
      {
        heading: "Seed-to-Shelf Traceability",
        body: "Every batch of AÉRI Makhana is assigned a unique lot number at the point of harvest. This number follows the product through every stage of its journey: sun-drying, popping, flavoring, packaging, quality testing, and shipping. Using our traceability system, we can identify exactly which pond, which farmer, and which processing date corresponds to any pack of AÉRI on your shelf. This level of detail is rare in the snack industry — and we believe it should be the standard, not the exception."
      },
      {
        heading: "Ethical Sourcing",
        body: "We source exclusively from the preserved wetlands of Bihar, India, where Makhana cultivation is a centuries-old tradition. Our sourcing practices are guided by three principles: fair compensation for farmers (we pay 15-20% above market rates), environmental sustainability (no chemical pesticides or fertilizers are used in our ponds), and community development (a portion of our revenue funds local education and healthcare initiatives). We do not use child labor, and every link in our supply chain is regularly audited by independent agencies."
      },
      {
        heading: "Laboratory Testing",
        body: "Before any batch of AÉRI leaves India, it undergoes rigorous testing in NABL-accredited laboratories (conforming to ISO/IEC 17025 standards). Our tests cover ethylene oxide (EtO) levels, heavy metals (lead, cadmium, arsenic, mercury), pesticide residues, and microbiological safety (Salmonella, E. coli, Aflatoxins). Every single test result must fall well below European Union regulatory limits before we authorize shipment. Complete lab reports are available for download by our professional partners through the B2B portal."
      },
      {
        heading: "Packaging & Environmental Impact",
        body: "Our packaging is designed to be as responsible as our sourcing. We use recyclable materials wherever possible and are actively working toward 100% compostable packaging by 2027. Our shipping logistics are optimized to minimize carbon footprint — we consolidate shipments and use sea freight for bulk orders, reserving air freight only for time-sensitive deliveries. We are also exploring carbon offset programs to achieve net-zero logistics by 2028."
      },
      {
        heading: "Open Door Policy",
        body: "We welcome questions, audits, and visits. If you are a retailer, distributor, or journalist who wants to see our operations firsthand — from the ponds of Bihar to our flavoring facility — we will arrange it. Transparency means having nothing to hide."
      }
    ],
    cta: { text: "View Our Certifications", href: "/company/certifications" }
  },
  "certifications": {
    title: "Certifications",
    badge: "Compliance · Safety · Trust",
    subtitle: "Every AÉRI product is backed by internationally recognized certifications and rigorous laboratory testing. Because trust is built on evidence, not promises.",
    sections: [
      {
        heading: "FSSAI Central License",
        body: "The Food Safety and Standards Authority of India (FSSAI) Central License is the highest tier of food safety certification in India. It confirms that our production facilities, processes, and products meet all regulatory requirements for food manufacturing and export. Every batch of Makhana is tested and certified before leaving our facility. Our FSSAI registration covers all aspects of food handling, storage, processing, and distribution."
      },
      {
        heading: "FoSTaC Certification",
        body: "FoSTaC (Food Safety Training and Certification) is a mandatory certification that ensures all personnel involved in food handling are trained in hygiene, safety protocols, and contamination prevention. Every member of our production team holds a valid FoSTaC certificate, and we conduct refresher training every 12 months. This guarantees that human handling at every stage of our process meets the highest safety standards."
      },
      {
        heading: "APEDA Registration",
        body: "The Agricultural and Processed Food Products Export Development Authority (APEDA) registration certifies that our products meet the quality standards required for export of Indian agricultural goods. This registration is a prerequisite for any food product leaving India and ensures compliance with international trade regulations. It also enables our products to carry the 'Product of India' designation with full legitimacy."
      },
      {
        heading: "IEC (Import Export Code)",
        body: "Our registered Import Export Code ensures complete customs traceability for every shipment from Bihar to France. Each container is documented with precise information about contents, origin, processing dates, and destination. This code is cross-referenced with our internal lot tracking system, providing an unbroken chain of documentation from pond to plate."
      },
      {
        heading: "Startup India Recognition (DPIIT)",
        body: "AÉRI is recognized by the Department for Promotion of Industry and Internal Trade (DPIIT) under the Government of India's Startup India initiative. This recognition acknowledges our innovative approach to bringing traditional Indian superfoods to global markets using modern food technology and sustainable practices."
      },
      {
        heading: "European Union Compliance",
        body: "Our products fully comply with EU Regulation (EC) No. 178/2002 (General Food Law), EU Regulation (EC) No. 1881/2006 (contaminant limits), and EU Regulation (EU) No. 1169/2011 (food information to consumers). This includes strict compliance with EtO limits, heavy metal thresholds, pesticide MRLs (Maximum Residue Levels), and comprehensive labeling requirements including allergen declarations and nutritional information."
      },
      {
        heading: "NABL Accredited Laboratory Testing",
        body: "All analytical testing is performed in laboratories accredited by the National Accreditation Board for Testing and Calibration Laboratories (NABL). These labs operate under ISO/IEC 17025 standards — the international benchmark for testing competence. Our standard panel includes: Ethylene Oxide (EtO) analysis, Heavy Metal screening (Pb, Cd, As, Hg), Pesticide Residue analysis (multi-residue screening), and Microbiological testing (Salmonella, E. coli, Aflatoxins, total plate count)."
      }
    ],
    cta: { text: "Contact for Lab Reports", href: "/contact" }
  },
  "pro-portal": {
    title: "Professional Portal",
    badge: "B2B · Partnerships · Export",
    subtitle: "AÉRI offers comprehensive B2B solutions for distributors, retailers, hotels, and restaurants across Europe. Discover flexible formats, competitive pricing, and world-class logistics.",
    sections: [
      {
        heading: "White Label & Private Label",
        body: "Leverage our expertise in Makhana sourcing, processing, and flavoring to create your own branded product line. We handle everything from recipe development and production to packaging design and compliance documentation. Our white-label service is ideal for retailers, hotel chains, and food service companies looking to offer a premium, healthy snack under their own brand. Minimum order quantities are flexible, and we can customize flavoring, packaging size, and labeling to meet your exact specifications."
      },
      {
        heading: "Volume Pricing & MOQ",
        body: "We offer tiered pricing structures for bulk orders, with significant discounts for recurring contracts. Our standard MOQ for European markets starts at 500 units per SKU, but we can accommodate smaller trial orders for new partnerships. All pricing includes quality assurance testing, EU-compliant labeling, and documentation. For large-volume orders (10,000+ units), we offer dedicated production runs with custom specifications."
      },
      {
        heading: "Global Logistics",
        body: "Our logistics team manages end-to-end shipping from our processing facility in Bihar to any destination in Europe. We support both CIF (Cost, Insurance, and Freight) and FOB (Free on Board) Incoterms. Sea freight is our standard shipping method, with transit times of 25-30 days to major European ports. Air freight is available for urgent orders with 5-7 day delivery. All shipments include comprehensive customs documentation, phytosanitary certificates, and EU customs clearance assistance."
      },
      {
        heading: "Documentation Package",
        body: "Every B2B partner receives a complete documentation package including: detailed product technical data sheets (TDS), certificates of analysis (COA) for every batch, FSSAI and EU compliance certificates, allergen declarations, nutritional analysis reports, shelf life studies, and packaging specifications. All documents are available in English and French."
      },
      {
        heading: "Partnership Opportunities",
        body: "We are actively seeking partnerships with premium retailers, organic food stores, luxury hotel chains, Michelin-starred restaurants, corporate wellness programs, and specialty food distributors across France, Belgium, Switzerland, and the wider EU. If you share our commitment to quality, transparency, and innovation, we would love to hear from you."
      }
    ],
    cta: { text: "Send a Professional Inquiry", href: "/contact" }
  },
};

export default function CompanyDynamicPage() {
  const params = useParams();
  const slug = params.slug as string;
  const page = pages[slug];

  if (!page) {
    return (
      <main className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Page Not Found</h1>
          <Link href="/" className="text-[#6E6E73] hover:text-[#111111] underline">Back to Home</Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#F5F5F7] text-[#111111] font-sans">
      {/* Navbar */}
      <header className="fixed top-0 left-0 right-0 z-[40] w-full flex justify-between items-center px-6 md:px-12 py-3 bg-white/80 backdrop-blur-md border-b border-[#111111]/5">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <Link href="/"><h2 className="text-xl tracking-widest uppercase font-semibold cursor-pointer">AÉRI</h2></Link>
        </motion.div>
        <motion.nav initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.1 }} className="hidden md:flex gap-8 text-xs tracking-widest uppercase font-medium text-[#111111]/70">
          <Link href="/brand" className="hover:text-[#111111] transition-colors">The Brand</Link>
          <Link href="/products" className="hover:text-[#111111] transition-colors">Products</Link>
          <Link href="/contact" className="hover:text-[#111111] transition-colors">Contact</Link>
        </motion.nav>
      </header>

      {/* Hero */}
      <section className="pt-40 pb-16 px-6 md:px-12 max-w-4xl mx-auto text-center">
        <motion.span initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.3em] uppercase text-[#6E6E73] mb-5">
          <span className="w-6 h-[1px] bg-[#6E6E73]/40" />
          {page.badge}
          <span className="w-6 h-[1px] bg-[#6E6E73]/40" />
        </motion.span>
        <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.1 }} className="text-5xl md:text-6xl font-bold tracking-tight mb-6">{page.title}</motion.h1>
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 0.3 }} className="text-lg text-[#6E6E73] max-w-2xl mx-auto leading-relaxed">{page.subtitle}</motion.p>
      </section>

      {/* Content Sections */}
      <section className="px-6 md:px-12 max-w-3xl mx-auto pb-32">
        <div className="bg-white rounded-3xl shadow-sm border border-[#111111]/5 overflow-hidden">
          {page.sections.map((sec, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.7 }} className={`p-8 md:p-12 ${i > 0 ? "border-t border-[#111111]/5" : ""}`}>
              <h2 className="text-2xl font-bold mb-4">{sec.heading}</h2>
              <p className="text-[#111111]/70 leading-[1.9] text-[15px]">{sec.body}</p>
            </motion.div>
          ))}
          {page.cta && (
            <div className="p-8 md:p-12 border-t border-[#111111]/5 bg-[#F5F5F7] text-center">
              <Link href={page.cta.href} className="inline-block px-8 py-4 bg-[#111111] text-white rounded-2xl font-medium tracking-wide hover:bg-[#111111]/80 transition-colors">{page.cta.text}</Link>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
