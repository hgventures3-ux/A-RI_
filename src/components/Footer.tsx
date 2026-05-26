"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import t from "@/translations";
import { useState } from "react";

export default function Footer() {
  const { lang } = useLanguage();
  const s = t.pro[lang];
  const [email, setEmail] = useState("");

  return (
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
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
                  <span
                    className="text-[10px] font-bold"
                    style={{ fontFamily: "var(--font-montserrat)" }}
                  >
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
                  const slug = link
                    .normalize("NFD")
                    .replace(/[\u0300-\u036f]/g, "")
                    .toLowerCase()
                    .replace(/[^a-z0-9]+/g, "-")
                    .replace(/(^-|-$)/g, "");
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
            <Link
              href={`/legal/${s.returnPolicy.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")}`}
              className="text-xs text-[#FFFFFF]/25 transition-colors hover:text-[#FFFFFF]/50"
              style={{ fontFamily: "var(--font-lora)" }}
            >
              {s.returnPolicy}
            </Link>
            <span className="text-[#FFFFFF]/10">·</span>
            <Link
              href={`/legal/${s.privacy.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")}`}
              className="text-xs text-[#FFFFFF]/25 transition-colors hover:text-[#FFFFFF]/50"
              style={{ fontFamily: "var(--font-lora)" }}
            >
              {s.privacy}
            </Link>
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
  );
}
