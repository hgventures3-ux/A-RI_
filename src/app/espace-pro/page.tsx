"use client";

import React, { useEffect } from "react";
import EspacePro from "@/components/EspacePro";
import Navbar from "@/components/Navbar";
import { useLanguage } from "@/context/LanguageContext";
import espaceProEn from "@/locales/en/espace-pro.json";
import espaceProFr from "@/locales/fr/espace-pro.json";

export default function EspaceProPage() {
  const { lang } = useLanguage();
  const s = lang === "fr" ? espaceProFr : espaceProEn;

  useEffect(() => {
    document.title = `${s.header.title} | AÉRI Makhana`;
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute("content", s.header.hook);
    } else {
      const meta = document.createElement('meta');
      meta.name = "description";
      meta.content = s.header.hook;
      document.head.appendChild(meta);
    }
  }, [s]);

  return (
    <>
      <Navbar />
      <div className="pt-20">
        <EspacePro />
      </div>
    </>
  );
}
