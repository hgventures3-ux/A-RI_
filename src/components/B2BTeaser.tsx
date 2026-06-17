"use client";

import { useLanguage } from "@/context/LanguageContext";
import { motion } from "framer-motion";
import Link from "next/link";

export default function B2BTeaser() {
  const { lang } = useLanguage();

  const texts = {
    fr: {
      title: "Vous êtes professionnel ?",
      body: "Épiceries fines, grossistes, importateurs — découvrez nos conditions tarifaires et notre dossier de conformité complet.",
      button: "Découvrir l'Espace Professionnel →"
    },
    en: {
      title: "Are you a professional?",
      body: "Delicatessens, wholesalers, importers — discover our pricing conditions and complete compliance dossier.",
      button: "Discover the Pro Portal →"
    },
    hi: {
      title: "क्या आप एक पेशेवर हैं?",
      body: "डेलिकेटेसन, थोक व्यापारी, आयातक — हमारी मूल्य निर्धारण शर्तें और संपूर्ण अनुपालन दस्तावेज़ खोजें।",
      button: "प्रो पोर्टल देखें →"
    }
  };

  const t = texts[lang as keyof typeof texts] || texts.fr;

  return (
    <section className="py-24 px-4 bg-[#FAF8F5] flex justify-center">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="max-w-4xl w-full bg-[#1C1C1C] text-[#FAF8F5] rounded-3xl p-12 md:p-16 text-center shadow-xl border border-[#333]"
      >
        <h2 
          className="text-3xl md:text-5xl font-bold mb-6"
          style={{ fontFamily: "var(--font-didot), serif" }}
        >
          {t.title}
        </h2>
        <p 
          className="text-base md:text-lg opacity-80 mb-10 max-w-2xl mx-auto"
          style={{ fontFamily: "var(--font-montserrat), sans-serif", lineHeight: "1.6" }}
        >
          {t.body}
        </p>
        <Link href="/espace-pro">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 bg-[#FAF8F5] text-[#1C1C1C] font-semibold text-sm tracking-widest uppercase rounded-full hover:bg-white transition-colors shadow-md"
            style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
          >
            {t.button}
          </motion.button>
        </Link>
      </motion.div>
    </section>
  );
}
