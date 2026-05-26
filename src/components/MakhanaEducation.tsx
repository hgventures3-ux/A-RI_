"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import t from "@/translations";

const stepImages = ["/step1_superhero.png", "/step2_wetlands.png", "/step3_floating.png"];

/* ────────────────────────────────────────────────────────
   Individual step card — animates on scroll
   ──────────────────────────────────────────────────────── */
function StepCard({
  step,
  index,
  total,
  stepLabel,
}: {
  step: { headline: string; body: string; badge: string };
  index: number;
  total: number;
  stepLabel: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.35 });
  const isEven = index % 2 === 0;
  const num = String(index + 1).padStart(2, "0");

  return (
    <div ref={ref} className="relative w-full max-w-6xl mx-auto">
      {index < total - 1 && (
        <motion.div
          initial={{ scaleY: 0 }}
          animate={isInView ? { scaleY: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="hidden md:block absolute left-1/2 -translate-x-1/2 -bottom-16 w-[1px] h-16 bg-[#6E6E73]/30 origin-top"
        />
      )}

      <div
        className={`flex flex-col ${
          isEven ? "md:flex-row" : "md:flex-row-reverse"
        } items-center gap-10 md:gap-16`}
      >
        {/* ── Image Side ── */}
        <motion.div
          initial={{ opacity: 0, x: isEven ? -60 : 60 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.9, ease: "easeOut" }}
          className="relative w-full md:w-1/2 flex justify-center"
        >
          <div className="relative w-[280px] h-[280px] md:w-[400px] md:h-[400px] rounded-3xl overflow-hidden">
            <Image
              src={stepImages[index]}
              alt={step.headline}
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 rounded-3xl ring-1 ring-[#6E6E73]/10" />
          </div>
        </motion.div>

        {/* ── Text Side ── */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, delay: 0.2, ease: "easeOut" }}
          className="w-full md:w-1/2 text-center md:text-left"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.5 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="inline-block text-xs font-semibold tracking-[0.3em] uppercase text-[#6E6E73] mb-4"
            style={{ fontFamily: "var(--font-montserrat)" }}
          >
            {stepLabel} {num}
          </motion.span>

          <h3
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#111111] mb-5 leading-tight"
            style={{ fontFamily: "var(--font-montserrat)" }}
          >
            {step.headline}
          </h3>

          <p
            className="text-base md:text-lg leading-relaxed text-[#111111]/75 mb-6 max-w-lg"
            style={{ fontFamily: "var(--font-lora)" }}
          >
            {step.body}
          </p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#6E6E73]/10 text-[#6E6E73] text-sm font-medium tracking-wide border border-[#6E6E73]/15">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
              {step.badge}
            </span>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}

/* ────────────────────────────────────────────────────────
   Main Section
   ──────────────────────────────────────────────────────── */
export default function MakhanaEducation() {
  const { lang } = useLanguage();
  const s = t.education[lang];

  const sectionRef = useRef<HTMLDivElement>(null);
  const headerInView = useInView(sectionRef, { once: true, amount: 0.2 });

  return (
    <section
      id="about"
      className="relative w-full py-24 md:py-36 overflow-hidden bg-[#F5F5F7]"
    >

      {/* ── Section Header ── */}
      <div ref={sectionRef} className="relative z-20 text-center px-6 mb-20 md:mb-28">
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="inline-block text-xs font-semibold tracking-[0.4em] uppercase text-[#6E6E73] mb-4"
          style={{ fontFamily: "var(--font-montserrat)" }}
        >
          {s.label}
        </motion.span>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, delay: 0.15 }}
          className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#111111] mb-6"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          {s.title}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={headerInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.35 }}
          className="text-lg md:text-xl text-[#111111]/60 max-w-2xl mx-auto whitespace-pre-line"
          style={{ fontFamily: "var(--font-lora)" }}
        >
          {s.subtitle}
        </motion.p>

        <motion.div
          initial={{ scaleX: 0 }}
          animate={headerInView ? { scaleX: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-8 mx-auto w-24 h-[2px] bg-[#6E6E73]/40 origin-center"
        />
      </div>

      {/* ── Steps ── */}
      <div className="relative z-20 flex flex-col gap-20 md:gap-28 px-6">
        {s.steps.map((step: { headline: string; body: string; badge: string }, i: number) => (
          <StepCard key={i} step={step} index={i} total={s.steps.length} stepLabel={s.stepLabel} />
        ))}
      </div>

      {/* ── Bottom CTA ── */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.8 }}
        className="relative z-20 text-center mt-20 md:mt-28 px-6"
      >
        <p
          className="text-base md:text-lg italic text-[#111111]/50 max-w-xl mx-auto"
          style={{ fontFamily: "var(--font-lora)" }}
        >
          {s.closing}
        </p>
      </motion.div>
    </section>
  );
}
