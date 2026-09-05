"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

import { useLanguage } from "@/context/LanguageContext";
import transparenceEn from "@/locales/en/transparence.json";
import transparenceFr from "@/locales/fr/transparence.json";
import certificationsEn from "@/locales/en/certifications.json";
import certificationsFr from "@/locales/fr/certifications.json";

/* ─── Full content for each company page ─── */
const pages: Record<string, { title: string; badge: string; subtitle: string; sections: { heading: string; body: React.ReactNode }[]; cta?: { text: string; href: string } }> = {
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
        heading: "Our Founder",
        body: (
          <div className="space-y-6">
            <p>While completing her Master's degree in France, our founder experienced the Parisian apéro ritual firsthand as an urban student. She quickly identified a glaring absence of clean-label, healthy snacks during these convivial moments. Driven by this realization, she set out to solve the problem by designing a robust, end-to-end supply chain.</p>
            <p>Backed by her family's 25+ year background in industrial packaging and raw materials manufacturing across India, AÉRI brings deep operational authority to the table. This heritage provides unparalleled shelf-life engineering expertise and the scalability required to consistently supply high-volume B2B retail chains.</p>
            <div className="w-full h-64 md:h-80 bg-[#1C1C1C]/5 rounded-2xl border border-[#1C1C1C]/10 flex flex-col items-center justify-center overflow-hidden relative">
              <span className="text-[#6E6E73] font-medium tracking-widest uppercase text-sm z-10">[Photo fondatrice]</span>
            </div>
          </div>
        )
      },
      {
        heading: "Looking Ahead",
        body: "AÉRI is more than a brand. It is a movement to redefine what premium snacking means in the 21st century. We are preparing our launch across French retail, beginning with fine grocery stores and organic networks, before expanding to specialty stores, hotels, and Michelin-starred restaurants. Our R&D team is developing new flavor profiles that honor both Asian and European culinary traditions. And we are investing in research to further validate the health benefits of Makhana through clinical studies conducted in partnership with European nutrition institutes. The future of snacking is lighter, healthier, and infinitely more exciting. Welcome to AÉRI."
      }
    ],
    cta: { text: "Discover Our Products", href: "/products" }
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
  "notre-histoire": {
    title: "Notre Histoire",
    badge: "Héritage · Vision · Raison d'Être",
    subtitle: "Des anciens étangs du Bihar aux tables gastronomiques de Paris — l'aventure AÉRI est une ode au respect, à l'innovation et à la quête incessante de la perfection.",
    sections: [
      { heading: "Aux Origines", body: "AÉRI est né d'un constat simple : le snack le plus nutritif au monde était aussi le plus méconnu. Le Makhana — la graine soufflée de l'Euryale Ferox — est consommé à travers l'Asie depuis plus de 3 000 ans. Dans les foyers indiens, il est un incontournable des fêtes et des jeûnes. En Ayurveda, il est vénéré pour ses propriétés apaisantes, sa richesse en protéines et sa capacité à soutenir l'énergie sans la lourdeur des snacks conventionnels. Pourtant, en dehors de l'Asie, presque personne n'en avait entendu parler. Nous avons décidé de changer cela. Non en dépouillant le Makhana de son héritage, mais en lui offrant la scène qu'il mérite — en l'introduisant sur le marché européen avec le même soin, le même respect et le même art de vivre qui définissent la gastronomie française." },
      { heading: "La Philosophie AÉRI", body: "Nous croyons que manger sainement ne doit jamais signifier faire des compromis sur le goût, la texture ou l'élégance. L'industrie du snacking regorge de produits qui se cachent derrière des étiquettes 'naturelles' tout en chargeant leurs recettes d'huiles raffinées, d'arômes artificiels et de sodium excessif. AÉRI adopte l'approche inverse. Nous partons de l'un des ingrédients les plus parfaits de la nature — une graine naturellement riche en protéines, pauvre en graisses, et totalement exempte de gluten, de cholestérol et d'additifs artificiels. Nous la sublimions ensuite avec les meilleurs ingrédients qu'offre l'Europe : huile d'olive extra vierge de vieux oliviers andalous, herbes de Provence de la vallée du Luberon, truffe noire du Périgord et sel de Guérande récolté à la main. Le résultat n'est pas juste un snack — c'est un manifeste. La preuve que l'indulgence et le bien-être peuvent, et doivent, coexister." },
      { heading: "Notre Partenariat avec le Bihar", body: "Chaque produit AÉRI commence sa vie dans les étangs d'eau douce du Bihar, en Inde — une région qui produit plus de 90% du Makhana mondial. Nous travaillons directement avec les communautés agricoles locales sur 1 000 acres de zones humides préservées, garantissant des salaires équitables, des pratiques de récolte durables et une traçabilité complète de la graine à l'étagère. Notre partenariat avec Hybite Foods, acteur établi dans la transformation du Makhana, nous permet de maintenir les plus hauts standards de qualité tout en soutenant les moyens de subsistance de milliers de familles. Ce n'est pas seulement du commerce — c'est un pont entre deux civilisations, unies par un amour commun de la nourriture, de la tradition et de l'artisanat." },
      { heading: "Notre Fondatrice", body: (
          <div className="space-y-6">
            <p>Après avoir obtenu son Master en France, notre fondatrice a vécu de l'intérieur le rituel de l'apéro parisien en tant qu'étudiante urbaine. Face à l'absence criante de snacks sains et « clean-label » lors de ces moments de convivialité, l'évidence s'est imposée : il manquait une alternative alliant gourmandise et nutrition. C'est ainsi qu'elle a conçu et structuré de bout en bout notre chaîne d'approvisionnement pour y remédier.</p>
            <p>Fort d'une expertise familiale de 25+ ans dans l'emballage industriel et la fabrication de matières premières à travers l'Inde, AÉRI bénéficie d'une véritable autorité opérationnelle. Ce bagage technique nous confère une maîtrise absolue de l'ingénierie de conservation (shelf-life) et la capacité d'adaptation nécessaire pour fournir les grands réseaux de distribution B2B à fort volume.</p>
            <div className="w-full h-64 md:h-80 bg-[#1C1C1C]/5 rounded-2xl border border-[#1C1C1C]/10 flex flex-col items-center justify-center overflow-hidden relative">
              <span className="text-[#6E6E73] font-medium tracking-widest uppercase text-sm z-10">[Photo fondatrice]</span>
            </div>
          </div>
        )},
        { heading: "Perspectives d'Avenir", body: "AÉRI est bien plus qu'une marque. C'est un mouvement pour redéfinir ce que signifie le snacking premium au XXIe siècle. Nous préparons notre lancement dans la grande distribution française, en commençant par les épiceries fines et les réseaux bio. Notre équipe R&D développe de nouveaux profils de saveurs qui honorent les traditions culinaires asiatiques et européennes. Et nous investissons dans la recherche pour valider davantage les bienfaits du Makhana pour la santé, en partenariat avec des instituts de nutrition européens. L'avenir du snacking est plus léger, plus sain et infiniment plus passionnant. Bienvenue chez AÉRI." }
    ],
    cta: { text: "Découvrir Nos Produits", href: "/products" }
  },


  "espace-pro": {
    title: "Espace Professionnel",
    badge: "B2B · Partenariats · Export",
    subtitle: "AÉRI propose des solutions B2B complètes pour les distributeurs, détaillants, hôtels et restaurants à travers l'Europe. Découvrez des formats flexibles, une tarification compétitive et une logistique de classe mondiale.",
    sections: [
      { heading: "Marque Blanche & Marque Privée", body: "Tirez parti de notre expertise en matière d'approvisionnement, de transformation et d'assaisonnement du Makhana pour créer votre propre gamme de produits à votre marque. Nous gérons tout, du développement de la recette et de la production à la conception de l'emballage et à la documentation de conformité. Notre service de marque blanche est idéal pour les détaillants, les chaînes hôtelières et les entreprises de restauration collective souhaitant proposer un snack premium et sain sous leur propre marque. Les quantités minimales de commande sont flexibles, et nous pouvons personnaliser l'assaisonnement, la taille de l'emballage et l'étiquetage selon vos spécifications exactes." },
      { heading: "Tarification par Volume & Quantité Minimale", body: "Nous proposons des structures de prix dégressifs pour les commandes en volume, avec des remises significatives pour les contrats récurrents. Notre quantité minimale de commande standard pour les marchés européens commence à 500 unités par SKU, mais nous pouvons accommoder des commandes d'essai plus petites pour de nouveaux partenariats. Tous les prix incluent les tests d'assurance qualité, l'étiquetage conforme UE et la documentation. Pour les commandes de gros volume (10 000+ unités), nous proposons des runs de production dédiés avec des spécifications personnalisées." },
      { heading: "Logistique Mondiale", body: "Notre équipe logistique gère l'expédition de bout en bout depuis notre installation de transformation au Bihar jusqu'à n'importe quelle destination en Europe. Nous supportons les Incoterms CIF (Coût, Assurance et Fret) et FOB (Franco à Bord). Le fret maritime est notre mode d'expédition standard, avec des délais de transit de 25 à 30 jours vers les principaux ports européens. Le fret aérien est disponible pour les commandes urgentes avec une livraison en 5 à 7 jours. Tous les envois comprennent une documentation douanière complète, des certificats phytosanitaires et une assistance au dédouanement européen." },
      { heading: "Dossier Documentaire", body: "Chaque partenaire B2B reçoit un dossier documentaire complet comprenant : des fiches techniques détaillées des produits (TDS), des certificats d'analyse (COA) pour chaque lot, les certificats de conformité FSSAI et UE, les déclarations allergènes, les rapports d'analyse nutritionnelle, les études de durée de vie et les spécifications d'emballage. Tous les documents sont disponibles en anglais et en français." },
      { heading: "Opportunités de Partenariat", body: "Nous recherchons activement des partenariats avec des détaillants premium, des épiceries biologiques, des chaînes hôtelières de luxe, des restaurants Michelin, des programmes de bien-être en entreprise et des distributeurs alimentaires spécialisés en France, Belgique, Suisse et dans l'ensemble de l'UE. Si vous partagez notre engagement envers la qualité, la transparence et l'innovation, nous serions ravis d'échanger avec vous." }
    ],
    cta: { text: "Envoyer une Demande Professionnelle", href: "/contact" }
  },
};

