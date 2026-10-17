"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { useCart } from "@/context/CartContext";
import { useContactModal } from "@/context/ContactModalContext";
import toast from "react-hot-toast";
import { useCurrency } from "@/context/CurrencyContext";

type Product = {
  id: string;
  slug: string;
  name: string;
  category: string;
  flavor?: string;
  description: string;
  basePrice?: number;
  basePriceINR?: number;
  customPriceLabel?: string;
  image: string;
  altText: string;
  isB2B?: boolean;
  inStock?: boolean;
};

type LocaleCopy = {
  title: string;
  subtitle: string;
  collectionLabel: string;
  addToCart: string;
  addedToCart: string;
  outOfStock: string;
  b2bButton: string;
  roastBadge: string;
  products: Product[];
};

const frenchProducts: Product[] = [
  {
    id: "himalayan-salt",
    slug: "himalayan-salt",
    name: "Sel de l'Himalaya & Poivre",
    category: "SIGNATURE",
    description: "Graines de Makhana soufflées - Sel rose de l'Himalaya et poivre (30g).",
    basePrice: 2.99,
    basePriceINR: 59,
    image: "/flavor_himalayan_salt_new.png",
    altText: "AÉRI Himalayan Salt & Pepper makhana pack",
  },
  {
    id: "truffle",
    slug: "black-truffle",
    name: "Fusion Truffe Noire",
    category: "GOURMET",
    description: "Graines de Makhana soufflées - Saveur Truffe Noire (30g).",
    basePrice: 2.99,
    basePriceINR: 79,
    image: "/products/product2.png",
    altText: "AÉRI Gourmet Truffle makhana pack",
  },
  {
    id: "dark-chocolate",
    slug: "dark-chocolate",
    name: "Chocolat Noir 70%",
    category: "SUCRÉ",
    description:
      "Graines de Makhana soufflées - Enrobage fin au chocolat noir 70% (30g).",
    basePrice: 2.99,
    basePriceINR: 99,
    image: "/flavor_dark_chocolate.png",
    altText: "AÉRI 70% Dark Chocolate makhana pack",
  },
  {
    id: "raw",
    slug: "raw-phool-makhana",
    name: "Raw Phool Makhana",
    category: "BULK EXPORT",
    description:
      "Graines de Phool Makhana de qualité export (4 à 6 suta).",
    customPriceLabel: "Bulk quantities available.",
    image: "/bulk makhana.png",
    altText: "Raw Phool Makhana bulk export kernels",
    isB2B: true,
  },
];

const englishProducts: Product[] = [
  {
    id: "himalayan-salt",
    slug: "himalayan-salt",
    name: "Himalayan Salt & Pepper",
    category: "SIGNATURE",
    description: "Puffed Makhana - Pink Himalayan salt and pepper (30g).",
    basePrice: 2.99,
    basePriceINR: 59,
    image: "/flavor_himalayan_salt_new.png",
    altText: "AÉRI Himalayan Salt & Pepper makhana pack",
  },
  {
    id: "truffle",
    slug: "black-truffle",
    name: "Gourmet Truffle Fusion",
    category: "GOURMET",
    description: "Puffed Makhana - Black truffle flavor (30g).",
    basePrice: 2.99,
    basePriceINR: 79,
    image: "/products/product2.png",
    altText: "AÉRI Gourmet Truffle makhana pack",
  },
  {
    id: "dark-chocolate",
    slug: "dark-chocolate",
    name: "Dark Chocolate 70%",
    category: "SWEET",
    description: "Puffed Makhana - Delicately coated in 70% dark chocolate (30g).",
    basePrice: 2.99,
    basePriceINR: 99,
    image: "/flavor_dark_chocolate.png",
    altText: "AÉRI 70% Dark Chocolate makhana pack",
  },
  {
    id: "raw",
    slug: "raw-phool-makhana",
    name: "Raw Phool Makhana",
    category: "BULK EXPORT",
    description:
      "Export-grade raw Phool Makhana in 4, 5 and 6+ suta, handpicked.",
    customPriceLabel: "Bulk quantities available.",
    image: "/bulk makhana.png",
    altText: "Raw Phool Makhana bulk export kernels",
    isB2B: true,
  },
];

const copy: Record<"fr" | "en", LocaleCopy> = {
  fr: {
    title: "Notre Gamme de Makhana",
    subtitle: "Our current range.",
    collectionLabel: "Collection AÉRI",
    addToCart: "Ajouter au Panier",
    addedToCart: "Ajouté au panier !",
    outOfStock: "Rupture de stock",
    b2bButton: "Contact Us",
    roastBadge: "Slow roasted - Never fried",
    products: frenchProducts,
  },
  en: {
    title: "Our Makhana Range",
    subtitle: "Our current range.",
    collectionLabel: "AÉRI Collection",
    addToCart: "Add to Cart",
    addedToCart: "Added to cart!",
    outOfStock: "Out of Stock",
    b2bButton: "Contact Us",
    roastBadge: "Slow roasted - Never fried",
    products: englishProducts,
  },
};

const categoryColors: Record<string, string> = {
  SIGNATURE: "bg-amber-100 text-amber-900",
  GOURMET: "bg-stone-200 text-stone-800",
  SUCRÉ: "bg-orange-100 text-orange-900",
  SWEET: "bg-orange-100 text-orange-900",
  "BULK EXPORT": "bg-sky-100 text-sky-900",
};

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.55,
      delay: Math.min(index * 0.06, 0.36),
      ease: [0.22, 1, 0.36, 1] as const,
    },
  }),
};

