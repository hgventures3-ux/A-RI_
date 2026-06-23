"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLanguage } from "@/context/LanguageContext";

export default function InstitutionalNav() {
  const pathname = usePathname();
  const { lang } = useLanguage();

  const getLinks = (currentLang: string) => {
    if (currentLang === 'fr') {
      return [
        { label: "Notre Histoire", href: "/brand" },
        { label: "Notre Procédé", href: "/brand#procede" },
        { label: "Traçabilité", href: "/company/transparence" },
      ];
    } else if (currentLang === 'hi') {
      return [
        { label: "हमारी कहानी", href: "/brand" },
        { label: "हमारी प्रक्रिया", href: "/brand#procede" },
        { label: "ट्रैसेबिलिटी", href: "/company/transparency" },
      ];
    }
    return [
      { label: "Our Story", href: "/brand" },
      { label: "Our Process", href: "/brand#procede" },
      { label: "Traceability", href: "/company/transparency" },
    ];
  };

  const links = getLinks(lang);

  return (
    <div className="w-full border-b border-[#1C1C1C]/10 bg-transparent pt-28">
      <div className="max-w-6xl mx-auto px-6 md:px-12 flex justify-center space-x-8 md:space-x-16 overflow-x-auto pb-4">
        {links.map((link, idx) => {
          const isActive = pathname === link.href;
          return (
            <Link
              key={idx}
              href={link.href}
              className={`text-[12px] md:text-[13px] uppercase tracking-widest whitespace-nowrap transition-colors duration-300 font-semibold ${
                isActive
                  ? "text-[#D4AF37]"
                  : "text-[#1C1C1C]/60 hover:text-[#1C1C1C]"
              }`}
              style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
            >
              {link.label}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
