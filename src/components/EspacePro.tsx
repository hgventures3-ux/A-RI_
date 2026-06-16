"use client";

import React, { useRef, useState, useEffect } from "react";
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
   Modi Video Sub-Component (B2B-only embed)
   ──────────────────────────────────────────────────────── */
function ModiVideoBlock() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMuted, setIsMuted] = useState(true);
  const [inView, setInView] = useState(false);
  const { lang } = useLanguage();
  const isFrench = lang === 'fr';

  // इनटरसेक्शन ऑब्ज़र्वर से व्यूपोर्ट डिटेक्शन
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // व्यूपोर्ट के आधार पर प्ले/पॉज़ कंट्रोल
  useEffect(() => {
    if (!videoRef.current) return;
    if (inView) {
      videoRef.current.play().catch(() => { });
    } else {
      videoRef.current.pause();
    }
  }, [inView]);

  return (
    <div ref={containerRef} className="relative group">
      <video
        ref={videoRef}
        src="https://res.cloudinary.com/di5bjgkbl/video/upload/v1779085860/WhatsApp_Video_2026-05-11_at_11.33.38_PM_aft9q4.mp4"
        muted={isMuted}
        loop
        playsInline
        className="w-full h-auto object-contain block max-h-[360px]"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#1C1C1C]/80 via-transparent to-transparent pointer-events-none" />
      {/* म्यूट टॉगल बटन */}
      <button
        onClick={() => setIsMuted(!isMuted)}
        className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 md:opacity-100 transition-all hover:scale-110"
        aria-label="Toggle sound"
      >
        {isMuted ? (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" /><line x1="23" y1="9" x2="17" y2="15" /><line x1="17" y1="9" x2="23" y2="15" /></svg>
        ) : (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" /><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07" /></svg>
        )}
      </button>
      <div className="absolute bottom-4 left-4">
        <span className="inline-flex items-center px-3 py-1.5 rounded-full bg-white/15 backdrop-blur-md text-white text-[10px] font-semibold tracking-widest uppercase border border-white/20" style={{ fontFamily: "var(--font-montserrat)" }}>
          {isFrench ? "Déclaration Officielle" : "Official Statement"}
        </span>
      </div>
    </div>
  );
}

/* ────────────────────────────────────────────────────────
   Main Section
   ──────────────────────────────────────────────────────── */
