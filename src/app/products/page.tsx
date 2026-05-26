"use client";

import React, { useState, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";

/* ──────────────────────────── Translations ──────────────────────────── */

const t = {
  fr: {
    nav: {
      brand: "AÉRI",
      boutique: "Boutique",
      espacesPro: "Espace Pro",
      laboratoire: "Laboratoire",
      contact: "Contact",
    },
    hero: {
      title: "L'Élégance Botanique",
      subtitle:
        "Des saveurs d'exception, soufflées avec passion. Découvrez notre collection artisanale de Makhana premium.",
    },
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
    voting: {
      title: "L'Atelier des Saveurs",
      subtitle:
        "Votez pour la prochaine saveur AÉRI. Survolez pour révéler les candidats.",
      option1: "Piment d'Espelette & Sel de Guérande",
      option2: "Fromage de Chèvre & Miel",
      voteBtn: "Voter",
      voted: "Vote enregistré !",
    },
    waitlist: {
      title: "Bientôt Disponible",
      body: "Ce produit n'est pas encore en vente. Inscrivez-vous à notre liste d'attente pour être prévenu dès sa sortie.",
      placeholder: "votre@email.com",
      cta: "M'inscrire",
      close: "Fermer",
      success: "Merci ! Nous vous tiendrons informé.",
    },
    footer: {
      copy: "© 2024 AÉRI SNACKS. ÉLÉGANCE BOTANIQUE.",
      links: [
        "Mentions Légales",
        "CGV B2B",
        "Contact",
        "Boutique",
        "Espace Pro",
        "Laboratoire",
      ],
    },
  },
  en: {
    nav: {
      brand: "AÉRI",
      boutique: "Boutique",
      espacesPro: "Pro Space",
      laboratoire: "Laboratory",
      contact: "Contact",
    },
    hero: {
      title: "Botanical Elegance",
      subtitle:
        "Exceptional flavors, passionately puffed. Discover our artisanal collection of premium Makhana.",
    },
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
    voting: {
      title: "Flavor Workshop",
      subtitle:
        "Vote for the next AÉRI flavor. Hover to reveal the candidates.",
      option1: "Espelette Pepper & Guérande Salt",
      option2: "Goat Cheese & Honey",
      voteBtn: "Vote",
      voted: "Vote registered!",
    },
    waitlist: {
      title: "Coming Soon",
      body: "This product is not yet available for purchase. Join our waitlist to be notified as soon as it launches.",
      placeholder: "your@email.com",
      cta: "Join Waitlist",
      close: "Close",
      success: "Thank you! We'll keep you posted.",
    },
    footer: {
      copy: "© 2024 AÉRI SNACKS. BOTANICAL ELEGANCE.",
      links: [
        "Legal Notice",
        "B2B T&C",
        "Contact",
        "Boutique",
        "Pro Space",
        "Laboratory",
      ],
    },
  },
};

/* ──────────────────────────── Category badge colors ──────────────────────────── */

const categoryColors: Record<string, string> = {
  Signature: "bg-amber-100 text-amber-800",
  Gourmet: "bg-rose-100 text-rose-800",
  "Végétal": "bg-emerald-100 text-emerald-800",
  "Espace Pro": "bg-sky-100 text-sky-800",
  "Pro Space": "bg-sky-100 text-sky-800",
};

/* ──────────────────────────── Animation Variants ──────────────────────────── */

const fadeUp: any = {
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

/* ──────────────────────────── Component ──────────────────────────── */

export default function ProductsPage() {
  const { lang, toggle } = useLanguage();
  const d = t[lang as keyof typeof t] || t.en;

  const [waitlistOpen, setWaitlistOpen] = useState(false);
  const [waitlistEmail, setWaitlistEmail] = useState("");
  const [waitlistSubmitted, setWaitlistSubmitted] = useState(false);
  const [voted, setVoted] = useState<Record<number, boolean>>({});

  const handleAddToCart = useCallback(() => {
    setWaitlistOpen(true);
    setWaitlistSubmitted(false);
    setWaitlistEmail("");
  }, []);

  const handleVote = useCallback((idx: number) => {
    setVoted((prev) => ({ ...prev, [idx]: true }));
    setTimeout(() => setVoted((prev) => ({ ...prev, [idx]: false })), 2200);
  }, []);

  const handleWaitlistSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      if (waitlistEmail.trim()) setWaitlistSubmitted(true);
    },
    [waitlistEmail]
  );

  return (
    <>
      {/* ── Inline custom styles ─────────────────────────────────────── */}
      <style jsx global>{`
        .shadow-ambient {
          box-shadow: 0 10px 30px -10px rgba(29, 27, 26, 0.15);
        }
        .shadow-ambient-lg {
          box-shadow: 0 16px 48px -12px rgba(29, 27, 26, 0.22);
        }
      `}</style>

      <main
        className="min-h-screen text-[#1d1b1a]"
        style={{
          fontFamily: "var(--font-montserrat), var(--font-inter), sans-serif",
          background: "#fef8f6",
        }}
      >
        {/* ═══════════════════════ NAVBAR ═══════════════════════ */}
        <header className="fixed top-0 inset-x-0 z-50">
          <nav
            className="flex items-center justify-between px-6 md:px-12 py-3 backdrop-blur-md border-b"
            style={{
              backgroundColor: "rgba(254,248,246,0.85)",
              borderColor: "#cec5bb",
            }}
          >
            {/* Brand */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
            >
              <Link href="/">
                <span
                  className="text-xl font-semibold tracking-[0.25em] uppercase cursor-pointer"
                  style={{
                    fontFamily: "var(--font-playfair), var(--font-inter), serif",
                    color: "#675d4e",
                  }}
                >
                  AÉRI
                </span>
              </Link>
            </motion.div>

            {/* Nav Links */}
            <motion.div
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="hidden md:flex items-center gap-8 text-xs tracking-[0.18em] uppercase font-medium"
              style={{ color: "#4c463e" }}
            >
              <Link
                href="/products"
                className="transition-colors hover:text-[#675d4e]"
                style={{ color: "#675d4e", fontWeight: 700 }}
              >
                {d.nav.boutique}
              </Link>
              <Link
                href="/pro"
                className="transition-colors hover:text-[#675d4e]"
              >
                {d.nav.espacesPro}
              </Link>
              <Link
                href="/lab"
                className="transition-colors hover:text-[#675d4e]"
              >
                {d.nav.laboratoire}
              </Link>
              <Link
                href="/contact"
                className="transition-colors hover:text-[#675d4e]"
              >
                {d.nav.contact}
              </Link>
            </motion.div>

            {/* Right icons */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="flex items-center gap-4"
            >
              {/* Language toggle */}
              <button
                onClick={toggle}
                className="text-xs tracking-widest uppercase font-semibold px-3 py-1 rounded-full border transition-colors"
                style={{
                  borderColor: "#cec5bb",
                  color: "#675d4e",
                }}
              >
                {lang === "fr" ? "EN" : "FR"}
              </button>

              {/* Cart icon */}
              <button aria-label="Cart" className="p-1.5" style={{ color: "#675d4e" }}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="9" cy="21" r="1" />
                  <circle cx="20" cy="21" r="1" />
                  <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                </svg>
              </button>

              {/* Account icon */}
              <button aria-label="Account" className="p-1.5" style={{ color: "#675d4e" }}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
              </button>
            </motion.div>
          </nav>
        </header>

        {/* ═══════════════════════ HERO ═══════════════════════ */}
        <section className="pt-36 pb-16 md:pt-44 md:pb-20 px-6 md:px-12 max-w-5xl mx-auto text-center">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="text-xs tracking-[0.3em] uppercase font-medium mb-5"
            style={{ color: "#4c463e" }}
          >
            ✦&ensp;AÉRI Collection&ensp;✦
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="text-5xl md:text-7xl font-bold tracking-tight mb-6"
            style={{
              fontFamily: "var(--font-playfair), var(--font-lora), serif",
              color: "#1d1b1a",
            }}
          >
            {d.hero.title}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.25 }}
            className="text-base md:text-lg max-w-2xl mx-auto leading-relaxed"
            style={{
              fontFamily: "var(--font-montserrat), var(--font-inter), sans-serif",
              color: "#4c463e",
            }}
          >
            {d.hero.subtitle}
          </motion.p>
        </section>

        {/* ═══════════════════════ PRODUCT GRID ═══════════════════════ */}
        <section className="px-6 md:px-12 max-w-6xl mx-auto pb-24">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
          >
            {d.products.map((product, i) => (
              <div
                key={product.id + "-wrapper"}
                className={d.products.length % 2 === 1 && i === d.products.length - 1 ? "md:col-span-2 flex justify-center" : ""}
              >
              <motion.div
                key={product.id}
                custom={i}
                variants={fadeUp}
                className={`group relative rounded-2xl overflow-hidden border transition-all duration-500 cursor-pointer ${
                  d.products.length % 2 === 1 && i === d.products.length - 1 ? "w-full md:max-w-md lg:max-w-lg" : "w-full"
                }`}
                style={{
                  borderColor: "#cec5bb",
                  backgroundColor: "#ffffff",
                }}
                whileHover={{
                  y: -4,
                  boxShadow: "0 16px 48px -12px rgba(29,27,26,0.22)",
                }}
              >
                {/* Image area */}
                <div
                  className="relative w-full aspect-square overflow-hidden"
                  style={{ backgroundColor: "#f2edea" }}
                >
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-contain p-8 transition-transform duration-700 ease-out group-hover:scale-110"
                  />
                  {/* Gradient overlay */}
                  <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-white/90 to-transparent pointer-events-none" />

                  {/* Category badge */}
                  <span
                    className={`absolute top-4 left-4 text-[10px] tracking-[0.15em] uppercase font-semibold px-3 py-1 rounded-full ${
                      categoryColors[product.category] || "bg-gray-100 text-gray-700"
                    }`}
                  >
                    {product.category}
                  </span>
                </div>

                {/* Content */}
                <div className="px-6 pb-6 pt-3">
                  <h3
                    className="text-lg font-bold mb-1"
                    style={{
                      fontFamily:
                        "var(--font-playfair), var(--font-inter), serif",
                      color: "#1d1b1a",
                    }}
                  >
                    {product.name}
                  </h3>
                  <p
                    className="text-sm leading-relaxed mb-4 line-clamp-2"
                    style={{ color: "#4c463e" }}
                  >
                    {product.desc}
                  </p>

                  <div className="flex items-center justify-between">
                    <span
                      className="text-xl font-bold"
                      style={{
                        fontFamily:
                          "var(--font-playfair), var(--font-inter), serif",
                        color: "#675d4e",
                      }}
                    >
                      {product.price}
                    </span>

                    {/* Add to Cart — 3D button */}
                    <button
                      onClick={handleAddToCart}
                      className="relative inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold tracking-wide transition-all duration-150 active:translate-y-[2px] active:shadow-none"
                      style={{
                        fontFamily:
                          "var(--font-montserrat), var(--font-inter), sans-serif",
                        background:
                          "linear-gradient(to bottom, #fde68a, #fbbf24)",
                        color: "#78350f",
                        borderTop: "1px solid rgba(255,255,255,0.6)",
                        boxShadow:
                          "0 4px 12px -2px rgba(251,191,36,0.45), inset 0 1px 0 rgba(255,255,255,0.35)",
                      }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <circle cx="9" cy="21" r="1" />
                        <circle cx="20" cy="21" r="1" />
                        <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                      </svg>
                      {d.addToCart}
                    </button>
                  </div>
                </div>
              </motion.div>
              </div>
            ))}
          </motion.div>
        </section>

        {/* ═══════════════════════ VOTING SECTION ═══════════════════════ */}
        <section
          className="py-20 px-6 md:px-12"
          style={{ backgroundColor: "#f2edea" }}
        >
          <div className="max-w-4xl mx-auto text-center mb-14">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="text-3xl md:text-5xl font-bold mb-4"
              style={{
                fontFamily:
                  "var(--font-playfair), var(--font-lora), serif",
                color: "#1d1b1a",
              }}
            >
              {d.voting.title}
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="text-sm md:text-base"
              style={{ color: "#4c463e" }}
            >
              {d.voting.subtitle}
            </motion.p>
          </div>

          <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              { img: "/flavor_salt.png", label: d.voting.option1 },
              { img: "/flavor_mystery.png", label: d.voting.option2 },
            ].map((opt, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.15 }}
                className="group relative rounded-2xl overflow-hidden border"
                style={{
                  borderColor: "#cec5bb",
                  backgroundColor: "#ffffff",
                }}
              >
                {/* Blurred image that unblurs on hover */}
                <div className="relative w-full aspect-[4/3] overflow-hidden" style={{ backgroundColor: "#f2edea" }}>
                  <Image
                    src={opt.img}
                    alt={opt.label}
                    fill
                    className="object-contain p-6 transition-all duration-700 ease-out blur-lg group-hover:blur-0 group-hover:scale-105"
                  />
                  {/* Mystery overlay */}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none transition-opacity duration-500 group-hover:opacity-0">
                    <span
                      className="text-3xl"
                      role="img"
                      aria-label="mystery"
                    >
                      ?
                    </span>
                  </div>
                </div>

                {/* Label + vote */}
                <div className="px-6 py-5 flex items-center justify-between gap-4">
                  <h4
                    className="text-sm md:text-base font-semibold"
                    style={{
                      fontFamily:
                        "var(--font-playfair), var(--font-inter), serif",
                      color: "#1d1b1a",
                    }}
                  >
                    {opt.label}
                  </h4>

                  <button
                    onClick={() => handleVote(idx)}
                    disabled={!!voted[idx]}
                    className="relative shrink-0 px-5 py-2 rounded-xl text-sm font-semibold tracking-wide transition-all duration-150 active:translate-y-[2px] active:shadow-none disabled:opacity-70"
                    style={{
                      background: voted[idx]
                        ? "linear-gradient(to bottom, #a3e635, #65a30d)"
                        : "linear-gradient(to bottom, #fde68a, #fbbf24)",
                      color: voted[idx] ? "#1a2e05" : "#78350f",
                      borderTop: "1px solid rgba(255,255,255,0.6)",
                      boxShadow:
                        "0 4px 12px -2px rgba(251,191,36,0.35), inset 0 1px 0 rgba(255,255,255,0.35)",
                    }}
                  >
                    {voted[idx] ? d.voting.voted : d.voting.voteBtn}
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ═══════════════════════ FOOTER ═══════════════════════ */}
        <footer
          className="py-16 px-6 md:px-12"
          style={{ backgroundColor: "#32302f", color: "#e6e1df" }}
        >
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-10 mb-12">
              <span
                className="text-2xl font-bold tracking-[0.25em] uppercase"
                style={{
                  fontFamily:
                    "var(--font-playfair), var(--font-inter), serif",
                }}
              >
                AÉRI
              </span>
              <div className="flex flex-wrap gap-x-8 gap-y-3 text-xs tracking-[0.15em] uppercase" style={{ color: "#cec5bb" }}>
                {d.footer.links.map((link) => (
                  <a
                    key={link}
                    href="#"
                    className="hover:text-white transition-colors"
                  >
                    {link}
                  </a>
                ))}
              </div>
            </div>
            <div
              className="border-t pt-8 text-center text-xs tracking-[0.2em] uppercase"
              style={{ borderColor: "#4c463e", color: "#cec5bb" }}
            >
              {d.footer.copy}
            </div>
          </div>
        </footer>
      </main>

      {/* ═══════════════════════ WAITLIST MODAL ═══════════════════════ */}
      <AnimatePresence>
        {waitlistOpen && (
          <motion.div
            key="waitlist-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4"
            style={{ backgroundColor: "rgba(29,27,26,0.5)" }}
            onClick={() => setWaitlistOpen(false)}
          >
            <motion.div
              key="waitlist-modal"
              initial={{ opacity: 0, scale: 0.92, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 20 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="relative w-full max-w-md rounded-2xl p-8 border"
              style={{
                backgroundColor: "#fef8f6",
                borderColor: "#cec5bb",
                boxShadow: "0 24px 64px -16px rgba(29,27,26,0.3)",
              }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close button */}
              <button
                onClick={() => setWaitlistOpen(false)}
                className="absolute top-4 right-4 p-1 rounded-full transition-colors"
                style={{ color: "#4c463e" }}
                aria-label={d.waitlist.close}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>

              <h3
                className="text-2xl font-bold mb-3"
                style={{
                  fontFamily:
                    "var(--font-playfair), var(--font-inter), serif",
                  color: "#1d1b1a",
                }}
              >
                {d.waitlist.title}
              </h3>
              <p className="text-sm mb-6" style={{ color: "#4c463e" }}>
                {d.waitlist.body}
              </p>

              {!waitlistSubmitted ? (
                <form
                  onSubmit={handleWaitlistSubmit}
                  className="flex flex-col gap-3"
                >
                  <input
                    type="email"
                    required
                    value={waitlistEmail}
                    onChange={(e) => setWaitlistEmail(e.target.value)}
                    placeholder={d.waitlist.placeholder}
                    className="w-full px-4 py-3 rounded-xl border text-sm outline-none transition-colors focus:ring-2 focus:ring-amber-300"
                    style={{
                      borderColor: "#cec5bb",
                      backgroundColor: "#f2edea",
                      color: "#1d1b1a",
                    }}
                  />
                  <button
                    type="submit"
                    className="w-full py-3 rounded-xl text-sm font-semibold tracking-wide transition-all duration-150 active:translate-y-[2px] active:shadow-none"
                    style={{
                      background:
                        "linear-gradient(to bottom, #fde68a, #fbbf24)",
                      color: "#78350f",
                      borderTop: "1px solid rgba(255,255,255,0.6)",
                      boxShadow:
                        "0 4px 12px -2px rgba(251,191,36,0.45), inset 0 1px 0 rgba(255,255,255,0.35)",
                    }}
                  >
                    {d.waitlist.cta}
                  </button>
                </form>
              ) : (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-3 py-4 px-5 rounded-xl"
                  style={{ backgroundColor: "#f0fdf4", color: "#166534" }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span className="text-sm font-medium">
                    {d.waitlist.success}
                  </span>
                </motion.div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
