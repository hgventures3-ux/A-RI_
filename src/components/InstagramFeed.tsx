"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";

const instagramPosts = [
  {
    image: "/flavor_himalayan_salt_new.png",
    alt: "AÉRI Himalayan Salt & Pepper Makhana",
    caption: "Pure simplicity. Hand-selected Himalayan pink salt.",
  },
  {
    image: "/flavor_truffle_makhana.png",
    alt: "AÉRI Gourmet Truffle Makhana",
    caption: "The earthy elegance of Périgord black truffle.",
  },
  {
    image: "/flavor_dark_chocolate.png",
    alt: "AÉRI Dark Chocolate Makhana",
    caption: "70% single-origin dark chocolate coating.",
  },
  {
    image: "/stage_harvest.png",
    alt: "AÉRI Makhana Harvesting in Bihar",
    caption: "From preserved wetlands in Bihar directly to your table.",
  },
];

export default function InstagramFeed() {
  const { lang } = useLanguage();
  const title = lang === "fr" ? "Rejoignez-nous sur Instagram" : "Follow Us on Instagram";
  const subtitle = "@aeri.makhana";

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
          <span
            className="text-xs uppercase tracking-[0.3em] font-semibold text-[#1C1C1C]/50 block mb-2"
            style={{ fontFamily: "var(--font-montserrat)" }}
          >
            Community
          </span>
          <h2
            className="text-3xl md:text-5xl font-semibold tracking-tight text-[#1D1B1A] mb-3"
            style={{ fontFamily: "var(--font-didot)" }}
          >
            {title}
          </h2>
          <a
            href="https://www.instagram.com/aeri.makhana/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm md:text-base font-semibold text-[#6C6257] hover:text-[#1D1B1A] transition-colors uppercase tracking-[0.2em] inline-flex items-center gap-1.5"
            style={{ fontFamily: "var(--font-montserrat)" }}
          >
            {subtitle}
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
              <polyline points="15 3 21 3 21 9" />
              <line x1="10" y1="14" x2="21" y2="3" />
            </svg>
          </a>
        </motion.div>

        {/* Real Visual Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-10">
          {instagramPosts.map((post, i) => (
            <motion.a
              key={post.alt}
              href="https://www.instagram.com/aeri.makhana/"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group relative aspect-square rounded-2xl overflow-hidden bg-[#FAF8F5] border border-[#1C1C1C]/10 block shadow-sm hover:shadow-md transition-all"
            >
              <Image
                src={post.image}
                alt={post.alt}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-[#1C1C1C]/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4 text-left">
                <p className="text-white text-xs font-medium leading-snug line-clamp-2" style={{ fontFamily: "var(--font-lora)" }}>
                  {post.caption}
                </p>
                <span className="text-[#FAF8F5]/80 text-[10px] tracking-wider uppercase mt-1" style={{ fontFamily: "var(--font-montserrat)" }}>
                  View on Instagram ↗
                </span>
              </div>
            </motion.a>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <a
            href="https://www.instagram.com/aeri.makhana/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#1C1C1C] text-white text-xs font-semibold tracking-wider uppercase hover:bg-[#333] transition-colors"
            style={{ fontFamily: "var(--font-montserrat)" }}
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
              <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
            </svg>
            Follow @aeri.makhana
          </a>
        </motion.div>
      </div>
    </section>
  );
}