export default function EspacePro() {
  const { lang } = useLanguage();
  const isFrench = lang === 'fr';
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
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const payload = {
        company: formData.company,
        siret: formData.siret,
        contactName: formData.name,
        email: formData.email,
        channel: formData.channel,
        volume: formData.volume,
        notes: formData.message,
      };

      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (data.success) {
        setSubmitted(true);
        setFormData({ name: "", company: "", email: "", siret: "", channel: "", volume: "", message: "" });
        setTimeout(() => setSubmitted(false), 4000);
      } else {
        console.error("Failed to submit Espace Pro form");
      }
    } catch (error) {
      console.error("Error submitting Espace Pro form", error);
    } finally {
      setLoading(false);
    }
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
      <section className="relative w-full overflow-hidden" style={{ background: "#FFFFFF" }}>
        {/* Subtle grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.025] pointer-events-none"
          style={{
            backgroundImage: "linear-gradient(#1C1C1C 1px, transparent 1px), linear-gradient(90deg, #1C1C1C 1px, transparent 1px)",
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
              className="text-4xl md:text-5xl lg:text-7xl font-bold text-[#1C1C1C] mb-6"
              style={{ fontFamily: "var(--font-montserrat)" }}
            >
              {s.title}
            </motion.h2>

            <motion.p
              initial={{ opacity: 0 }}
              animate={headerInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="text-lg md:text-xl text-[#1C1C1C]/55 max-w-2xl mx-auto leading-relaxed"
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
                  className="text-center p-6 rounded-2xl bg-white border border-[#1C1C1C]/6 shadow-sm"
                >
                  <span
                    className="block text-3xl md:text-4xl font-bold text-[#1C1C1C] mb-1"
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
                    className="block text-[11px] text-[#1C1C1C]/35"
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
                  className="group p-7 rounded-2xl bg-white border border-[#1C1C1C]/6 transition-all duration-400 hover:shadow-lg hover:border-[#1C1C1C]/12"
                >
                  <div className="w-12 h-12 text-[#1C1C1C]/60 mb-5 transition-colors group-hover:text-[#1C1C1C]">
                    {svc.icon}
                  </div>
                  <h4
                    className="text-lg font-bold text-[#1C1C1C] mb-2"
                    style={{ fontFamily: "var(--font-montserrat)" }}
                  >
                    {svc.title}
                  </h4>
                  <p
                    className="text-sm text-[#1C1C1C]/50 leading-relaxed"
                    style={{ fontFamily: "var(--font-lora)" }}
                  >
                    {svc.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* ── Certification Moat ── */}
          <div className="max-w-5xl mx-auto px-6 mb-16 md:mb-24">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-10"
            >
              <span className="inline-block text-xs font-semibold tracking-[0.4em] uppercase text-[#6E6E73] mb-3" style={{ fontFamily: "var(--font-montserrat)" }}>
                {isFrench ? "Transparence & Conformité" : "Transparency & Compliance"}
              </span>
              <h3 className="text-2xl md:text-3xl font-bold text-[#1C1C1C]" style={{ fontFamily: "var(--font-montserrat)" }}>
                {isFrench ? "Notre Moat de Certification" : "Our Certification Moat"}
              </h3>
              <p className="text-sm text-[#1C1C1C]/50 mt-2 max-w-xl mx-auto" style={{ fontFamily: "var(--font-montserrat)" }}>
                {isFrench ? "Rapports NABL indépendants & conformité corporate disponibles en téléchargement immédiat." : "Independent NABL reports & corporate compliance available for immediate download."}
              </p>
            </motion.div>

            {/* NABL Lab Reports */}
            <p className="text-[10px] font-bold tracking-[0.35em] uppercase text-[#6E6E73] mb-4" style={{ fontFamily: "var(--font-montserrat)" }}>
              {isFrench ? "Rapports de Laboratoire NABL" : "NABL Lab Reports"}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              {[
                { icon: "🧪", title: isFrench ? "Résidus EtO" : "EtO Residues", desc: isFrench ? "Analyse complète Oxyde d'Éthylène — conformité UE 2020/1088" : "Complete Ethylene Oxide analysis — EU 2020/1088 compliance", file: "nabl-eto-report.pdf" },
                { icon: "⚗️", title: isFrench ? "Métaux Lourds" : "Heavy Metals", desc: isFrench ? "Plomb, Cadmium, Arsenic, Mercure — en dessous des seuils EU" : "Lead, Cadmium, Arsenic, Mercury — below EU thresholds", file: "nabl-heavy-metals.pdf" },
                { icon: "🔬", title: isFrench ? "Microbiologie" : "Microbiology", desc: isFrench ? "E.Coli, Salmonella, Listeria, Coliformes totaux — négatifs" : "E.Coli, Salmonella, Listeria, Total Coliforms — negative", file: "nabl-microbiology.pdf" },
                { icon: "🌿", title: isFrench ? "Pesticides" : "Pesticides", desc: isFrench ? "Panel 500+ molécules — zéro résidu détectable" : "Panel 500+ molecules — zero detectable residue", file: "nabl-pesticides.pdf" },
              ].map((cert, i) => (
                <motion.div
                  key={cert.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                  className="group p-5 rounded-2xl bg-white border border-[#1C1C1C]/6 hover:shadow-lg hover:border-[#1C1C1C]/15 transition-all duration-300"
                >
                  <span className="text-3xl mb-3 block">{cert.icon}</span>
                  <h5 className="text-sm font-bold text-[#1C1C1C] mb-1" style={{ fontFamily: "var(--font-montserrat)" }}>{cert.title}</h5>
                  <p className="text-[11px] text-[#1C1C1C]/45 leading-relaxed mb-4" style={{ fontFamily: "var(--font-montserrat)" }}>{cert.desc}</p>
                  <a
                    href={`/docs/${cert.file}`}
                    download
                    className="inline-flex items-center gap-1.5 text-[10px] font-bold tracking-wider uppercase text-[#1C1C1C] border border-[#1C1C1C]/15 rounded-lg px-3 py-2 hover:bg-[#1C1C1C] hover:text-white transition-all duration-200"
                    style={{ fontFamily: "var(--font-montserrat)" }}
                  >
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" /></svg>
                    {isFrench ? "Télécharger PDF" : "Download PDF"}
                  </a>
                </motion.div>
              ))}
            </div>

            {/* Corporate Compliance */}
            <p className="text-[10px] font-bold tracking-[0.35em] uppercase text-[#6E6E73] mb-4" style={{ fontFamily: "var(--font-montserrat)" }}>
              {isFrench ? "Conformité Corporate" : "Corporate Compliance"}
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { badge: "FSSAI", label: isFrench ? "Sécurité Alimentaire" : "Food Safety", desc: isFrench ? "N° Lic. 10019052000041" : "Lic. No. 10019052000041", file: "fssai-certificate.pdf" },
                { badge: "IEC", label: "Import Export", desc: isFrench ? "Code IEC homologué DGFT" : "DGFT approved IEC code", file: "iec-certificate.pdf" },
                { badge: "APEDA", label: "Export Agri", desc: isFrench ? "Exportateur certifié APEDA" : "APEDA certified exporter", file: "apeda-certificate.pdf" },
                { badge: "STARTUP", label: "Startup India", desc: "DPIIT Recognized Entity", file: "startup-india-certificate.pdf" },
              ].map((cred, i) => (
                <motion.div
                  key={cred.badge}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.07 }}
                  className="group p-4 rounded-2xl bg-[#1C1C1C] text-white hover:bg-[#222] transition-all duration-300 flex flex-col"
                >
                  <span className="text-xs font-black tracking-[0.25em] text-[#D4AF37] mb-1" style={{ fontFamily: "var(--font-montserrat)" }}>{cred.badge}</span>
                  <span className="text-[10px] font-semibold text-white/60 uppercase tracking-wider mb-2" style={{ fontFamily: "var(--font-montserrat)" }}>{cred.label}</span>
                  <p className="text-[11px] text-white/40 leading-relaxed mb-4 flex-1" style={{ fontFamily: "var(--font-montserrat)" }}>{cred.desc}</p>
                  <a
                    href={`/docs/${cred.file}`}
                    download
                    className="inline-flex items-center gap-1.5 text-[10px] font-bold tracking-wider uppercase text-[#D4AF37] border border-[#D4AF37]/30 rounded-lg px-3 py-2 hover:bg-[#D4AF37] hover:text-[#1C1C1C] transition-all duration-200"
                    style={{ fontFamily: "var(--font-montserrat)" }}
                  >
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" /></svg>
                    Télécharger
                  </a>
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
              className="relative rounded-2xl overflow-hidden bg-[#1C1C1C]"
            >
              {/* Video */}
              <ModiVideoBlock />
              {/* Text overlay */}
              <div className="p-8 md:p-10 text-center">
                <h3
                  className="text-lg md:text-xl font-bold text-[#FFFFFF] mb-4"
                  style={{ fontFamily: "var(--font-didot)" }}
                >
                  Un Super-aliment Reconnu par la Leadership Nationale
                </h3>
                <p
                  className="text-sm md:text-base text-[#FFFFFF]/80 leading-relaxed max-w-2xl mx-auto mb-8"
                  style={{ fontFamily: "var(--font-montserrat)" }}
                >
                  Reconnu comme un super-aliment essentiel par les leaders de la santé en Inde, le Makhana fait désormais partie du quotidien de millions de personnes.
                </p>
                <div className="flex flex-col items-center justify-center border-t border-white/10 pt-8 mt-4">
                  <span className="text-2xl md:text-4xl text-[#D4AF37] mb-4 block" style={{ fontFamily: "var(--font-lora), serif", fontStyle: "italic" }}>
                    "365 दिन में से 300 दिन मैं मखाना जरूर खाता हूं"
                  </span>
                  <span className="text-sm md:text-base text-[#FFFFFF]/60 block mb-6" style={{ fontFamily: "var(--font-montserrat)" }}>
                    "300 jours sur 365, je consomme invariablement du Makhana."
                  </span>
                  <div className="flex items-center justify-center gap-3">
                    <div className="w-8 h-[1px] bg-[#FFFFFF]/30" />
                    <span
                      className="text-xs font-semibold text-[#D4AF37] tracking-widest uppercase"
                      style={{ fontFamily: "var(--font-montserrat)" }}
                    >
                      Narendra Modi — Premier Ministre de l'Inde
                    </span>
                    <div className="w-8 h-[1px] bg-[#FFFFFF]/30" />
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* ── CTA + Form ── */}
          <div
            id="demande-professionnelle"
            ref={formRef}
            className="max-w-5xl mx-auto scroll-mt-28 px-6"
          >
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
                  className="text-2xl md:text-3xl font-bold text-[#1C1C1C] mb-4 leading-snug"
                  style={{ fontFamily: "var(--font-montserrat)" }}
                >
                  {s.docTitle1}
                  <br />
                  <span className="text-[#6E6E73]">{s.docTitle2}</span>
                </h3>

                <p
                  className="text-base text-[#1C1C1C]/55 leading-relaxed mb-8"
                  style={{ fontFamily: "var(--font-lora)" }}
                >
                  {s.docBody}
                </p>

                <div className="flex flex-col sm:flex-row gap-3">
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className="inline-flex items-center justify-center gap-3 px-6 py-3.5 rounded-xl bg-[#1C1C1C] text-[#FFFFFF] text-sm font-semibold tracking-wide transition-colors hover:bg-[#1C1C1C]/90 cursor-pointer"
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
                    className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-transparent text-[#1C1C1C] text-sm font-semibold tracking-wide border border-[#1C1C1C]/15 transition-colors hover:bg-[#1C1C1C]/5 cursor-pointer"
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
                  className="p-7 md:p-9 rounded-2xl bg-white border border-[#1C1C1C]/10 shadow-sm"
                >
                  <h4
                    className="text-lg font-bold text-[#1C1C1C] mb-1"
                    style={{ fontFamily: "var(--font-didot)" }}
                  >
                    Demande Professionnelle
                  </h4>
                  <p
                    className="text-xs text-[#1C1C1C]/40 mb-6"
                    style={{ fontFamily: "var(--font-montserrat)" }}
                  >
                    Nous répondons sous 24h ouvrées.
                  </p>

                  <div className="space-y-4">
                    {/* Nom complet */}
                    <div>
                      <label className="block text-xs font-semibold tracking-wide uppercase text-[#1C1C1C]/60 mb-1.5" style={{ fontFamily: "var(--font-montserrat)" }}>
                        Nom complet *
                      </label>
                      <input type="text" required value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} placeholder="Votre nom complet" className="w-full px-4 py-3 rounded-xl bg-[#F7F7F7] border border-[#1C1C1C]/10 text-sm text-[#1C1C1C] placeholder:text-[#1C1C1C]/30 focus:outline-none focus:border-[#1C1C1C]/40 focus:ring-1 focus:ring-[#1C1C1C]/20 transition-all" style={{ fontFamily: "var(--font-montserrat)" }} />
                    </div>

                    {/* Nom de l'entreprise */}
                    <div>
                      <label className="block text-xs font-semibold tracking-wide uppercase text-[#1C1C1C]/60 mb-1.5" style={{ fontFamily: "var(--font-montserrat)" }}>
                        Nom de l'entreprise *
                      </label>
                      <input type="text" required value={formData.company} onChange={(e) => setFormData({ ...formData, company: e.target.value })} placeholder="Nom de votre entreprise" className="w-full px-4 py-3 rounded-xl bg-[#F7F7F7] border border-[#1C1C1C]/10 text-sm text-[#1C1C1C] placeholder:text-[#1C1C1C]/30 focus:outline-none focus:border-[#1C1C1C]/40 focus:ring-1 focus:ring-[#1C1C1C]/20 transition-all" style={{ fontFamily: "var(--font-montserrat)" }} />
                    </div>

                    {/* E-mail professionnel */}
                    <div>
                      <label className="block text-xs font-semibold tracking-wide uppercase text-[#1C1C1C]/60 mb-1.5" style={{ fontFamily: "var(--font-montserrat)" }}>
                        Adresse e-mail professionnelle *
                      </label>
                      <input type="email" required value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} placeholder="pro@entreprise.com" className="w-full px-4 py-3 rounded-xl bg-[#F7F7F7] border border-[#1C1C1C]/10 text-sm text-[#1C1C1C] placeholder:text-[#1C1C1C]/30 focus:outline-none focus:border-[#1C1C1C]/40 focus:ring-1 focus:ring-[#1C1C1C]/20 transition-all" style={{ fontFamily: "var(--font-montserrat)" }} />
                    </div>

                    {/* SIRET / VAT */}
                    <div>
                      <label className="block text-xs font-semibold tracking-wide uppercase text-[#1C1C1C]/60 mb-1.5" style={{ fontFamily: "var(--font-montserrat)" }}>
                        N° SIRET ou TVA Intracommunautaire *
                      </label>
                      <input type="text" required value={formData.siret} onChange={(e) => setFormData({ ...formData, siret: e.target.value })} placeholder="Ex: 123 456 789 00012" className="w-full px-4 py-3 rounded-xl bg-[#F7F7F7] border border-[#1C1C1C]/10 text-sm text-[#1C1C1C] placeholder:text-[#1C1C1C]/30 focus:outline-none focus:border-[#1C1C1C]/40 focus:ring-1 focus:ring-[#1C1C1C]/20 transition-all" style={{ fontFamily: "var(--font-montserrat)" }} />
                    </div>

                    {/* Distribution Channels Dropdown */}
                    <div>
                      <label className="block text-xs font-semibold tracking-wide uppercase text-[#1C1C1C]/60 mb-1.5" style={{ fontFamily: "var(--font-montserrat)" }}>
                        Canaux de Distribution
                      </label>
                      <select required value={formData.channel} onChange={(e) => setFormData({ ...formData, channel: e.target.value })} className="w-full px-4 py-3 rounded-xl bg-[#F7F7F7] border border-[#1C1C1C]/10 text-sm text-[#1C1C1C] focus:outline-none focus:border-[#1C1C1C]/40 focus:ring-1 focus:ring-[#1C1C1C]/20 transition-all" style={{ fontFamily: "var(--font-montserrat)" }}>
                        <option value="">Sélectionnez un canal</option>
                        <option value="Grandes Surfaces">Grandes Surfaces</option>
                        <option value="Épiceries Fines">Épiceries Fines</option>
                        <option value="Réseau Bio">Réseau Bio</option>
                        <option value="Grossiste">Grossiste</option>
                        <option value="Secteur Fitness-Gym">Secteur Fitness-Gym</option>
                      </select>
                    </div>

                    {/* Volume Dropdown */}
                    <div>
                      <label className="block text-xs font-semibold tracking-wide uppercase text-[#1C1C1C]/60 mb-1.5" style={{ fontFamily: "var(--font-montserrat)" }}>
                        Volume Annuel Estimé
                      </label>
                      <select required value={formData.volume} onChange={(e) => setFormData({ ...formData, volume: e.target.value })} className="w-full px-4 py-3 rounded-xl bg-[#F7F7F7] border border-[#1C1C1C]/10 text-sm text-[#1C1C1C] focus:outline-none focus:border-[#1C1C1C]/40 focus:ring-1 focus:ring-[#1C1C1C]/20 transition-all" style={{ fontFamily: "var(--font-montserrat)" }}>
                        <option value="">Sélectionnez un volume</option>
                        <option value="1-5 palettes">1–5 palettes</option>
                        <option value="5-20 palettes">5–20 palettes</option>
                        <option value="20-50 palettes">20–50 palettes</option>
                        <option value="50+ palettes">50+ palettes</option>
                      </select>
                    </div>

                    {/* Message */}
                    <div>
                      <label className="block text-xs font-semibold tracking-wide uppercase text-[#1C1C1C]/60 mb-1.5" style={{ fontFamily: "var(--font-montserrat)" }}>
                        Votre Message / Besoins Spécifiques
                      </label>
                      <textarea required rows={4} value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} placeholder="ex. Marque Blanche, Private Label, Référencement national." className="w-full px-4 py-3 rounded-xl bg-[#F7F7F7] border border-[#1C1C1C]/10 text-sm text-[#1C1C1C] placeholder:text-[#1C1C1C]/30 focus:outline-none focus:border-[#1C1C1C]/40 focus:ring-1 focus:ring-[#1C1C1C]/20 transition-all resize-none" style={{ fontFamily: "var(--font-montserrat)" }} />
                    </div>
                  </div>

                  <motion.button
                    type="submit"
                    disabled={loading}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="mt-6 w-full py-3.5 rounded-xl bg-[#1C1C1C] text-[#FFFFFF] text-sm font-semibold tracking-wide transition-colors hover:bg-[#333] cursor-pointer disabled:opacity-70 flex justify-center text-center"
                    style={{ fontFamily: "var(--font-montserrat)" }}
                  >
                    {loading ? "..." : submitted ? "✓ Demande envoyée !" : "Demander une Cotation / Fiche Technique"}
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