export default function CompanyDynamicPage() {
  const { lang } = useLanguage();
  const params = useParams();
  const slug = params.slug as string;
  
  const routeMap: Record<string, { en: string, fr: string }> = {
    "our-story": { en: "our-story", fr: "notre-histoire" },
    "notre-histoire": { en: "our-story", fr: "notre-histoire" },
    "pro-portal": { en: "pro-portal", fr: "espace-pro" },
    "espace-pro": { en: "pro-portal", fr: "espace-pro" }
  };
  
  let page;
  if (slug === "transparence" || slug === "transparency") {
    page = lang === "fr" ? transparenceFr : transparenceEn;
  } else if (slug === "certifications") {
    page = lang === "fr" ? certificationsFr : certificationsEn;
  } else {
    const actualSlug = routeMap[slug]?.[lang as "en" | "fr"] || slug;
    page = pages[actualSlug];
  }

  useEffect(() => {
    if (page) {
      document.title = `${page.title} | AÉRI Makhana`;
      const metaDescription = document.querySelector('meta[name="description"]');
      if (metaDescription) {
        metaDescription.setAttribute("content", page.subtitle);
      } else {
        const meta = document.createElement('meta');
        meta.name = "description";
        meta.content = page.subtitle;
        document.head.appendChild(meta);
      }
    }
  }, [page]);

  if (!page) {
    return (
      <main className="min-h-screen bg-[#FAF8F5] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">
            {lang === "fr" ? "Page Non Trouvée" : "Page Not Found"}
          </h1>
          <Link href="/" className="text-[#6E6E73] hover:text-[#111111] underline">
            {lang === "fr" ? "Retour à l'Accueil" : "Back to Home"}
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#FAF8F5] text-[#111111] font-sans">
      {/* Navbar */}
      <Navbar />

      {/* Hero */}
      <section className="pt-40 pb-16 px-6 md:px-12 max-w-4xl mx-auto text-center">
        <motion.span initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.3em] uppercase text-[#6E6E73] mb-5">
          <span className="w-6 h-[1px] bg-[#6E6E73]/40" />
          {page.badge}
          <span className="w-6 h-[1px] bg-[#6E6E73]/40" />
        </motion.span>
        <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.1 }} className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-6">{page.title}</motion.h1>
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 0.3 }} className="text-lg text-[#6E6E73] max-w-2xl mx-auto leading-relaxed">{page.subtitle}</motion.p>
      </section>

      {/* Content Sections */}
      <section className="px-6 md:px-12 max-w-3xl mx-auto pb-32">
        <div className="bg-white rounded-3xl shadow-sm border border-[#111111]/5 overflow-hidden">
          {page.sections.map((sec, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.1 }} transition={{ duration: 0.7 }} className={`p-5 sm:p-8 md:p-12 ${i > 0 ? "border-t border-[#111111]/5" : ""}`}>
              <h2 className="text-2xl font-bold mb-4">{sec.heading}</h2>
              {typeof sec.body === "string" ? (
                <p className="text-[#111111]/70 leading-[1.9] text-[15px]">{sec.body}</p>
              ) : (
                <div className="text-[#111111]/70 leading-[1.9] text-[15px]">{sec.body}</div>
              )}
            </motion.div>
          ))}
          {page.cta && (
            <div className="p-5 sm:p-8 md:p-12 border-t border-[#111111]/5 bg-[#FAF8F5] text-center">
              <Link href={page.cta.href} className="inline-block px-6 sm:px-8 py-4 bg-[#111111] text-white rounded-2xl font-medium tracking-wide hover:bg-[#111111]/80 transition-colors">{page.cta.text}</Link>
            </div>
          )}
        </div>
      </section>
      <Footer />
    </main>
  );
}
