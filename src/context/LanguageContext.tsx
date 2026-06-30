"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export type Lang = "fr" | "en" | "hi";

interface LanguageContextType {
  lang: Lang;
  toggle: () => void;
  setLang: (lang: Lang) => void;
}

const LanguageContext = createContext<LanguageContextType>({
  lang: "en",
  toggle: () => {},
  setLang: () => {},
});

// EU/France timezones — inhi pe French auto-detect hogi
const EU_TIMEZONES = [
  "Europe/Paris", "Europe/Berlin", "Europe/Madrid", "Europe/Rome",
  "Europe/Amsterdam", "Europe/Brussels", "Europe/Vienna", "Europe/Warsaw",
  "Europe/Prague", "Europe/Budapest", "Europe/Bucharest", "Europe/Athens",
  "Europe/Helsinki", "Europe/Stockholm", "Europe/Copenhagen", "Europe/Oslo",
  "Europe/Lisbon", "Europe/Dublin", "Europe/Luxembourg", "Europe/Zurich",
];

function detectDefaultLang(): Lang {
  // Pehle localStorage check karo (user ki manual choice)
  if (typeof window !== "undefined") {
    const saved = localStorage.getItem("aeri_lang") as Lang | null;
    if (saved && ["fr", "en", "hi"].includes(saved)) return saved;
  }
  // Fir timezone se auto-detect karo
  try {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
    if (EU_TIMEZONES.includes(tz)) return "fr";
  } catch {
    // Fallback
  }
  return "en"; // India, US, baaki duniya → English
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en"); // SSR safe default

  useEffect(() => {
    // Client side pe detect karo
    setLangState(detectDefaultLang());
  }, []);

  const setLang = (newLang: Lang) => {
    setLangState(newLang);
    if (typeof window !== "undefined") {
      localStorage.setItem("aeri_lang", newLang);
    }
  };

  const toggle = () => {
    const next: Lang = lang === "fr" ? "en" : lang === "en" ? "fr" : "en";
    setLang(next);
  };

  return (
    <LanguageContext.Provider value={{ lang, toggle, setLang }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
