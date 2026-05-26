"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import t from "@/translations";

/* ────────────────────────────────────────────────────────
   Stats
   ──────────────────────────────────────────────────────── */
const stats = [
  { value: "20+", label: "Ans d'expertise", sub: "Emballage & conservation" },
  { value: "1000", label: "Acres", sub: "Zones humides préservées" },
  { value: "100%", label: "Traçabilité", sub: "Du Bihar à la France" },
  { value: "4", label: "Certifications", sub: "FSSAI · NABL · EU · IEC" },
];

/* ────────────────────────────────────────────────────────
   Services
   ──────────────────────────────────────────────────────── */
const services = [
  {
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className="w-full h-full">
        <rect x="6" y="10" width="36" height="28" rx="3" stroke="currentColor" strokeWidth="1.5" />
        <path d="M6 18h36" stroke="currentColor" strokeWidth="1.5" />
        <path d="M14 26h10M14 30h6" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
        <circle cx="34" cy="28" r="5" stroke="currentColor" strokeWidth="1.2" />
        <path d="M32 28l1.5 1.5 3-3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    title: "Marque Blanche",
    description: "Conditionnement sous votre propre marque avec nos standards de qualité premium.",
  },
  {
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className="w-full h-full">
        <path d="M8 36l8-8 6 6 8-10 10 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M8 12v24h32" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="34" cy="16" r="3" stroke="currentColor" strokeWidth="1.2" />
        <path d="M34 13v-3M37 16h3" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
      </svg>
    ),
    title: "Volume & Pricing",
    description: "Tarifs dégressifs pour commandes en gros. MOQ flexible pour les marchés européens.",
  },
  {
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className="w-full h-full">
        <circle cx="24" cy="24" r="16" stroke="currentColor" strokeWidth="1.5" />
        <ellipse cx="24" cy="24" rx="8" ry="16" stroke="currentColor" strokeWidth="1" />
        <path d="M8 24h32M10 17h28M10 31h28" stroke="currentColor" strokeWidth="0.8" />
        <circle cx="24" cy="24" r="2" fill="currentColor" fillOpacity="0.3" />
      </svg>
    ),
    title: "Logistique Mondiale",
    description: "Expédition maritime et aérienne. Incoterms CIF/FOB. Dédouanement EU inclus.",
  },
];

/* ────────────────────────────────────────────────────────
   Footer links
   ──────────────────────────────────────────────────────── */
const footerLinks = {
  produits: ["Sel de l'Himalaya", "Herbes de Provence", "Truffe Noire", "Bientôt…"],
  entreprise: ["Notre Histoire", "Transparence", "Certifications", "Espace Pro"],
  légal: ["Politique de Retour", "CGV", "Mentions Légales", "Confidentialité"],
};

/* ────────────────────────────────────────────────────────
   Main Section
   ──────────────────────────────────────────────────────── */
