"use client";

import React from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import FlavorExplorer from "@/components/FlavorExplorer";
import InstagramFeed from "@/components/InstagramFeed";

const pageTranslations = {
  fr: {
    title: "AÉRI Makhana",
    subtitle: "Graines de makhana soufflées et torréfiées de qualité supérieure.",
    aboutTitle: "À Propos du Makhana",
    points: [
      {
        title: "Un superaliment traditionnel",
        desc: "Le makhana, également appelé noix de renard ou graine de lotus, fait partie de l'alimentation indienne depuis des siècles.",
      },
      {
        title: "Cultivé au Bihar",
        desc: "Le makhana est cultivé dans les étangs du Bihar, en Inde.",
      },
      {
        title: "Léger et croustillant",
        desc: "Un en-cas végétal léger, croquant et sain.",
      },
    ],
  },
  en: {
    title: "AÉRI Makhana",
    subtitle: "Premium roasted makhana in gourmet flavors.",
    aboutTitle: "About Makhana",
    points: [
      {
        title: "A traditional superfood",
        desc: "Makhana, also called fox nut or lotus seed, has been part of Indian food for centuries.",
      },
      {
        title: "Grown in Bihar",
        desc: "Makhana is grown in the ponds of Bihar, India.",
      },
      {
        title: "Light and crunchy",
        desc: "A light, crunchy, plant-based snack.",
      },
    ],
  },
  hi: {
    title: "AÉRI मखाना",
    subtitle: "प्रीमियम भुना हुआ मखाना विभिन्न स्वादों में।",
    aboutTitle: "मखाना के बारे में",
    points: [
      {
        title: "एक पारंपरिक सुपरफूड",
        desc: "मखाना, जिसे फॉक्स नट या कमल का बीज भी कहा जाता है, सदियों से भारतीय भोजन का हिस्सा रहा है।",
      },
      {
        title: "बिहार में उत्पादित",
        desc: "मखाना भारत के बिहार के तालाबों में उगाया जाता है।",
      },
      {
        title: "हल्का और कुरकुरा",
        desc: "एक हल्का, कुरकुरा, पौध-आधारित स्नैक।",
      },
    ],
  },
};

export default function BrandPage() {
  const { lang } = useLanguage();
  const t = pageTranslations[lang as keyof typeof pageTranslations] || pageTranslations.en;

  const fadeUp: any = {
    hidden: { opacity: 0, y: 24 },
    visible: (d: number = 0) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: "easeOut", delay: d },
    }),
  };

  return (
    <main className="min-h-screen bg-[#FAF8F5] text-[#1C1C1C] font-montserrat overflow-hidden">
      <Navbar />

      <div className="pt-24 lg:pt-28" />

      {/* ── Hero Section ── */}
      <section className="pt-12 pb-16 px-6 md:px-12 max-w-4xl mx-auto text-center">
        <motion.h1
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          custom={0}
          className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-4"
          style={{ fontFamily: "var(--font-didot)" }}
        >
          {t.title}
        </motion.h1>
        <motion.p
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          custom={0.2}
          className="text-lg text-gray-700 max-w-2xl mx-auto leading-relaxed font-normal"
        >
          {t.subtitle}
        </motion.p>
      </section>

      {/* ── About Makhana (3 clean points) ── */}
      <section className="py-16 px-6 md:px-12 max-w-5xl mx-auto mb-12">
        <div className="text-center mb-12">
          <h2
            className="text-2xl md:text-3xl font-bold mb-3"
            style={{ fontFamily: "var(--font-didot)" }}
          >
            {t.aboutTitle}
          </h2>
          <div className="w-12 h-[2px] bg-[#1C1C1C] mx-auto" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {t.points.map((pt, idx) => (
            <motion.div
              key={idx}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              custom={idx * 0.15}
              className="bg-white rounded-2xl p-7 border border-[#1C1C1C]/10 shadow-sm flex flex-col justify-start"
            >
              <span className="text-xs font-mono font-bold text-gray-400 mb-3">
                0{idx + 1}
              </span>
              <h3 className="text-lg font-bold text-[#1C1C1C] mb-2">
                {pt.title}
              </h3>
              <p className="text-sm text-gray-700 leading-relaxed font-normal">
                {pt.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── Sign In & Account Banner (kept on /brand only) ── */}
      <section className="bg-[#F5F3F0] py-8 border-y border-[#1C1C1C]/10 text-center">
        <div className="max-w-4xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-700 font-medium">
            Existing customer? Sign In to Account
          </p>
          <Link
            href="/login"
            className="min-h-[44px] px-6 py-2.5 rounded-lg border border-[#1C1C1C] text-[#1C1C1C] text-xs font-semibold tracking-wider uppercase hover:bg-[#1C1C1C] hover:text-white transition-all flex items-center justify-center"
          >
            Sign In
          </Link>
        </div>
      </section>

      {/* ── Shop Collection (Our current range) ── */}
      <FlavorExplorer />

      {/* ── Instagram Section ── */}
      <InstagramFeed />

      <Footer />
    </main>
  );
}
