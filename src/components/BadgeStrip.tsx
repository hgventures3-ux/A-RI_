"use client";

import { useLanguage } from "@/context/LanguageContext";

const translations = {
  fr: "Torréfié à l'huile d'olive vierge extra",
  en: "Roasted in extra virgin olive oil",
  hi: "एक्स्ट्रा वर्जिन जैतून के तेल में भुना हुआ",
};

export default function BadgeStrip() {
  const { lang } = useLanguage();
  const badge =
    translations[lang as keyof typeof translations] || translations.fr;
  const allBadges = Array.from({ length: 12 }, () => badge);

  return (
    <section
      className="w-full overflow-hidden"
      style={{
        background: "linear-gradient(90deg, #1A1A1A 0%, #242424 50%, #1A1A1A 100%)",
        borderTop: "1px solid rgba(212,175,55,0.15)",
        borderBottom: "1px solid rgba(212,175,55,0.15)",
      }}
      aria-label="Informations nutritionnelles et qualité AÉRI"
    >
      {/* Top gold accent line */}
      <div
        className="w-full h-[1px]"
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, rgba(212,175,55,0.6) 20%, rgba(212,175,55,0.8) 50%, rgba(212,175,55,0.6) 80%, transparent 100%)",
        }}
      />

      {/* Badge marquee row */}
      <div className="relative py-3.5">
        {/* Left fade gradient */}
        <div
          className="absolute left-0 top-0 bottom-0 w-20 z-10 pointer-events-none"
          style={{
            background: "linear-gradient(90deg, #1A1A1A 0%, transparent 100%)",
          }}
        />
        {/* Right fade gradient */}
        <div
          className="absolute right-0 top-0 bottom-0 w-20 z-10 pointer-events-none"
          style={{
            background: "linear-gradient(270deg, #1A1A1A 0%, transparent 100%)",
          }}
        />

        {/* Scrolling badges — 4 sets, animate-badge-strip defined in globals.css */}
        <div
          className="flex whitespace-nowrap animate-badge-strip"
          style={{ willChange: "transform" }}
        >
          {allBadges.map((text, i) => (
            <span key={`${text}-${i}`} className="inline-flex shrink-0 items-center">
              <span
                className="inline-flex items-center gap-1.5 px-4 py-1"
                style={{ fontFamily: "var(--font-montserrat)" }}
              >
                <span
                  className="text-[9px] font-black shrink-0"
                  style={{ color: "#D4AF37" }}
                  aria-hidden="true"
                >
                  ✓
                </span>
                <span className="text-white text-[11px] font-semibold tracking-[0.08em] uppercase">
                  {text}
                </span>
              </span>

              <span
                className="inline-block w-[3px] h-[3px] rounded-full mx-2 shrink-0"
                style={{ background: "#D4AF37", opacity: 0.6 }}
                aria-hidden="true"
              />
            </span>
          ))}
        </div>
      </div>

      {/* Bottom gold accent line */}
      <div
        className="w-full h-[1px]"
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, rgba(212,175,55,0.6) 20%, rgba(212,175,55,0.8) 50%, rgba(212,175,55,0.6) 80%, transparent 100%)",
        }}
      />
    </section>
  );
}
