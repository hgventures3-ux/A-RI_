"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";

const copy = {
  fr: {
    title: "La Collection AÉRI",
    subtitle:
      "Notre saveur signature, torréfiée à l'huile d'olive vierge extra.",
    label: "SIGNATURE",
    product: "Pristine Himalayan Salt & Pepper",
    price: "7,50 €",
    button: "Acheter maintenant",
  },
  en: {
    title: "The AÉRI Collection",
    subtitle: "Our signature flavor, roasted in extra virgin olive oil.",
    label: "SIGNATURE",
    product: "Pristine Himalayan Salt & Pepper",
    price: "7.50 €",
    button: "Buy Now",
  },
  hi: {
    title: "AÉRI कलेक्शन",
    subtitle:
      "हमारा सिग्नेचर फ्लेवर, एक्स्ट्रा वर्जिन ऑलिव ऑयल में रोस्ट किया गया।",
    label: "सिग्नेचर",
    product: "Pristine Himalayan Salt & Pepper",
    price: "7.50 €",
    button: "अभी खरीदें",
  },
};

export default function ThreeFlavorLineup() {
  const { lang } = useLanguage();
  const content = copy[lang as keyof typeof copy] || copy.fr;

  return (
    <section
      className="relative w-full overflow-hidden py-16 md:py-24 bg-[#F9F6F0]"
      aria-labelledby="collection-title"
    >
      <div
        className="absolute inset-x-0 top-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(28,28,28,0.15), transparent)",
        }}
      />

      <div className="mx-auto max-w-5xl px-6 text-center">
        <motion.h2
          id="collection-title"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-3xl sm:text-4xl font-semibold text-[#1C1C1C] md:text-5xl"
          style={{ fontFamily: "var(--font-didot)" }}
        >
          {content.title}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-[#1C1C1C]/60 md:text-base"
          style={{ fontFamily: "var(--font-montserrat)" }}
        >
          {content.subtitle}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.75, delay: 0.2 }}
          className="mx-auto mt-12 w-full max-w-lg"
        >
          <article className="group flex flex-col overflow-hidden rounded-[2rem] border border-[#1C1C1C]/10 bg-white shadow-[0_8px_40px_-10px_rgba(168,121,25,0.18)] ring-1 ring-amber-200/60 transition duration-300 hover:-translate-y-2 hover:shadow-[0_32px_80px_-20px_rgba(28,28,28,0.5)]">

            {/* ── Image area ── */}
            <Link
              href="/products/himalayan-salt"
              className="relative block aspect-square overflow-hidden bg-[#F7F2EB]"
              aria-label="Himalayan Salt & Pepper Makhana"
            >
              <Image
                src="/flavor_himalayan_salt_new.png"
                alt="Sachet AÉRI Makhana Himalayan Salt and Pepper"
                fill
                priority={false}
                sizes="(max-width: 640px) 100vw, 512px"
                className="object-contain p-4 sm:p-8 transition-transform duration-700 group-hover:scale-[1.04]"
              />
              {/* SIGNATURE badge */}
              <div className="absolute left-4 top-4">
                <span
                  className="inline-flex rounded-full bg-amber-100 px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.22em] text-amber-900 shadow-sm"
                  style={{ fontFamily: "var(--font-montserrat)" }}
                >
                  ✦ {content.label}
                </span>
              </div>
            </Link>

            {/* ── Card body ── */}
            <div className="flex flex-col px-5 sm:px-8 pb-8 sm:pb-10 pt-5">
              <p
                className="mb-3 text-[9px] font-bold uppercase leading-4 tracking-[0.12em] text-[#55705B]"
                style={{ fontFamily: "var(--font-montserrat)" }}
              >
                Torréfié à l&apos;huile d&apos;olive · Jamais frit
              </p>

              <Link href="/products/himalayan-salt" className="block">
                <h3
                  className="text-3xl font-semibold leading-tight text-[#1D1B1A] md:text-4xl"
                  style={{ fontFamily: "var(--font-didot)" }}
                >
                  Makhana Graines Soufflées
                </h3>
              </Link>

              <p
                className="mt-3 text-base font-semibold leading-6 text-[#6A5B49]"
                style={{ fontFamily: "var(--font-montserrat)" }}
              >
                {content.product}
              </p>

              <p
                className="mt-6 text-3xl font-semibold text-[#1D1B1A]"
                style={{ fontFamily: "var(--font-didot)" }}
              >
                {content.price}
              </p>

              <Link
                href="/products/himalayan-salt"
                className="mt-6 inline-flex w-full min-h-14 items-center justify-center rounded-xl bg-[#1C1C1C] px-6 sm:px-8 py-4 text-sm font-bold uppercase tracking-[0.18em] text-white transition-all duration-300 hover:bg-[#343434] hover:scale-[1.02]"
                style={{ fontFamily: "var(--font-montserrat)" }}
              >
                {content.button}
              </Link>
            </div>
          </article>
        </motion.div>
      </div>
    </section>
  );
}
