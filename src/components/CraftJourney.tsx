"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";

const steps = [
  {
    num: 1,
    image: "/journey/step1_pond_v2.jpg",
    fr: {
      title: "Née dans des eaux précieuses",
      desc: "Le nymphéa épineux est une fleur rare, qui ne se livre qu'à la main attentive.",
    },
    en: {
      title: "Born in Precious Waters",
      desc: "The prickly water lily is a rare flower, yielding only to the careful hand.",
    },
  },
  {
    num: 2,
    image: "/journey/step2_v2.jpg",
    fr: {
      title: "Des graines rares et précieuses",
      desc: "Chaque graine est récoltée à la main avec patience et exigence.",
    },
    en: {
      title: "Rare and Precious Seeds",
      desc: "Each seed is harvested by hand with patience and exacting care.",
    },
  },
  {
    num: 3,
    image: "/journey/step3_v2.jpg",
    fr: {
      title: "Séchage naturel & torréfaction maîtrisée",
      desc: "Séchées au soleil, puis torréfiées à la main en 8 cycles pour révéler toute leur finesse.",
    },
    en: {
      title: "Natural Drying & Controlled Roasting",
      desc: "Sun-dried, then hand-roasted in 8 cycles to reveal all their delicacy.",
    },
  },
  {
    num: 4,
    image: "/journey/step4_v2.jpg",
    fr: {
      title: "Éclatées à la main, une à une",
      desc: "Chaque graine est ouverte manuellement avec précision. Un geste minutieux qu'aucune machine ne peut reproduire.",
    },
    en: {
      title: "Popped by Hand, One by One",
      desc: "Each seed is manually opened with precision. A meticulous gesture no machine can replicate.",
    },
  },
  {
    num: 5,
    image: "/journey/step5_v2.jpg",
    fr: {
      title: "Triées avec soin, sublimées avec justesse",
      desc: "Chaque graine est triée à la main pour ne garder que l'excellence. Puis rôtie et assaisonnée avec précision.",
    },
    en: {
      title: "Carefully Sorted, Perfectly Elevated",
      desc: "Each seed is hand-sorted to keep only excellence. Then roasted and seasoned with precision.",
    },
  },
  {
    num: 6,
    image: "/journey/step6_v2.jpg",
    fr: {
      title: "Conditionnée avec excellence",
      desc: "Chaque sachet est scellé avec précision pour préserver la fraîcheur, le croquant et l'intensité des saveurs.",
    },
    en: {
      title: "Packaged with Excellence",
      desc: "Each pouch is sealed with precision to preserve freshness, crunch, and the intensity of flavors.",
    },
  },
];

function StepCircle({
  step,
  index,
  lang,
  isLast,
}: {
  step: (typeof steps)[0];
  index: number;
  lang: string;
  isLast: boolean;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  const content = lang === "fr" ? step.fr : step.en;

  const isDown = index % 2 !== 0;

  return (
    <div className={`flex flex-col items-center relative w-full ${isDown ? 'xl:mt-[100px]' : ''}`} ref={ref}>
      <div className="relative z-10 flex flex-col items-center">
        {/* Step number badge - Placed on top of the circle */}
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.5, delay: index * 0.1 + 0.15 }}
          className="absolute -top-4 left-1/2 -translate-x-1/2 w-10 h-10 rounded-full flex items-center justify-center text-lg font-bold text-[#4A3B28] z-20"
          style={{
            background: "#FDCB82", // Orange color matching Image 1
            boxShadow: "0 4px 10px rgba(0,0,0,0.15)",
            fontFamily: "var(--font-montserrat)",
          }}
        >
          {step.num}
        </motion.div>

        {/* Circle image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.65, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="relative w-[180px] h-[180px] xl:w-[200px] xl:h-[200px] rounded-full overflow-hidden flex-shrink-0 bg-white"
          style={{
            border: "6px solid white",
            boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
          }}
        >
          <Image
            src={step.image}
            alt={content.title}
            fill
            className="object-cover scale-[1.15]"
            sizes="200px"
          />
        </motion.div>
      </div>



      {/* Text */}
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: index * 0.1 + 0.22 }}
        className="mt-6 text-center px-2 max-w-[220px]"
      >
        <h3
          className="text-[17px] font-semibold text-[#1D1B1A] leading-snug mb-2"
          style={{ fontFamily: "var(--font-didot)" }}
        >
          {content.title}
        </h3>
        <p
          className="text-[12.5px] text-[#6B5E4E] leading-relaxed"
          style={{ fontFamily: "var(--font-montserrat)" }}
        >
          {content.desc}
        </p>
      </motion.div>
    </div>
  );
}

export default function CraftJourney() {
  const { lang } = useLanguage();

  const heading =
    lang === "fr"
      ? { eyebrow: "Savoir-faire", title: "Le chemin de chaque graine", subtitle: "Ce savoir-faire ne peut pas être industrialisé." }
      : { eyebrow: "Craftsmanship", title: "The journey of every seed", subtitle: "This craftsmanship cannot be industrialized." };

  return (
    <section
      className="w-full py-20 md:py-28 overflow-hidden"
      style={{ background: "#FAF8F5" }}
      aria-label={heading.title}
    >
      {/* Section header */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.75 }}
        className="text-center mb-14 md:mb-18 px-6"
      >
        <p
          className="text-[10px] font-bold tracking-[0.35em] uppercase text-[#9C8A6E] mb-4"
          style={{ fontFamily: "var(--font-montserrat)" }}
        >
          {heading.eyebrow}
        </p>
        <h2
          className="text-3xl md:text-5xl font-semibold text-[#1D1B1A] tracking-tight mb-4"
          style={{ fontFamily: "var(--font-didot)" }}
        >
          {heading.title}
        </h2>
        <p
          className="text-sm md:text-base text-[#6B5E4E] max-w-lg mx-auto"
          style={{ fontFamily: "var(--font-montserrat)" }}
        >
          {heading.subtitle}
        </p>
      </motion.div>

      {/* Desktop: horizontal row with dotted lines */}
      <div className="hidden xl:flex items-start justify-center gap-0 px-8 max-w-[1440px] mx-auto relative pb-[100px]">
        {steps.map((step, index) => (
          <div key={step.num} className="flex-1 flex flex-col items-center relative w-full">
            <StepCircle
              step={step}
              index={index}
              lang={lang}
              isLast={index === steps.length - 1}
            />
          </div>
        ))}
      </div>

      {/* Mobile / Tablet: 2-column grid */}
      <div className="xl:hidden grid grid-cols-2 md:grid-cols-3 gap-10 px-5 max-w-3xl mx-auto">
        {steps.map((step, index) => (
          <StepCircle
            key={step.num}
            step={step}
            index={index}
            lang={lang}
            isLast={true} /* no line connectors on mobile */
          />
        ))}
      </div>
    </section>
  );
}
