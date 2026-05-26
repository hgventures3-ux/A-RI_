"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import t from "@/translations";

export default function Navbar() {
  const { lang } = useLanguage();
  const s = t.hero[lang];

  return (
    <header
      className="fixed top-0 left-0 right-0 z-[40] w-full flex justify-between items-center px-6 md:px-12 py-3 backdrop-blur-md border-b border-[#111111]/5 transition-all"
      style={{
        background:
          "linear-gradient(180deg, rgba(253, 248, 240, 0.95) 0%, rgba(253, 248, 240, 0.85) 100%)",
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.2 }}
      >
        <Link href="/">
          <h2
            className="text-xl tracking-widest uppercase text-[#111111] font-semibold cursor-pointer"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            AÉRI
          </h2>
        </Link>
      </motion.div>

      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.3 }}
        className="hidden md:flex gap-8 text-xs tracking-widest uppercase font-medium text-[#111111]/70"
      >
        <Link href="/brand" className="hover:text-[#111111] transition-colors">
          {s.nav.brand}
        </Link>
        <Link
          href="/products"
          className="hover:text-[#111111] transition-colors"
        >
          {s.nav.products}
        </Link>
        <Link
          href="/contact"
          className="hover:text-[#111111] transition-colors"
        >
          {s.nav.contact}
        </Link>
      </motion.nav>
    </header>
  );
}
