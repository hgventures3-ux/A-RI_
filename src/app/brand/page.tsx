"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import Image from "next/image";

const pageTranslations = {
  fr: {
    nav: { brand: "La Marque", products: "Produits", contact: "Contact" },
    title: "Notre Histoire",
    subtitle: "Une quête de perfection, de la tradition indienne millénaire jusqu'à l'art de vivre à la française.",
    sections: [
      {
        title: "L'Origine du Makhana",
        body: "Au cœur des zones humides préservées du Bihar, en Inde, pousse l'Euryale Ferox, communément appelée Makhana ou graine de nénuphar. Consommée depuis des millénaires pour ses vertus nutritionnelles exceptionnelles, elle est un pilier de l'Ayurveda. Nous avons sélectionné les meilleures fermes artisanales pour vous offrir cette graine d'exception.",
        image: "/heritage_ancient.png"
      },
      {
        title: "Le Savoir-faire",
        body: "La récolte du Makhana est un art ancestral. Les graines sont cueillies à la main avec un soin extrême, puis séchées naturellement au soleil. Elles sont ensuite soufflées délicatement à la chaleur, sans aucune goutte d'huile, ce qui leur confère cette texture aérienne unique et cette légèreté incomparable.",
        image: "/stage_harvest.png"
      },
      {
        title: "La Touche AÉRI",
        body: "Nous avons voulu sublimer ce super-aliment en y apportant notre vision du snacking gastronomique. En associant la légèreté du Makhana à des saveurs raffinées comme la truffe noire du Périgord ou les herbes de Provence, AÉRI réinvente l'apéritif. Un plaisir intense, sans compromis sur la santé.",
        image: "/stage_flavoring.png"
      },
      {
        title: "La Fondatrice",
        body: "« Après une décennie dans le marketing du luxe, j'ai voulu créer ce qui manquait à l'apéritif français : une véritable élégance nutritionnelle. AÉRI est le pont entre l'héritage de mon enfance et l'exigence de la gastronomie contemporaine. »",
        image: "/founder.jpg"
      }
    ],
    missionTitle: "Notre Mission",
    missionBody: "Proposer une alternative saine et élégante aux snacks ultra-transformés, en valorisant un produit brut, naturel, et sourcé de manière éthique et responsable.",
    values: [
      { title: "Qualité Premium", desc: "Des ingrédients rigoureusement sélectionnés." },
      { title: "Durabilité", desc: "Un impact minimal sur l'environnement." },
      { title: "Transparence", desc: "Traçabilité complète de l'étang à votre assiette." }
    ]
  },
  en: {
    nav: { brand: "The Brand", products: "Products", contact: "Contact" },
    title: "Our Story",
    subtitle: "A quest for perfection, from ancient Indian tradition to the French art of living.",
    sections: [
      {
        title: "The Origin of Makhana",
        body: "In the heart of the preserved wetlands of Bihar, India, grows Euryale Ferox, commonly known as Makhana or foxnut. Consumed for millennia for its exceptional nutritional virtues, it is a pillar of Ayurveda. We have selected the finest artisanal farms to bring you this exceptional seed.",
        image: "/heritage_ancient.png"
      },
      {
        title: "The Craftsmanship",
        body: "Harvesting Makhana is an ancestral art. The seeds are hand-picked with extreme care, then naturally sun-dried. They are gently popped using heat alone, without a single drop of oil, giving them their unique airy texture and incomparable lightness.",
        image: "/stage_harvest.png"
      },
      {
        title: "The AÉRI Touch",
        body: "We wanted to elevate this superfood by bringing our vision of gastronomic snacking. By combining the lightness of Makhana with refined flavors like Périgord black truffle or Herbes de Provence, AÉRI reinvents the apéritif. An intense pleasure, without compromising on health.",
        image: "/stage_flavoring.png"
      },
      {
        title: "The Founder",
        body: "“After a decade in luxury marketing, I wanted to create what was missing from the French apéritif: true nutritional elegance. AÉRI is the bridge between the heritage of my childhood and the demands of contemporary gastronomy.”",
        image: "/founder.jpg"
      }
    ],
    missionTitle: "Our Mission",
    missionBody: "To offer a healthy and elegant alternative to ultra-processed snacks, by promoting a raw, natural product sourced ethically and responsibly.",
    values: [
      { title: "Premium Quality", desc: "Rigorously selected ingredients." },
      { title: "Sustainability", desc: "Minimal environmental impact." },
      { title: "Transparency", desc: "Complete traceability from pond to plate." }
    ]
  }
};

