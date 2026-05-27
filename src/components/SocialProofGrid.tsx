"use client";

import { useRef } from "react";
import { motion, useInView, type Variants } from "framer-motion";

const reviews = [
  {
    emoji: "🥂",
    role: "L'Hôte Parisien",
    quote:
      "J'ai servi AÉRI lors de mon dernier apéro à Paris, et tous mes invités ont été totalement séduits par sa légèreté. Une magnifique découverte croustillante !",
  },
  {
    emoji: "💪",
    role: "Le Sportif",
    quote:
      "En tant que passionné de sport, mon apport en protéines est crucial. Ce snack m'offre une alternative saine, craquante, et ultra-faible en matières grasses.",
  },
  {
    emoji: "👨‍👩‍👧",
    role: "La Parent Engagée",
    quote:
      "Mes enfants adorent la texture soufflée. C'est parfait pour leur éviter les chips industrielles sans faire de compromis sur le goût.",
  },
  {
    emoji: "🌿",
    role: "La Consciencieuse",
    quote:
      "Enfin un en-cas gourmand avec un excellent profil nutritionnel. Plus besoin de s'inquiéter pour les calories ou les graisses saturées.",
  },
];

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: "easeOut" },
  },
};

export default function SocialProofGrid() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  return (
    <section
      ref={sectionRef}
      className="w-full py-20 md:py-28 px-6"
      style={{ background: "#F5E6D3" }}
    >
      <div className="max-w-6xl mx-auto">
        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center text-xs md:text-sm tracking-[0.2em] uppercase text-[#6E6E73] mb-12 md:mb-16"
          style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
        >
          Premiers retours — échantillons testés en avant-première.
        </motion.p>

        {/* Card Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8"
        >
          {reviews.map((review, i) => (
            <motion.div
              key={i}
              variants={cardVariants}
              className="bg-white rounded-2xl p-6 md:p-8 border border-[#E8E0D8] shadow-[0_4px_24px_rgba(0,0,0,0.06)] flex flex-col items-center text-center"
            >
              {/* Emoji Avatar */}
              <div className="w-16 h-16 rounded-full bg-[#F5E6D3] flex items-center justify-center text-3xl mb-5">
                {review.emoji}
              </div>

              {/* Role Title */}
              <h3
                className="text-lg font-semibold text-[#1C1C1C] mb-4"
                style={{
                  fontFamily:
                    "'Didot', 'Playfair Display', serif",
                }}
              >
                {review.role}
              </h3>

              {/* Quote */}
              <p
                className="text-sm text-[#4A4A4A] leading-relaxed italic"
                style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
              >
                &ldquo;{review.quote}&rdquo;
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
