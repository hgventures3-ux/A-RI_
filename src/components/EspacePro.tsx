"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import t from "@/translations";
import Footer from "@/components/Footer";

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

  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
    siret: "",
    channel: "",
    volume: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
    setFormData({ name: "", company: "", email: "", siret: "", channel: "", volume: "", message: "" });
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

          {/* ── Modi Endorsement — B2B Only ── */}
          <div className="max-w-4xl mx-auto px-6 mb-16 md:mb-24">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.7 }}
              className="relative p-8 md:p-12 rounded-2xl bg-[#111111] text-center"
            >
              <h3
                className="text-lg md:text-xl font-bold text-white/90 mb-6"
                style={{ fontFamily: "var(--font-didot)" }}
              >
                Un Super-aliment Reconnu par la Leadership Nationale
              </h3>

              <p
                className="text-base md:text-lg text-[#FFFFFF]/70 leading-relaxed max-w-2xl mx-auto mb-6"
                style={{ fontFamily: "var(--font-lora)" }}
              >
                Reconnu comme un super-aliment essentiel par les leaders de la santé en Inde, le Makhana fait désormais partie du quotidien de millions de personnes.
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
                    style={{ fontFamily: "var(--font-didot)" }}
                  >
                    Demande Professionnelle
                  </h4>
                  <p
                    className="text-xs text-[#111111]/40 mb-6"
                    style={{ fontFamily: "var(--font-montserrat)" }}
                  >
                    Nous répondons sous 24h ouvrées.
                  </p>

                  <div className="space-y-4">
                    {/* Nom complet */}
                    <div>
                      <label className="block text-xs font-semibold tracking-wide uppercase text-[#111111]/50 mb-1.5" style={{ fontFamily: "var(--font-montserrat)" }}>
                        Nom complet
                      </label>
                      <input type="text" required value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} placeholder="Votre nom complet" className="w-full px-4 py-3 rounded-xl bg-[#FFFFFF]/30 border border-[#111111]/8 text-sm text-[#111111] placeholder:text-[#111111]/25 focus:outline-none focus:border-[#111111]/25 focus:ring-1 focus:ring-[#111111]/10 transition-all" style={{ fontFamily: "var(--font-montserrat)" }} />
                    </div>

                    {/* Nom de l'entreprise */}
                    <div>
                      <label className="block text-xs font-semibold tracking-wide uppercase text-[#111111]/50 mb-1.5" style={{ fontFamily: "var(--font-montserrat)" }}>
                        Nom de l&apos;entreprise
                      </label>
                      <input type="text" required value={formData.company} onChange={(e) => setFormData({ ...formData, company: e.target.value })} placeholder="Nom de votre entreprise" className="w-full px-4 py-3 rounded-xl bg-[#FFFFFF]/30 border border-[#111111]/8 text-sm text-[#111111] placeholder:text-[#111111]/25 focus:outline-none focus:border-[#111111]/25 focus:ring-1 focus:ring-[#111111]/10 transition-all" style={{ fontFamily: "var(--font-montserrat)" }} />
                    </div>

                    {/* E-mail professionnel */}
                    <div>
                      <label className="block text-xs font-semibold tracking-wide uppercase text-[#111111]/50 mb-1.5" style={{ fontFamily: "var(--font-montserrat)" }}>
                        Adresse e-mail professionnelle
                      </label>
                      <input type="email" required value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} placeholder="pro@entreprise.com" className="w-full px-4 py-3 rounded-xl bg-[#FFFFFF]/30 border border-[#111111]/8 text-sm text-[#111111] placeholder:text-[#111111]/25 focus:outline-none focus:border-[#111111]/25 focus:ring-1 focus:ring-[#111111]/10 transition-all" style={{ fontFamily: "var(--font-montserrat)" }} />
                    </div>

                    {/* SIRET / VAT */}
                    <div>
                      <label className="block text-xs font-semibold tracking-wide uppercase text-[#111111]/50 mb-1.5" style={{ fontFamily: "var(--font-montserrat)" }}>
                        N° SIRET ou TVA intracommunautaire
                      </label>
                      <input type="text" required value={formData.siret} onChange={(e) => setFormData({ ...formData, siret: e.target.value })} placeholder="Ex: 123 456 789 00012" className="w-full px-4 py-3 rounded-xl bg-[#FFFFFF]/30 border border-[#111111]/8 text-sm text-[#111111] placeholder:text-[#111111]/25 focus:outline-none focus:border-[#111111]/25 focus:ring-1 focus:ring-[#111111]/10 transition-all" style={{ fontFamily: "var(--font-montserrat)" }} />
                    </div>

                    {/* Distribution Channels Dropdown */}
                    <div>
                      <label className="block text-xs font-semibold tracking-wide uppercase text-[#111111]/50 mb-1.5" style={{ fontFamily: "var(--font-montserrat)" }}>
                        Canaux de Distribution
                      </label>
                      <select required value={formData.channel} onChange={(e) => setFormData({ ...formData, channel: e.target.value })} className="w-full px-4 py-3 rounded-xl bg-[#FFFFFF]/30 border border-[#111111]/8 text-sm text-[#111111] focus:outline-none focus:border-[#111111]/25 focus:ring-1 focus:ring-[#111111]/10 transition-all" style={{ fontFamily: "var(--font-montserrat)" }}>
                        <option value="">Sélectionnez un canal</option>
                        <option value="grandes-surfaces">Grandes Surfaces</option>
                        <option value="epiceries-fines">Épiceries Fines</option>
                        <option value="reseau-bio">Réseau Bio</option>
                        <option value="grossiste">Grossiste</option>
                        <option value="fitness-gym">Secteur Fitness / Gym</option>
                      </select>
                    </div>

                    {/* Volume Dropdown */}
                    <div>
                      <label className="block text-xs font-semibold tracking-wide uppercase text-[#111111]/50 mb-1.5" style={{ fontFamily: "var(--font-montserrat)" }}>
                        Volume Annuel Estimé (palettes)
                      </label>
                      <select required value={formData.volume} onChange={(e) => setFormData({ ...formData, volume: e.target.value })} className="w-full px-4 py-3 rounded-xl bg-[#FFFFFF]/30 border border-[#111111]/8 text-sm text-[#111111] focus:outline-none focus:border-[#111111]/25 focus:ring-1 focus:ring-[#111111]/10 transition-all" style={{ fontFamily: "var(--font-montserrat)" }}>
                        <option value="">Sélectionnez un volume</option>
                        <option value="1-5">1 – 5 palettes</option>
                        <option value="5-20">5 – 20 palettes</option>
                        <option value="20-50">20 – 50 palettes</option>
                        <option value="50+">50+ palettes</option>
                      </select>
                    </div>

                    {/* Message */}
                    <div>
                      <label className="block text-xs font-semibold tracking-wide uppercase text-[#111111]/50 mb-1.5" style={{ fontFamily: "var(--font-montserrat)" }}>
                        Message et besoins spécifiques
                      </label>
                      <textarea required rows={4} value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} placeholder="Ex. Marque Blanche, Private Label, Référencement national" className="w-full px-4 py-3 rounded-xl bg-[#FFFFFF]/30 border border-[#111111]/8 text-sm text-[#111111] placeholder:text-[#111111]/25 focus:outline-none focus:border-[#111111]/25 focus:ring-1 focus:ring-[#111111]/10 transition-all resize-none" style={{ fontFamily: "var(--font-montserrat)" }} />
                    </div>
                  </div>

                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="mt-6 w-full py-3.5 rounded-xl bg-[#1C1C1C] text-[#FFFFFF] text-sm font-semibold tracking-wide transition-colors hover:bg-[#333] cursor-pointer"
                    style={{ fontFamily: "var(--font-montserrat)" }}
                  >
                    {submitted ? "✓ Demande envoyée !" : "Envoyer la demande"}
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
      <Footer />
    </>
  );
}
