"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import t from "@/translations";
import { useEffect } from "react";

export default function InstagramFeed() {
  const { lang } = useLanguage();
  const title = lang === "fr" ? "Rejoignez-nous sur Instagram" : lang === "hi" ? "इंस्टाग्राम पर जुड़ें" : "Join us on Instagram";
  const subtitle = lang === "fr" ? "@aeri.makhana" : "@aeri.makhana";

  useEffect(() => {
    // Dynamically load the Elfsight script for the Instagram feed
    const script = document.createElement("script");
    script.src = "https://static.elfsight.com/platform/platform.js";
    script.setAttribute("data-use-service-core", "");
    script.defer = true;
    document.body.appendChild(script);

    return () => {
      // Cleanup script if component unmounts
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  return (
    <section className="py-20 md:py-28 bg-white relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.7 }}
          className="mb-12"
        >
          <h2
            className="text-3xl md:text-5xl font-semibold tracking-tight text-[#1D1B1A] mb-4"
            style={{ fontFamily: "var(--font-didot)" }}
          >
            {title}
          </h2>
          <a
            href="https://www.instagram.com/aeri.makhana/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm md:text-base font-semibold text-[#6C6257] hover:text-[#1D1B1A] transition-colors uppercase tracking-[0.2em]"
            style={{ fontFamily: "var(--font-montserrat)" }}
          >
            {subtitle}
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="w-full min-h-[400px] flex items-center justify-center bg-stone-50 rounded-2xl border border-stone-200 p-4"
        >
          {/* Elfsight Instagram Feed Widget */}
          {/* Note: The client needs to replace this placeholder ID with their actual Elfsight widget ID */}
          <div className="elfsight-app-placeholder-id-here w-full h-full min-h-[300px] flex flex-col items-center justify-center text-center">
             <p className="text-stone-400 text-sm mb-2" style={{ fontFamily: "var(--font-montserrat)" }}>
               [Instagram Feed Widget Placeholder]
             </p>
             <p className="text-stone-400 text-xs max-w-md mx-auto" style={{ fontFamily: "var(--font-montserrat)" }}>
               Please create a free widget at Elfsight.com or LightWidget.com and replace the placeholder class in `src/components/InstagramFeed.tsx`.
             </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
