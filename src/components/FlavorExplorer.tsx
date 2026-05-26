"use client";

import React, { useState, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";

const t = {
  fr: {
    title: "L'Élégance Botanique",
    subtitle: "Découvrez notre collection artisanale de Makhana premium.",
    products: [
      {
        id: "salt",
        name: "Himalayan Salt & Pepper",
        category: "Signature",
        desc: "La pureté du sel rose de l'Himalaya mariée au piquant subtil du poivre noir concassé. L'équilibre parfait.",
        price: "€8.00",
        image: "/flavor_salt.png",
      },
      {
        id: "truffle",
        name: "Truffle Fusion",
        category: "Gourmet",
        desc: "Une infusion luxueuse d'huile de truffe blanche et d'éclats de truffe noire d'été pour une expérience décadente.",
        price: "€12.00",
        image: "/flavor_truffle.png",
      },
      {
        id: "herb",
        name: "Mediterranean Herb",
        category: "Végétal",
        desc: "Un bouquet aromatique d'origan sauvage, romarin et basilic séché au soleil de la Méditerranée.",
        price: "€8.50",
        image: "/flavor_herbes.png",
      },
    ],
    addToCart: "Ajouter au Panier",
    waitlist: {
      title: "Bientôt Disponible",
      body: "Ce produit n'est pas encore en vente. Inscrivez-vous à notre liste d'attente pour être prévenu dès sa sortie.",
      placeholder: "votre@email.com",
      cta: "M'inscrire",
      close: "Fermer",
      success: "Merci ! Nous vous tiendrons informé.",
    },
  },
  en: {
    title: "Botanical Elegance",
    subtitle: "Discover our artisanal collection of premium Makhana.",
    products: [
      {
        id: "salt",
        name: "Himalayan Salt & Pepper",
        category: "Signature",
        desc: "The purity of Himalayan pink salt married with the subtle kick of crushed black pepper. Perfect balance.",
        price: "€8.00",
        image: "/flavor_salt.png",
      },
      {
        id: "truffle",
        name: "Truffle Fusion",
        category: "Gourmet",
        desc: "A luxurious infusion of white truffle oil and summer black truffle shavings for a decadent experience.",
        price: "€12.00",
        image: "/flavor_truffle.png",
      },
      {
        id: "herb",
        name: "Mediterranean Herb",
        category: "Végétal",
        desc: "An aromatic bouquet of wild oregano, rosemary, and sun-dried basil from the Mediterranean.",
        price: "€8.50",
        image: "/flavor_herbes.png",
      },
    ],
    addToCart: "Add to Cart",
    waitlist: {
      title: "Coming Soon",
      body: "This product is not yet available for purchase. Join our waitlist to be notified as soon as it launches.",
      placeholder: "your@email.com",
      cta: "Join Waitlist",
      close: "Close",
      success: "Thank you! We'll keep you posted.",
    },
  },
};

const categoryColors: Record<string, string> = {
  Signature: "bg-amber-100 text-amber-800",
  Gourmet: "bg-rose-100 text-rose-800",
  "Végétal": "bg-emerald-100 text-emerald-800",
  "Espace Pro": "bg-sky-100 text-sky-800",
  "Pro Space": "bg-sky-100 text-sky-800",
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] },
  }),
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