export default function EspacePro() {
  const { lang } = useLanguage();
  const s = t.pro[lang];
  const headerRef = useRef<HTMLDivElement>(null);
  const headerInView = useInView(headerRef, { once: true, amount: 0.3 });
  const formRef = useRef<HTMLDivElement>(null);
  const formInView = useInView(formRef, { once: true, amount: 0.2 });
  const servicesRef = useRef<HTMLDivElement>(null);
  const servicesInView = useInView(servicesRef, { once: true, amount: 0.2 });

  const [formData, setFormData] = useState({ name: "", company: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
    setFormData({ name: "", company: "", message: "" });
  };

  const localizedStats = s.stats;
  const localizedServices = services.map((svc: { icon: React.ReactNode; title: string; description: string }, i: number) => ({
    ...svc,
    title: s.services[i].title,
    description: s.services[i].desc,
  }));

  return (
    <>
      {/* ═══════════════════════════════════════════════════
         SECTION — ESPACE PRO
      ═══════════════════════════════════════════════════ */}
      <section className="relative w-full overflow-hidden" style={{ background: "#FAFAF7" }}>
        {/* Subtle grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.025] pointer-events-none"
          style={{
            backgroundImage: "linear-gradient(#111111 1px, transparent 1px), linear-gradient(90deg, #111111 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />

        <div className="relative z-10 py-24 md:py-36">
          {/* ── Header ── */}
          <div ref={headerRef} className="text-center px-6 mb-16 md:mb-24">
            <motion.span
              initial={{ opacity: 0, y: 15 }}
              animate={headerInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.4em] uppercase text-[#6E6E73] mb-5"
              style={{ fontFamily: "var(--font-montserrat)" }}
            >
              <span className="w-8 h-[1px] bg-[#6E6E73]/40" />
              {s.label}
              <span className="w-8 h-[1px] bg-[#6E6E73]/40" />
            </motion.span>

            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={headerInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.9, delay: 0.1 }}
              className="text-4xl md:text-5xl lg:text-7xl font-bold text-[#111111] mb-6"
              style={{ fontFamily: "var(--font-montserrat)" }}
            >
              {s.title}
            </motion.h2>

            <motion.p
              initial={{ opacity: 0 }}
              animate={headerInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="text-lg md:text-xl text-[#111111]/55 max-w-2xl mx-auto leading-relaxed"
              style={{ fontFamily: "var(--font-lora)" }}
            >
              {s.hook}
            </motion.p>
          </div>

          {/* ── Stats ── */}
          <div className="max-w-5xl mx-auto px-6 mb-16 md:mb-24">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {localizedStats.map((stat: { value: string; label: string; sub: string }, i: number) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="text-center p-6 rounded-2xl bg-white border border-[#111111]/6 shadow-sm"
                >
                  <span
                    className="block text-3xl md:text-4xl font-bold text-[#111111] mb-1"
                    style={{ fontFamily: "var(--font-montserrat)" }}
                  >
                    {stat.value}
                  </span>
                  <span
                    className="block text-xs font-semibold uppercase tracking-wider text-[#6E6E73] mb-0.5"
                    style={{ fontFamily: "var(--font-montserrat)" }}
                  >
                    {stat.label}
                  </span>
                  <span
                    className="block text-[11px] text-[#111111]/35"
                    style={{ fontFamily: "var(--font-lora)" }}
                  >
                    {stat.sub}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* ── Services Grid ── */}
          <div ref={servicesRef} className="max-w-5xl mx-auto px-6 mb-16 md:mb-24">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {localizedServices.map((svc: { icon: React.ReactNode; title: string; description: string }, i: number) => (
                <motion.div
                  key={svc.title}
                  initial={{ opacity: 0, y: 30 }}
                  animate={servicesInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: i * 0.12 }}
                  className="group p-7 rounded-2xl bg-white border border-[#111111]/6 transition-all duration-400 hover:shadow-lg hover:border-[#111111]/12"
                >
                  <div className="w-12 h-12 text-[#111111]/60 mb-5 transition-colors group-hover:text-[#111111]">
                    {svc.icon}
                  </div>
                  <h4
                    className="text-lg font-bold text-[#111111] mb-2"
                    style={{ fontFamily: "var(--font-montserrat)" }}
                  >
                    {svc.title}
                  </h4>
                  <p
                    className="text-sm text-[#111111]/50 leading-relaxed"
                    style={{ fontFamily: "var(--font-lora)" }}
                  >
                    {svc.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* ── Trust Signal + Modi Quote ── */}
          <div className="max-w-4xl mx-auto px-6 mb-16 md:mb-24">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.7 }}
              className="relative p-8 md:p-12 rounded-2xl bg-[#111111] text-center"
            >
              <span
                className="absolute top-4 left-6 text-7xl leading-none text-[#FFFFFF]/5 pointer-events-none"
                style={{ fontFamily: "var(--font-playfair)" }}
              >
                &ldquo;
              </span>

              <p
                className="text-base md:text-lg text-[#FFFFFF]/70 leading-relaxed max-w-2xl mx-auto mb-6"
                style={{ fontFamily: "var(--font-lora)" }}
              >
                {s.trustText}
              </p>

              <div className="flex items-center justify-center gap-3">
                <div className="w-8 h-[1px] bg-[#8E8E93]/30" />
                <span
                  className="text-sm font-semibold text-[#8E8E93] tracking-wide"
                  style={{ fontFamily: "var(--font-montserrat)" }}
                >
                  Narendra Modi
                </span>
                <div className="w-8 h-[1px] bg-[#8E8E93]/30" />
              </div>
            </motion.div>
          </div>

          {/* ── CTA + Form ── */}
          <div ref={formRef} className="max-w-5xl mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
              {/* Left — CTA */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={formInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.7 }}
                className="flex flex-col justify-center"
              >
                <span
                  className="inline-block text-xs font-semibold tracking-[0.3em] uppercase text-[#6E6E73] mb-4"
                  style={{ fontFamily: "var(--font-montserrat)" }}
                >
                  {s.docLabel}
                </span>

                <h3
                  className="text-2xl md:text-3xl font-bold text-[#111111] mb-4 leading-snug"
                  style={{ fontFamily: "var(--font-montserrat)" }}
                >
                  {s.docTitle1}
                  <br />
                  <span className="text-[#6E6E73]">{s.docTitle2}</span>
                </h3>

                <p
                  className="text-base text-[#111111]/55 leading-relaxed mb-8"
                  style={{ fontFamily: "var(--font-lora)" }}
                >
                  {s.docBody}
                </p>

                <div className="flex flex-col sm:flex-row gap-3">
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className="inline-flex items-center justify-center gap-3 px-6 py-3.5 rounded-xl bg-[#111111] text-[#FFFFFF] text-sm font-semibold tracking-wide transition-colors hover:bg-[#111111]/90 cursor-pointer"
                    style={{ fontFamily: "var(--font-montserrat)" }}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                      <polyline points="7 10 12 15 17 10" />
                      <line x1="12" y1="15" x2="12" y2="3" />
                    </svg>
                    {s.ctaPrimary}
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-transparent text-[#111111] text-sm font-semibold tracking-wide border border-[#111111]/15 transition-colors hover:bg-[#111111]/5 cursor-pointer"
                    style={{ fontFamily: "var(--font-montserrat)" }}
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                      <polyline points="14 2 14 8 20 8" />
                    </svg>
                    {s.ctaSecondary}
                  </motion.button>
                </div>
              </motion.div>

              {/* Right — Form */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={formInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.15 }}
              >
                <form
                  onSubmit={handleSubmit}
                  className="p-7 md:p-9 rounded-2xl bg-white border border-[#111111]/8 shadow-sm"
                >
                  <h4
                    className="text-lg font-bold text-[#111111] mb-1"
                    style={{ fontFamily: "var(--font-montserrat)" }}
                  >
                    {s.formTitle}
                  </h4>
                  <p
                    className="text-xs text-[#111111]/40 mb-6"
                    style={{ fontFamily: "var(--font-lora)" }}
                  >
                    {s.formSub}
                  </p>

                  <div className="space-y-4">
                    <div>
                      <label
                        className="block text-xs font-semibold tracking-wide uppercase text-[#111111]/50 mb-1.5"
                        style={{ fontFamily: "var(--font-montserrat)" }}
                      >
                        {s.formName}
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder={s.formNamePh}
                        className="w-full px-4 py-3 rounded-xl bg-[#FFFFFF]/30 border border-[#111111]/8 text-sm text-[#111111] placeholder:text-[#111111]/25 focus:outline-none focus:border-[#111111]/25 focus:ring-1 focus:ring-[#111111]/10 transition-all"
                        style={{ fontFamily: "var(--font-lora)" }}
                      />
                    </div>

                    <div>
                      <label
                        className="block text-xs font-semibold tracking-wide uppercase text-[#111111]/50 mb-1.5"
                        style={{ fontFamily: "var(--font-montserrat)" }}
                      >
                        {s.formCompany}
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        placeholder={s.formCompanyPh}
                        className="w-full px-4 py-3 rounded-xl bg-[#FFFFFF]/30 border border-[#111111]/8 text-sm text-[#111111] placeholder:text-[#111111]/25 focus:outline-none focus:border-[#111111]/25 focus:ring-1 focus:ring-[#111111]/10 transition-all"
                        style={{ fontFamily: "var(--font-lora)" }}
                      />
                    </div>

                    <div>
                      <label
                        className="block text-xs font-semibold tracking-wide uppercase text-[#111111]/50 mb-1.5"
                        style={{ fontFamily: "var(--font-montserrat)" }}
                      >
                        {s.formMessage}
                      </label>
                      <textarea
                        required
                        rows={4}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder={s.formMessagePh}
                        className="w-full px-4 py-3 rounded-xl bg-[#FFFFFF]/30 border border-[#111111]/8 text-sm text-[#111111] placeholder:text-[#111111]/25 focus:outline-none focus:border-[#111111]/25 focus:ring-1 focus:ring-[#111111]/10 transition-all resize-none"
                        style={{ fontFamily: "var(--font-lora)" }}
                      />
                    </div>
                  </div>

                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="mt-6 w-full py-3.5 rounded-xl bg-[#111111] text-[#FFFFFF] text-sm font-semibold tracking-wide transition-colors hover:bg-[#111111]/90 cursor-pointer"
                    style={{ fontFamily: "var(--font-montserrat)" }}
                  >
                    {submitted ? s.formSuccess : s.formBtn}
                  </motion.button>
                </form>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
         FOOTER
      ═══════════════════════════════════════════════════ */}
      <footer className="relative w-full bg-[#111111] text-[#FFFFFF] overflow-hidden">
        {/* Waitlist banner */}
        <div className="border-b border-[#FFFFFF]/8">
          <div className="max-w-6xl mx-auto px-6 py-8 md:py-10 flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <span
                className="inline-flex items-center gap-2 text-[11px] font-semibold tracking-[0.3em] uppercase text-[#8E8E93] mb-2"
                style={{ fontFamily: "var(--font-montserrat)" }}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[#8E8E93] animate-pulse" />
                {s.waitlistLabel}
              </span>
              <h4
                className="text-lg md:text-xl font-bold text-[#FFFFFF]"
                style={{ fontFamily: "var(--font-montserrat)" }}
              >
                {s.waitlistTitle}
              </h4>
              <p
                className="text-sm text-[#FFFFFF]/45 mt-1"
                style={{ fontFamily: "var(--font-lora)" }}
              >
                {s.waitlistSub}
              </p>
            </div>

            <div className="flex gap-2 w-full md:w-auto">
              <input
                type="email"
                placeholder={s.waitlistPh}
                className="flex-1 md:w-64 px-4 py-3 rounded-xl bg-[#FFFFFF]/8 border border-[#FFFFFF]/12 text-sm text-[#FFFFFF] placeholder:text-[#FFFFFF]/30 focus:outline-none focus:border-[#FFFFFF]/25 transition-all"
                style={{ fontFamily: "var(--font-lora)" }}
              />
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="px-5 py-3 rounded-xl bg-[#8E8E93] text-[#111111] text-sm font-semibold tracking-wide transition-colors hover:bg-[#8E8E93]/90 cursor-pointer shrink-0"
                style={{ fontFamily: "var(--font-montserrat)" }}
              >
                {s.waitlistBtn}
              </motion.button>
            </div>
          </div>
        </div>

        {/* Main footer */}
        <div className="max-w-6xl mx-auto px-6 py-12 md:py-16">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10 md:gap-8">
            {/* Brand */}
            <div className="md:col-span-1">
              <h3
                className="text-2xl font-bold italic text-[#FFFFFF] mb-3"
                style={{ fontFamily: "var(--font-playfair)" }}
              >
                AÉRI
              </h3>
              <p
                className="text-sm text-[#FFFFFF]/40 leading-relaxed mb-5"
                style={{ fontFamily: "var(--font-lora)" }}
              >
                {s.brandTagline1}
                <br />
                {s.brandTagline2}
              </p>
              {/* Social icons */}
              <div className="flex gap-3">
                {["Instagram", "LinkedIn", "Twitter"].map((social) => (
                  <a
                    key={social}
                    href="#"
                    className="w-9 h-9 rounded-full bg-[#FFFFFF]/6 border border-[#FFFFFF]/10 flex items-center justify-center text-[#FFFFFF]/40 transition-colors hover:bg-[#FFFFFF]/12 hover:text-[#FFFFFF]/70"
                  >
                    <span className="text-[10px] font-bold" style={{ fontFamily: "var(--font-montserrat)" }}>
                      {social[0]}
                    </span>
                  </a>
                ))}
              </div>
            </div>

            {/* Links */}
            {Object.entries(s.footerLinks).map(([category, links], i) => (
              <div key={category}>
                <h5
                  className="text-xs font-semibold tracking-[0.25em] uppercase text-[#FFFFFF]/50 mb-4"
                  style={{ fontFamily: "var(--font-montserrat)" }}
                >
                  {s.footerCats[i]}
                </h5>
                <ul className="space-y-2.5">
                  {(links as string[]).map((link: string) => {
                    const slug = link.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
                    return (
                      <li key={link}>
                        <Link
                          href={`/${category}/${slug}`}
                          className="text-sm text-[#FFFFFF]/35 transition-colors hover:text-[#FFFFFF]/70"
                          style={{ fontFamily: "var(--font-lora)" }}
                        >
                          {link}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-[#FFFFFF]/6">
          <div className="max-w-6xl mx-auto px-6 py-5 flex flex-col md:flex-row items-center justify-between gap-3">
            <p
              className="text-xs text-[#FFFFFF]/25"
              style={{ fontFamily: "var(--font-lora)" }}
            >
              {s.copyright}
            </p>
            <div className="flex items-center gap-4">
              <a
                href="#"
                className="text-xs text-[#FFFFFF]/25 transition-colors hover:text-[#FFFFFF]/50"
                style={{ fontFamily: "var(--font-lora)" }}
              >
                {s.returnPolicy}
              </a>
              <span className="text-[#FFFFFF]/10">·</span>
              <a
                href="#"
                className="text-xs text-[#FFFFFF]/25 transition-colors hover:text-[#FFFFFF]/50"
                style={{ fontFamily: "var(--font-lora)" }}
              >
                {s.privacy}
              </a>
              <span className="text-[#FFFFFF]/10">·</span>
              <span
                className="text-xs text-[#FFFFFF]/15"
                style={{ fontFamily: "var(--font-montserrat)" }}
              >
                {s.partner}
              </span>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
