"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";

const pageTranslations = {
  fr: {
    nav: { brand: "La Marque", products: "Produits", contact: "Contact" },
    title: "Contactez-nous",
    subtitle: "Une question, une commande professionnelle ou simplement l'envie de discuter de notre Makhana ? Notre équipe est à votre écoute.",
    formName: "Nom complet",
    formEmail: "Adresse email",
    formSubject: "Sujet",
    formMessage: "Votre message",
    formBtn: "Envoyer le message",
    formSuccess: "✓ Message envoyé avec succès !",
    contactInfo: {
      title: "Nos Coordonnées",
      address: "H&G Ventures Private Limited\n75008 Paris, France",
      email: "bonjour@aeri-snack.com",
      phone: "+33 1 23 45 67 89"
    },
    b2b: {
      title: "Espace Professionnel (B2B)",
      desc: "Vous êtes distributeur, restaurateur ou hôtelier ? AÉRI propose des formats et tarifs adaptés aux professionnels avec une logistique mondiale simplifiée.",
      btn: "Découvrir l'offre B2B"
    }
  },
  en: {
    nav: { brand: "The Brand", products: "Products", contact: "Contact" },
    title: "Contact Us",
    subtitle: "A question, a professional order, or simply want to chat about our Makhana? Our team is here for you.",
    formName: "Full Name",
    formEmail: "Email Address",
    formSubject: "Subject",
    formMessage: "Your message",
    formBtn: "Send Message",
    formSuccess: "✓ Message sent successfully!",
    contactInfo: {
      title: "Our Contact Info",
      address: "H&G Ventures Private Limited\n75008 Paris, France",
      email: "hello@aeri-snack.com",
      phone: "+33 1 23 45 67 89"
    },
    b2b: {
      title: "Professional Portal (B2B)",
      desc: "Are you a distributor, restaurateur, or hotelier? AÉRI offers formats and pricing adapted for professionals with simplified global logistics.",
      btn: "Discover B2B Offer"
    }
  }
};

export default function ContactPage() {
  const { lang } = useLanguage();
  const t = pageTranslations[lang as keyof typeof pageTranslations] || pageTranslations.en;
  
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
  };

  return (
    <main className="min-h-screen bg-[#FFFFFF] text-[#111111] font-sans pb-32">
      {/* Navbar */}
      <header className="fixed top-0 left-0 right-0 z-[40] w-full flex justify-between items-center px-6 md:px-12 py-3 bg-white/80 backdrop-blur-md border-b border-[#111111]/5 transition-all">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.1 }}>
          <Link href="/">
            <h2 className="text-xl tracking-widest uppercase text-[#111111] font-semibold cursor-pointer" style={{ fontFamily: "var(--font-inter)" }}>
              AÉRI
            </h2>
          </Link>
        </motion.div>
        <motion.nav initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.2 }} className="hidden md:flex gap-8 text-xs tracking-widest uppercase font-medium text-[#111111]/70">
          <Link href="/brand" className="hover:text-[#111111] transition-colors">{t.nav.brand}</Link>
          <Link href="/products" className="hover:text-[#111111] transition-colors">{t.nav.products}</Link>
          <Link href="/contact" className="text-[#111111] transition-colors">{t.nav.contact}</Link>
        </motion.nav>
      </header>

      {/* Hero Section */}
      <section className="pt-40 pb-16 px-6 md:px-12 max-w-5xl mx-auto text-center">
        <motion.h1 
          initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}
          className="text-5xl md:text-7xl font-bold tracking-tight mb-6"
        >
          {t.title}
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 0.3 }}
          className="text-lg md:text-xl text-[#6E6E73] max-w-3xl mx-auto leading-relaxed"
        >
          {t.subtitle}
        </motion.p>
      </section>

      {/* Main Content Grid */}
      <section className="px-6 md:px-12 max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-[1fr_400px] gap-12 md:gap-20">
        
        {/* Contact Form */}
        <motion.div 
          initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.2 }}
          className="bg-[#F5F5F7] p-8 md:p-12 rounded-3xl"
        >
          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-[#6E6E73]">{t.formName}</label>
                <input required type="text" className="px-4 py-3 rounded-xl bg-white border border-[#111111]/10 focus:outline-none focus:ring-1 focus:ring-[#111111]/30 transition-all text-[#111111]" />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-[#6E6E73]">{t.formEmail}</label>
                <input required type="email" className="px-4 py-3 rounded-xl bg-white border border-[#111111]/10 focus:outline-none focus:ring-1 focus:ring-[#111111]/30 transition-all text-[#111111]" />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-[#6E6E73]">{t.formSubject}</label>
              <input required type="text" className="px-4 py-3 rounded-xl bg-white border border-[#111111]/10 focus:outline-none focus:ring-1 focus:ring-[#111111]/30 transition-all text-[#111111]" />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-[#6E6E73]">{t.formMessage}</label>
              <textarea required rows={6} className="px-4 py-3 rounded-xl bg-white border border-[#111111]/10 focus:outline-none focus:ring-1 focus:ring-[#111111]/30 transition-all text-[#111111] resize-none" />
            </div>
            <button type="submit" className="mt-4 px-8 py-4 bg-[#111111] text-white rounded-2xl font-medium tracking-wide hover:bg-[#111111]/80 transition-colors shadow-md">
              {submitted ? t.formSuccess : t.formBtn}
            </button>
          </form>
        </motion.div>

        {/* Sidebar Info */}
        <motion.div 
          initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.4 }}
          className="flex flex-col gap-12"
        >
          {/* Info Block */}
          <div>
            <h3 className="text-2xl font-bold mb-6 text-[#111111]">{t.contactInfo.title}</h3>
            <div className="flex flex-col gap-4 text-[#6E6E73] text-lg">
              <p className="whitespace-pre-line leading-relaxed">{t.contactInfo.address}</p>
              <a href={`mailto:${t.contactInfo.email}`} className="text-[#111111] hover:underline transition-all">{t.contactInfo.email}</a>
              <p>{t.contactInfo.phone}</p>
            </div>
          </div>

          {/* B2B Block */}
          <div className="p-8 border border-[#111111]/10 rounded-3xl bg-white shadow-sm">
            <h4 className="text-xl font-bold mb-4 text-[#111111]">{t.b2b.title}</h4>
            <p className="text-[#6E6E73] leading-relaxed mb-6">
              {t.b2b.desc}
            </p>
            <Link href="/#about" className="inline-block font-semibold text-[#111111] underline underline-offset-4 hover:opacity-70 transition-opacity">
              {t.b2b.btn}
            </Link>
          </div>
        </motion.div>

      </section>
    </main>
  );
}