export default function FlavorExplorer() {
  const { lang } = useLanguage();
  const d = t[lang as keyof typeof t] || t.en;

  const [waitlistOpen, setWaitlistOpen] = useState(false);
  const [waitlistEmail, setWaitlistEmail] = useState("");
  const [waitlistSubmitted, setWaitlistSubmitted] = useState(false);

  const handleAddToCart = useCallback((e: React.MouseEvent) => {
    e.preventDefault(); // Prevent Link navigation
    setWaitlistOpen(true);
    setWaitlistSubmitted(false);
    setWaitlistEmail("");
  }, []);

  const handleWaitlistSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      if (waitlistEmail.trim()) setWaitlistSubmitted(true);
    },
    [waitlistEmail]
  );

  return (
    <section className="py-24 bg-[#fef8f6] relative">
      <div className="max-w-5xl mx-auto px-6 md:px-12 mb-16 text-center">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-xs tracking-[0.3em] uppercase font-medium mb-5 text-[#4c463e]"
        >
          ✦&ensp;AÉRI Collection&ensp;✦
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="text-4xl md:text-5xl font-bold tracking-tight mb-6 text-[#1d1b1a]"
          style={{ fontFamily: "var(--font-playfair), var(--font-lora), serif" }}
        >
          {d.title}
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.25 }}
          className="text-base md:text-lg max-w-2xl mx-auto leading-relaxed text-[#4c463e]"
          style={{ fontFamily: "var(--font-montserrat), var(--font-inter), sans-serif" }}
        >
          {d.subtitle}
        </motion.p>
      </div>

      <div className="px-6 md:px-12 max-w-6xl mx-auto pb-8">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          {d.products.map((product, i) => {
            const slug = product.id === "salt" ? "himalayan-salt" : product.id === "truffle" ? "black-truffle" : "herbes-de-provence";
            return (
              <div
                key={product.id + "-wrapper"}
                className={d.products.length % 2 === 1 && i === d.products.length - 1 ? "md:col-span-2 flex justify-center" : ""}
              >
                <Link
                  href={`/products/${slug}`}
                  className={`block group relative rounded-2xl overflow-hidden border transition-all duration-500 cursor-pointer ${
                    d.products.length % 2 === 1 && i === d.products.length - 1 ? "w-full md:max-w-md lg:max-w-lg" : "w-full"
                  }`}
                  style={{
                    borderColor: "#cec5bb",
                    backgroundColor: "#ffffff",
                  }}
                >
                  <motion.div
                    variants={fadeUp}
                    whileHover={{
                      y: -4,
                      boxShadow: "0 16px 48px -12px rgba(29,27,26,0.22)",
                    }}
                    className="h-full"
                  >
                    <div className="relative w-full aspect-square overflow-hidden bg-[#f2edea]">
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-contain p-8 transition-transform duration-700 ease-out group-hover:scale-110"
                      />
                      <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-white/90 to-transparent pointer-events-none" />
                      <span
                        className={`absolute top-4 left-4 text-[10px] tracking-[0.15em] uppercase font-semibold px-3 py-1 rounded-full ${
                          categoryColors[product.category] || "bg-gray-100 text-gray-700"
                        }`}
                      >
                        {product.category}
                      </span>
                    </div>

                    <div className="px-6 pb-6 pt-3">
                      <h3
                        className="text-lg font-bold mb-1 text-[#1d1b1a]"
                        style={{ fontFamily: "var(--font-playfair), var(--font-inter), serif" }}
                      >
                        {product.name}
                      </h3>
                      <p className="text-sm leading-relaxed mb-4 line-clamp-2 text-[#4c463e]">
                        {product.desc}
                      </p>
                      <div className="flex items-center justify-between">
                        <span
                          className="text-xl font-bold text-[#675d4e]"
                          style={{ fontFamily: "var(--font-playfair), var(--font-inter), serif" }}
                        >
                          {product.price}
                        </span>
                        <button
                          onClick={handleAddToCart}
                          className="relative inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold tracking-wide transition-all duration-150 active:translate-y-[2px] active:shadow-none"
                          style={{
                            fontFamily: "var(--font-montserrat), var(--font-inter), sans-serif",
                            background: "linear-gradient(to bottom, #fde68a, #fbbf24)",
                            color: "#78350f",
                            borderTop: "1px solid rgba(255,255,255,0.6)",
                            boxShadow: "0 4px 12px -2px rgba(251,191,36,0.45), inset 0 1px 0 rgba(255,255,255,0.35)",
                          }}
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="9" cy="21" r="1" />
                            <circle cx="20" cy="21" r="1" />
                            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                          </svg>
                          {d.addToCart}
                        </button>
                      </div>
                    </div>
                  </motion.div>
                </Link>
              </div>
            );
          })}
        </motion.div>
      </div>

      {/* WAITLIST MODAL */}
      <AnimatePresence>
        {waitlistOpen && (
          <motion.div
            key="waitlist-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-[#1d1b1a]/50"
            onClick={() => setWaitlistOpen(false)}
          >
            <motion.div
              key="waitlist-modal"
              initial={{ opacity: 0, scale: 0.92, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 20 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="relative w-full max-w-md rounded-2xl p-8 border bg-[#fef8f6] border-[#cec5bb] shadow-[0_24px_64px_-16px_rgba(29,27,26,0.3)]"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setWaitlistOpen(false)}
                className="absolute top-4 right-4 p-1 rounded-full transition-colors text-[#4c463e]"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
              </button>
              <h3 className="text-2xl font-bold mb-3 text-[#1d1b1a]" style={{ fontFamily: "var(--font-playfair), var(--font-inter), serif" }}>
                {d.waitlist.title}
              </h3>
              <p className="text-sm mb-6 text-[#4c463e]">
                {d.waitlist.body}
              </p>
              {!waitlistSubmitted ? (
                <form onSubmit={handleWaitlistSubmit} className="flex flex-col gap-3">
                  <input
                    type="email"
                    required
                    value={waitlistEmail}
                    onChange={(e) => setWaitlistEmail(e.target.value)}
                    placeholder={d.waitlist.placeholder}
                    className="w-full px-4 py-3 rounded-xl border border-[#cec5bb] bg-[#f2edea] text-[#1d1b1a] text-sm outline-none transition-colors focus:ring-2 focus:ring-amber-300"
                  />
                  <button
                    type="submit"
                    className="w-full py-3 rounded-xl text-sm font-semibold tracking-wide transition-all duration-150 active:translate-y-[2px] active:shadow-none text-[#78350f]"
                    style={{
                      background: "linear-gradient(to bottom, #fde68a, #fbbf24)",
                      borderTop: "1px solid rgba(255,255,255,0.6)",
                      boxShadow: "0 4px 12px -2px rgba(251,191,36,0.45), inset 0 1px 0 rgba(255,255,255,0.35)",
                    }}
                  >
                    {d.waitlist.cta}
                  </button>
                </form>
              ) : (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-3 py-4 px-5 rounded-xl bg-[#f0fdf4] text-[#166534]"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                  <span className="text-sm font-medium">{d.waitlist.success}</span>
                </motion.div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
