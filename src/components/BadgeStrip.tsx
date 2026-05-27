"use client";

import { motion } from "framer-motion";

const badges = [
  "✓ Torréfié à l'huile d'olive vierge extra — jamais frit",
  "✓ Vegan",
  "✓ Sans Gluten",
  "✓ 9,5g Protéines / 100g",
  "✓ Nutri-Score A",
  "✓ 0 Cholestérol",
  "✓ Sans Additifs",
  "✓ Clean Label — 5 ingrédients",
];

export default function BadgeStrip() {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="w-full overflow-hidden"
      style={{ background: "#1C1C1C" }}
    >
      <div className="relative py-3 md:py-4">
        {/* Marquee container */}
        <div className="flex animate-marquee whitespace-nowrap">
          {/* First set */}
          {badges.map((badge, i) => (
            <span key={`a-${i}`} className="flex items-center shrink-0">
              <span
                className="text-white text-xs md:text-sm tracking-wide px-3 md:px-5"
                style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
              >
                {badge}
              </span>
              <span
                className="w-1.5 h-1.5 rounded-full shrink-0"
                style={{ background: "#D4AF37" }}
              />
            </span>
          ))}
          {/* Duplicate set for seamless loop */}
          {badges.map((badge, i) => (
            <span key={`b-${i}`} className="flex items-center shrink-0">
              <span
                className="text-white text-xs md:text-sm tracking-wide px-3 md:px-5"
                style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
              >
                {badge}
              </span>
              <span
                className="w-1.5 h-1.5 rounded-full shrink-0"
                style={{ background: "#D4AF37" }}
              />
            </span>
          ))}
        </div>
      </div>

      {/* Marquee animation via inline style tag */}
      <style jsx>{`
        @keyframes marquee {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-marquee {
          animation: marquee 30s linear infinite;
        }
        .animate-marquee:hover {
          animation-play-state: paused;
        }
      `}</style>
    </motion.section>
  );
}
