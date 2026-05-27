"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { useState } from "react";

const navText = {
  fr: {
    brand: "La Marque",
    products: "Produits",
    mission: "Notre Raison d'Être",
    contact: "Contact",
    findUs: "Où nous trouver",
    pro: "Espace Pro",
  },
  en: {
    brand: "The Brand",
    products: "Products",
    mission: "Our Mission",
    contact: "Contact",
    findUs: "Where to Find Us",
    pro: "Trade Portal",
  },
  hi: {
    brand: "ब्रांड",
    products: "उत्पाद",
    mission: "हमारा मिशन",
    contact: "संपर्क",
    findUs: "हमें खोजें",
    pro: "व्यापार पोर्टल",
  },
};

export default function Navbar() {
  const { lang, setLang } = useLanguage();
  const s = navText[lang as keyof typeof navText] || navText.fr;
  const [mobileOpen, setMobileOpen] = useState(false);

  const toggleLang = () => {
    if (lang === "fr") setLang("en");
    else if (lang === "en") setLang("hi");
    else setLang("fr");
  };

  return (
    <header
      className="fixed top-[36px] left-0 right-0 z-[40] w-full flex justify-between items-center px-6 md:px-12 py-3 backdrop-blur-md border-b border-[#111111]/5 transition-all"
      style={{
        background:
          "linear-gradient(180deg, rgba(245, 230, 211, 0.95) 0%, rgba(245, 230, 211, 0.85) 100%)",
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.2 }}
      >
        <Link href="/">
          <h2
            className="text-xl tracking-widest uppercase text-[#1C1C1C] font-semibold cursor-pointer"
            style={{ fontFamily: "var(--font-didot)" }}
          >
            AÉRI
          </h2>
        </Link>
      </motion.div>

      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.3 }}
        className="hidden md:flex items-center gap-6 text-xs tracking-widest uppercase font-medium text-[#1C1C1C]/70"
        style={{ fontFamily: "var(--font-montserrat)" }}
      >
        <Link href="/brand" className="hover:text-[#1C1C1C] transition-colors">
          {s.brand}
        </Link>
        <Link href="/products" className="hover:text-[#1C1C1C] transition-colors">
          {s.products}
        </Link>
        <Link href="/ou-nous-trouver" className="hover:text-[#1C1C1C] transition-colors">
          {s.findUs}
        </Link>
        <Link href="/mission" className="hover:text-[#1C1C1C] transition-colors">
          {s.mission}
        </Link>
        <Link href="/espace-pro" className="hover:text-[#1C1C1C] transition-colors">
          {s.pro}
        </Link>
        <Link href="/contact" className="hover:text-[#1C1C1C] transition-colors">
          {s.contact}
        </Link>

        {/* Language Toggle */}
        <button
          onClick={toggleLang}
          className="ml-3 px-3 py-1.5 rounded-full border border-[#D4AF37]/40 bg-[#D4AF37]/10 text-[10px] font-bold tracking-[0.15em] uppercase text-[#D4AF37] hover:bg-[#D4AF37]/20 transition-all cursor-pointer"
          style={{ fontFamily: "var(--font-montserrat)" }}
        >
          {lang === "fr" ? "FR" : lang === "en" ? "EN" : "HI"}
        </button>
      </motion.nav>

      {/* Mobile Menu Button */}
      <div className="md:hidden flex items-center gap-3">
        <button
          onClick={toggleLang}
          className="px-2.5 py-1 rounded-full border border-[#D4AF37]/40 bg-[#D4AF37]/10 text-[10px] font-bold tracking-[0.15em] uppercase text-[#D4AF37] cursor-pointer"
          style={{ fontFamily: "var(--font-montserrat)" }}
        >
          {lang === "fr" ? "FR" : lang === "en" ? "EN" : "HI"}
        </button>
        <button 
          onClick={() => setMobileOpen(!mobileOpen)}
          className="p-2 text-[#1C1C1C] cursor-pointer"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            {mobileOpen ? (
              <><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></>
            ) : (
              <><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="18" x2="21" y2="18" /></>
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute top-full left-0 right-0 bg-[#F5E6D3]/98 backdrop-blur-lg border-b border-[#1C1C1C]/10 py-6 px-6 flex flex-col gap-4 md:hidden"
          style={{ fontFamily: "var(--font-montserrat)" }}
        >
          <Link href="/brand" onClick={() => setMobileOpen(false)} className="text-xs tracking-widest uppercase font-medium text-[#1C1C1C]/70 hover:text-[#1C1C1C]">{s.brand}</Link>
          <Link href="/products" onClick={() => setMobileOpen(false)} className="text-xs tracking-widest uppercase font-medium text-[#1C1C1C]/70 hover:text-[#1C1C1C]">{s.products}</Link>
          <Link href="/ou-nous-trouver" onClick={() => setMobileOpen(false)} className="text-xs tracking-widest uppercase font-medium text-[#1C1C1C]/70 hover:text-[#1C1C1C]">{s.findUs}</Link>
          <Link href="/mission" onClick={() => setMobileOpen(false)} className="text-xs tracking-widest uppercase font-medium text-[#1C1C1C]/70 hover:text-[#1C1C1C]">{s.mission}</Link>
          <Link href="/espace-pro" onClick={() => setMobileOpen(false)} className="text-xs tracking-widest uppercase font-medium text-[#1C1C1C]/70 hover:text-[#1C1C1C]">{s.pro}</Link>
          <Link href="/contact" onClick={() => setMobileOpen(false)} className="text-xs tracking-widest uppercase font-medium text-[#1C1C1C]/70 hover:text-[#1C1C1C]">{s.contact}</Link>
        </motion.div>
      )}
    </header>
  );
}
