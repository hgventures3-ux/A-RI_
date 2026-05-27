"use client";

import { useRef } from "react";
import { motion, useInView, type Variants } from "framer-motion";

const values = [
  {
    title: "Qualité Absolue",
    body: "Nous prenons l'entière responsabilité de nos standards de transformation alimentaire, de la récolte au container final. Chaque lot est calibré pour garantir une texture croquante uniforme, une taille premium constante, et une conformité sanitaire sans compromis.",
  },
  {
    title: "Fiabilité d'Approvisionnement",
    body: "Notre héritage familial de 25 ans dans la fabrication industrielle à haute capacité soutient chaque promesse. Notre pipeline logistique est conçu pour éliminer les retards, prévenir les ruptures de stock et garantir que vos rayons restent continuellement approvisionnés.",
  },
  {
    title: "Sécurité Réglementaire",
    body: "Nous supprimons intégralement le risque douanier pour nos partenaires importateurs. Notre réseau de transformation opère sous des normes de conformité européennes et internationales auditées, pour garantir zéro rejet en douane et zéro risque juridique.",
  },
];

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15 },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: "easeOut" },
  },
};

export default function MissionPage() {
  const sectionRef = useRef<HTMLElement>(null);
  const valuesRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.15 });
  const valuesInView = useInView(valuesRef, { once: true, amount: 0.2 });

  return (
    <main className="min-h-screen w-full" style={{ background: "#FFFFFF" }}>
      <section ref={sectionRef} className="max-w-5xl mx-auto px-6 py-20 md:py-32">
        {/* Page Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-5xl lg:text-6xl text-center mb-20 md:mb-28 text-[#1C1C1C]"
          style={{
            fontFamily: "'Didot', 'Playfair Display', serif",
          }}
        >
          Notre Raison d&apos;Être
        </motion.h1>

        {/* Mission */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="mb-16 md:mb-20"
        >
          <h2
            className="text-2xl md:text-3xl text-[#1C1C1C] mb-5"
            style={{
              fontFamily: "'Didot', 'Playfair Display', serif",
            }}
          >
            Notre Mission
          </h2>
          <p
            className="text-base md:text-lg text-[#1C1C1C]/80 leading-relaxed max-w-3xl"
            style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
          >
            Faire d&apos;un super-aliment indien millénaire — naturellement riche en
            protéines, faible en graisses et en glucides complexes — une
            référence mondiale du snacking premium.
          </p>
        </motion.div>

        {/* Vision */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mb-20 md:mb-28"
        >
          <h2
            className="text-2xl md:text-3xl text-[#1C1C1C] mb-5"
            style={{
              fontFamily: "'Didot', 'Playfair Display', serif",
            }}
          >
            Notre Vision
          </h2>
          <p
            className="text-base md:text-lg text-[#1C1C1C]/80 leading-relaxed max-w-3xl"
            style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
          >
            Devenir le partenaire d&apos;approvisionnement le plus fiable, le plus
            rigoureux en matière de qualité et le plus certifié pour les
            super-aliments alternatifs premium à l&apos;échelle mondiale.
          </p>
        </motion.div>

        {/* Values */}
        <div ref={valuesRef}>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={valuesInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="text-2xl md:text-3xl text-[#1C1C1C] mb-10 md:mb-12"
            style={{
              fontFamily: "'Didot', 'Playfair Display', serif",
            }}
          >
            Nos Valeurs
          </motion.h2>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={valuesInView ? "visible" : "hidden"}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8"
          >
            {values.map((value, i) => (
              <motion.div
                key={i}
                variants={cardVariants}
                className="bg-white rounded-xl p-6 md:p-8 border border-[#E5E5E5]"
                style={{
                  borderTop: "3px solid #D4AF37",
                  boxShadow: "0 2px 12px rgba(0,0,0,0.04)",
                }}
              >
                <h3
                  className="text-lg md:text-xl text-[#1C1C1C] mb-4 font-semibold"
                  style={{
                    fontFamily: "'Didot', 'Playfair Display', serif",
                  }}
                >
                  {value.title}
                </h3>
                <p
                  className="text-sm md:text-base text-[#1C1C1C]/75 leading-relaxed"
                  style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
                >
                  {value.body}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </main>
  );
}