export default function FlavorExplorer() {
  const { lang } = useLanguage();
  const { getPrice, formatAmount } = useCurrency();
  const content = copy[lang === "en" ? "en" : "fr"];
  const { addToCart } = useCart();
  const { openModal } = useContactModal();
  const [addedIds, setAddedIds] = useState<Set<string>>(new Set());

  const handleAddToCart = (product: Product) => {
    if (product.basePrice === undefined) return;
    addToCart({
      id: product.id,
      name: product.name,
      basePrice: product.basePrice,
      basePriceINR: product.basePriceINR,
      image: product.image,
    });

    setAddedIds((prev) => new Set([...prev, product.id]));
    toast.success(content.addedToCart, { duration: 2000 });

    setTimeout(() => {
      setAddedIds((prev) => {
        const next = new Set(prev);
        next.delete(product.id);
        return next;
      });
    }, 2000);
  };

  return (
    <section
      id="gamme"
      className="relative bg-[#FAF8F5] py-20 md:py-28"
      aria-labelledby="product-grid-title"
    >
      <div className="mx-auto mb-12 max-w-5xl px-6 text-center md:mb-16">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mb-4 text-[11px] font-semibold uppercase tracking-[0.32em] text-[#6C6257]"
          style={{ fontFamily: "var(--font-montserrat)" }}
        >
          {content.collectionLabel}
        </motion.p>
        <motion.h2
          id="product-grid-title"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.75 }}
          className="text-4xl font-semibold tracking-tight text-[#1D1B1A] md:text-5xl"
          style={{ fontFamily: "var(--font-didot)" }}
        >
          {content.title}
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="mx-auto mt-5 max-w-3xl text-sm leading-7 text-[#4C463E] md:text-base font-medium"
          style={{ fontFamily: "var(--font-montserrat)" }}
        >
          {content.subtitle}
        </motion.p>
      </div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.08 }}
        className="mx-auto grid max-w-[1440px] grid-cols-1 gap-5 px-5 sm:grid-cols-2 md:px-8 xl:grid-cols-4"
      >
        {content.products.map((product, index) => (
          <motion.article
            key={product.id}
            custom={index}
            variants={fadeUp}
            className={`group flex h-full flex-col overflow-hidden rounded-[1.5rem] border bg-white transition duration-300 hover:-translate-y-1 hover:shadow-lg ${
              product.isB2B
                ? "border-sky-900/20"
                : "border-[#1C1C1C]/10"
            }`}
          >
            <Link
              href={product.isB2B ? "/raw-phool-makhana" : `/products/${product.slug}`}
              className="relative block aspect-square overflow-hidden bg-[#F7F2EB]"
              aria-label={product.name}
            >
              <Image
                src={product.image}
                alt={product.altText}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 25vw"
                className="object-contain p-5 transition-transform duration-500 group-hover:scale-[1.035]"
              />
              <div className="absolute left-4 top-4">
                <span
                  className={`inline-flex rounded-full px-3 py-1 text-[9px] font-bold uppercase tracking-[0.16em] ${
                    categoryColors[product.category] ||
                    "bg-stone-100 text-stone-800"
                  }`}
                  style={{ fontFamily: "var(--font-montserrat)" }}
                >
                  {product.category}
                </span>
              </div>
            </Link>

            <div className="flex flex-1 flex-col p-5">
              {!product.isB2B && (
                <p
                  className="mb-3 text-[9px] font-bold uppercase leading-4 tracking-[0.12em] text-[#55705B]"
                  style={{ fontFamily: "var(--font-montserrat)" }}
                >
                  {content.roastBadge}
                </p>
              )}

              <Link
                href={product.isB2B ? "/raw-phool-makhana" : `/products/${product.slug}`}
                className="block"
              >
                <h3
                  className="text-xl font-semibold leading-tight text-[#1D1B1A]"
                  style={{ fontFamily: "var(--font-didot)" }}
                >
                  {product.name}
                </h3>
              </Link>

              <p
                className="mt-3 flex-1 text-sm leading-6 text-[#4C463E]/80"
                style={{ fontFamily: "var(--font-montserrat)" }}
              >
                {product.description}
              </p>

              <p
                className={`mt-5 font-semibold text-[#1D1B1A] ${
                  product.isB2B ? "text-sm leading-5" : "text-lg"
                }`}
                style={{
                  fontFamily: product.isB2B
                    ? "var(--font-montserrat)"
                    : "var(--font-didot)",
                }}
              >
                {product.isB2B
                  ? product.customPriceLabel
                  : (product.basePrice !== undefined || product.basePriceINR !== undefined)
                  ? `${formatAmount(getPrice(product))} / 30g`
                  : ""}
              </p>

              {product.isB2B ? (
                <button
                  type="button"
                  onClick={() => openModal("Raw Phool Makhana")}
                  className="mt-5 inline-flex min-h-[44px] items-center justify-center rounded-xl bg-[#1C1C1C] px-5 py-3 text-center text-xs font-bold uppercase tracking-[0.13em] text-white transition-colors hover:bg-black active:scale-95 cursor-pointer shadow-sm"
                  style={{ fontFamily: "var(--font-montserrat)" }}
                >
                  Contact Us
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => handleAddToCart(product)}
                  disabled={addedIds.has(product.id)}
                  className={`mt-5 min-h-[44px] rounded-xl px-5 py-3 text-xs font-bold uppercase tracking-[0.13em] text-white transition-all duration-300 ${
                    addedIds.has(product.id)
                      ? "bg-green-700 scale-95"
                      : "bg-[#1C1C1C] hover:bg-black active:scale-95"
                  }`}
                  style={{ fontFamily: "var(--font-montserrat)" }}
                >
                  {addedIds.has(product.id) ? content.addedToCart : content.addToCart}
                </button>
              )}
            </div>
          </motion.article>
        ))}
      </motion.div>
    </section>
  );
}