export default function BrandPage() {
  const { lang } = useLanguage();
  const t = pageTranslations[lang as keyof typeof pageTranslations] || pageTranslations.en;

  return (
    <main className="min-h-screen bg-[#F5F5F7] text-[#111111] font-sans pb-32">
      {/* Navbar */}
      <header className="fixed top-0 left-0 right-0 z-[40] w-full flex justify-between items-center px-6 md:px-12 py-3 bg-white/80 backdrop-blur-md border-b border-[#111111]/5 transition-all">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.1 }}>
          <Link href="/">
            <h2 className="text-xl tracking-widest uppercase text-[#111111] font-semibold cursor-pointer" style={{ fontFamily: "var(--font-inter)" }}>
              AÉRI
            </h2>
          </Link>
        </motion.div>
        <motion.nav initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.2 }} className="hidden md:flex gap-8 text-xs tracking-widest uppercase font-medium text-[#111111]/70">
          <Link href="/brand" className="text-[#111111] transition-colors">{t.nav.brand}</Link>
          <Link href="/products" className="hover:text-[#111111] transition-colors">{t.nav.products}</Link>
          <Link href="/contact" className="hover:text-[#111111] transition-colors">{t.nav.contact}</Link>
        </motion.nav>
      </header>

      {/* Hero Section */}
      <section className="pt-40 pb-20 px-6 md:px-12 max-w-5xl mx-auto text-center">
        <motion.h1 
          initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}
          className="text-5xl md:text-7xl font-bold tracking-tight mb-6"
        >
          {t.title}
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 0.3 }}
          className="text-lg md:text-xl text-[#6E6E73] max-w-3xl mx-auto leading-relaxed"
        >
          {t.subtitle}
        </motion.p>
      </section>

      {/* Story Sections */}
      <section className="px-6 md:px-12 max-w-6xl mx-auto flex flex-col gap-12 md:gap-24 mb-24">
        {t.sections.map((section, index) => (
          <motion.div 
            key={index}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8 }}
            className={`flex flex-col ${index % 2 === 1 ? 'md:flex-row-reverse' : 'md:flex-row'} items-center gap-10 md:gap-16`}
          >
            <div className="w-full md:w-1/2">
              <div className="relative w-full aspect-[4/3] rounded-3xl overflow-hidden shadow-sm">
                <Image src={section.image} alt={section.title} fill className="object-cover" />
              </div>
            </div>
            <div className="w-full md:w-1/2 flex flex-col justify-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-[#111111]">{section.title}</h2>
              <p className="text-[#111111]/70 leading-relaxed text-lg">{section.body}</p>
            </div>
          </motion.div>
        ))}
      </section>

      {/* Mission & Values */}
      <section className="px-6 md:px-12 max-w-5xl mx-auto text-center bg-white rounded-3xl p-12 md:p-24 shadow-sm border border-[#111111]/5">
        <motion.div 
          initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl font-bold mb-6 text-[#111111]">{t.missionTitle}</h2>
          <p className="text-xl text-[#6E6E73] max-w-3xl mx-auto leading-relaxed mb-16">
            "{t.missionBody}"
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-left">
          {t.values.map((val, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.2 }}
              className="flex flex-col"
            >
              <h4 className="text-lg font-bold text-[#111111] mb-3">{val.title}</h4>
              <p className="text-[#111111]/60 leading-relaxed">{val.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>
    </main>
  );
}
