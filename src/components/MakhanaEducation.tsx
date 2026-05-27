"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const steps = [
  {
    num: "01",
    title: "La Graine Super-Héroïque",
    body: "C\u2019est une graine de makhana. Non, pas la plante classique de votre jardin, la version super-aliment d\u2019origine védique.",
  },
  {
    num: "02",
    title: "De l\u2019Étang à l\u2019Apéro",
    body: "Cultivé sur 1 000 acres de zones humides préservées en partenariat exclusif avec Hybite Foods pour garantir une traçabilité à 100%. Sans intermédiaires.",
  },
  {
    num: "03",
    title: "Plus léger que l\u2019air",
    body: "Adieu la sensation de \u2018brique\u2019 dans l\u2019estomac après l\u2019apéro. AÉRI est si léger que vous pourriez presque vous envoler.",
  },
];

function StepCard({ step, index }: { step: typeof steps[number]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}
      style={{
        flex: "1 1 0%",
        minWidth: 0,
        padding: "2.5rem 2rem",
        borderRadius: "1.5rem",
        backgroundColor: "#ffffff",
        boxShadow: "0 4px 24px -6px rgba(29,27,26,0.08)",
        border: "1px solid rgba(29,27,26,0.06)",
        display: "flex",
        flexDirection: "column" as const,
        gap: "1rem",
      }}
    >
      <span
        style={{
          fontFamily: "var(--font-didot, var(--font-playfair), serif)",
          fontSize: "3rem",
          fontWeight: 700,
          lineHeight: 1,
          color: "#D4AF37",
        }}
      >
        {step.num}
      </span>
      <h3
        style={{
          fontFamily: "var(--font-didot, var(--font-playfair), serif)",
          fontSize: "1.35rem",
          fontWeight: 700,
          color: "#1d1b1a",
          lineHeight: 1.3,
        }}
      >
        {step.title}
      </h3>
      <p
        style={{
          fontFamily: "var(--font-montserrat, var(--font-inter), sans-serif)",
          fontSize: "0.95rem",
          lineHeight: 1.75,
          color: "rgba(29,27,26,0.65)",
        }}
      >
        {step.body}
      </p>
    </motion.div>
  );
}

export default function MakhanaEducation() {
  const headerRef = useRef<HTMLDivElement>(null);
  const headerInView = useInView(headerRef, { once: true, amount: 0.3 });

  return (
    <section
      id="about"
      style={{
        width: "100%",
        padding: "6rem 1.5rem",
        backgroundColor: "#F5E6D3",
        overflow: "hidden",
      }}
    >
      {/* Section Title */}
      <div ref={headerRef} style={{ textAlign: "center", marginBottom: "4rem" }}>
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          style={{
            fontFamily: "var(--font-didot, var(--font-playfair), serif)",
            fontSize: "clamp(2rem, 5vw, 3.25rem)",
            fontWeight: 700,
            color: "#1d1b1a",
            margin: 0,
          }}
        >
          Qu&apos;est-ce que le Makhana&nbsp;?
        </motion.h2>
      </div>

      {/* 3-Column Layout */}
      <div
        style={{
          maxWidth: "72rem",
          margin: "0 auto",
          display: "flex",
          flexDirection: "row" as const,
          gap: "1.5rem",
          flexWrap: "wrap" as const,
        }}
      >
        {steps.map((step, i) => (
          <StepCard key={step.num} step={step} index={i} />
        ))}
      </div>

      {/* Responsive: stack on mobile */}
      <style>{`
        @media (max-width: 768px) {
          #about > div:last-of-type {
            flex-direction: column !important;
          }
          #about > div:last-of-type > div {
            flex: 1 1 100% !important;
          }
        }
      `}</style>
    </section>
  );
}
