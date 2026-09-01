"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { useCart } from "@/context/CartContext";
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
    description: "Graines de Makhana soufflées - Sel rose de l'Himalaya et poivre.",
    basePrice: 2.99,
    basePriceINR: 59,
    image: "/flavor_himalayan_salt_new.png",
  },
  {
    id: "truffle",
    slug: "black-truffle",
    name: "Fusion Truffe Noire",
    category: "GOURMET",
    description: "Graines de Makhana soufflées - Saveur Truffe Noire.",
    basePrice: 2.99,
    basePriceINR: 79,
    image: "/products/product2.png",
  },
  {
    id: "dark-chocolate",
    slug: "dark-chocolate",
    name: "Chocolat Noir 70%",
    category: "SUCRÉ",
    description:
      "Graines de Makhana soufflées - Enrobage fin au chocolat noir 70%.",
    basePrice: 2.99,
    basePriceINR: 99,
    image: "/flavor_dark_chocolate.png",
  },
  {
    id: "raw",
    slug: "raw-bulk-kernels",
    name: "Vrac Premium (Makhana Cru)",
    category: "B2B / VRAC",
    description:
      "Makhana premium en vrac pour grossistes, distributeurs et marques privées.",
    customPriceLabel: "Tarifs dégressifs au container - Devis sur demande.",
    image: "/bulk makhana.png",
    isB2B: true,
  },
  {
    id: "caramel-salt",
    slug: "caramel-salt",
    name: "Caramel & Sel",
    category: "SUCRÉ",
    description:
      "Graines de Makhana soufflées - Caramel doré et pointe de sel.",
    basePrice: 2.99,
    basePriceINR: 65,
    image: "/flavor_caramel_salt.png",
    inStock: false,
  },
  {
    id: "herb",
    slug: "mediterranean-herb-fusion",
    name: "Herbes de Provence",
    category: "VÉGÉTAL",
    description: "Graines de Makhana soufflées - Aux Herbes de Provence.",
    basePrice: 2.99,
    basePriceINR: 65,
    image: "/products/product3.png",
    inStock: false,
  },
  {
    id: "lemon-mint",
    slug: "lemon-mint",
    name: "Citron & Menthe",
    category: "VÉGÉTAL",
    description:
      "Graines de Makhana soufflées - Fraîcheur citronnée et menthe.",
    basePrice: 2.99,
    basePriceINR: 65,
    image: "/flavor_lemon_mint.png",
    inStock: false,
  },
  {
    id: "peanut-butter",
    slug: "peanut-butter",
    name: "Beurre de Cacahuète",
    category: "GOURMET",
    description:
      "Graines de Makhana soufflées - Saveur cacahuète torréfiée.",
    basePrice: 2.99,
    basePriceINR: 65,
    image: "/flavor_peanut_butter.png",
    inStock: false,
  },
  {
    id: "peri-peri",
    slug: "peri-peri",
    name: "Péri-Péri",
    category: "ÉPICÉ",
    description:
      "Graines de Makhana soufflées - Piment, agrumes et ail.",
    basePrice: 2.99,
    basePriceINR: 65,
    image: "/flavor_peri_peri.png",
    inStock: false,
  },
  {
    id: "smokey-bbq",
    slug: "smokey-bbq",
    name: "BBQ Fumé",
    category: "GOURMET",
    description:
      "Graines de Makhana soufflées - Notes fumées et épices savoureuses.",
    basePrice: 2.99,
    basePriceINR: 65,
    image: "/flavor_smokey_bbq.png",
    inStock: false,
  },
  {
    id: "tangy-tomato",
    slug: "tangy-tomato",
    name: "Tomate Acidulée",
    category: "VÉGÉTAL",
    description:
      "Graines de Makhana soufflées - Tomate mûrie au soleil et herbes.",
    basePrice: 2.99,
    basePriceINR: 65,
    image: "/products/tomato.png",
    inStock: false,
  },
  {
    id: "trio-bundle",
    slug: "trio-bundle",
    name: "Pack Découverte - 3 Saveurs",
    category: "SIGNATURE",
    description: "Sel de l'Himalaya, Fusion Truffe Noire, et Chocolat Noir 70%.",
    basePrice: 8.99,
    basePriceINR: 199,
    image: "/products/product2.png",
  },
  {
    id: "six-pack-bundle",
    slug: "six-pack-bundle",
    name: "Pack Famille - 6 Sachets",
    category: "SIGNATURE",
    description: "Un assortiment généreux de nos saveurs les plus populaires.",
    basePrice: 17.50,
    basePriceINR: 379,
    image: "/flavor_himalayan_salt_new.png",
  },
  {
    id: "nine-pack-bundle",
    slug: "nine-pack-bundle",
    name: "Pack Dégustation - 9 Sachets",
    category: "SIGNATURE",
    description: "L'expérience complète AÉRI avec notre sélection premium.",
    basePrice: 25.00,
    basePriceINR: 549,
    image: "/flavor_dark_chocolate.png",
  },
];

const englishProducts: Product[] = frenchProducts.map((product) => {
  const localized: Record<string, Partial<Product>> = {
    "himalayan-salt": {
      name: "Himalayan Salt & Pepper",
      description: "Puffed Makhana - Pink Himalayan salt and pepper.",
    },
    "truffle": {
      name: "Gourmet Truffle Fusion",
      description: "Puffed Makhana - Black Truffle flavor.",
    },
    "herb": {
      name: "Mediterranean Herb Fusion",
      description: "Puffed Makhana - Herbes de Provence.",
    },
    "caramel-salt": {
      name: "Caramel & Sea Salt",
      description: "Puffed Makhana - Golden caramel with a touch of sea salt.",
      category: "SWEET",
    },
    "dark-chocolate": {
      name: "Dark Chocolate 70%",
      description: "Puffed Makhana - Delicately coated in 70% dark chocolate.",
      category: "SWEET",
    },
    "lemon-mint": {
      name: "Lemon & Mint",
      description: "Puffed Makhana - Bright lemon and cooling mint.",
      category: "PLANT-BASED",
    },
    "peanut-butter": {
      name: "Peanut Butter",
      description: "Puffed Makhana - Roasted peanut flavor.",
    },
    "peri-peri": {
      name: "Peri-Peri",
      description: "Puffed Makhana - Chili, citrus, and garlic.",
      category: "SPICY",
    },
    "smokey-bbq": {
      name: "Smokey BBQ",
      description: "Puffed Makhana - Deep smoky notes and savory spices.",
    },
    "tangy-tomato": {
      name: "Tangy Tomato",
      description: "Puffed Makhana - Sun-ripened tomato and herbs.",
      category: "PLANT-BASED",
    },
    raw: {
      name: "Raw Premium Bulk Kernels",
      description:
        "Premium bulk Makhana for wholesalers, distributors, and private labels.",
      customPriceLabel: "Tiered container pricing - Quote on request.",
    },
    "trio-bundle": {
      name: "Trio Discovery Pack",
      description: "Himalayan Salt & Pepper, Gourmet Truffle, and Dark Chocolate 70%.",
    },
    "six-pack-bundle": {
      name: "Family Pack - 6 Bags",
      description: "A generous assortment of our most popular flavors.",
    },
    "nine-pack-bundle": {
      name: "Ultimate Pack - 9 Bags",
      description: "The complete AÉRI experience with our premium selection.",
    },
  };

  return { ...product, ...localized[product.id] };
});

/* ─── Bilingual helper for DB-sourced products ───────────────────────────
   When an admin adds a product with both EN and FR fields, this function
   returns the correct localized name/description based on current language.
   Falls back to English if French translation is missing.
─────────────────────────────────────────────────────────────────────── */
export function getLocalizedProduct(
  product: {
    name?: string;
    nameFr?: string;
    description?: string;
    descriptionFr?: string;
    shortDescription?: string;
    shortDescriptionFr?: string;
    [key: string]: any;
  },
  lang: string
): { name: string; description: string; shortDescription: string } {
  const isFrench = lang === "fr";
  return {
    name: isFrench
      ? (product.nameFr?.trim() || product.name || "")
      : (product.name || ""),
    description: isFrench
      ? (product.descriptionFr?.trim() || product.description || "")
      : (product.description || ""),
    shortDescription: isFrench
      ? (product.shortDescriptionFr?.trim() || product.shortDescription || "")
      : (product.shortDescription || ""),
  };
}

const copy: Record<"fr" | "en", LocaleCopy> = {
  fr: {
    title: "Notre Gamme de Makhana",
    subtitle:
      "Les trois créations fondatrices AÉRI, notre gamme complète de saveurs et une offre vrac dédiée aux acheteurs professionnels.",
    collectionLabel: "Collection AÉRI",
    addToCart: "Ajouter au Panier",
    addedToCart: "Ajouté au panier !",
    outOfStock: "Rupture de stock",
    b2bButton: "Formulaire B2B",
    roastBadge: "Torréfié à l'huile d'olive - Jamais frit",
    products: frenchProducts,
  },
  en: {
    title: "Our Makhana Range",
    subtitle:
      "The three founding AÉRI creations, our complete flavor range, and a bulk offer for professional buyers.",
    collectionLabel: "AÉRI Collection",
    addToCart: "Add to Cart",
    addedToCart: "Added to cart!",
    outOfStock: "Out of Stock",
    b2bButton: "B2B Form",
    roastBadge: "Roasted in olive oil - Never fried",
    products: englishProducts,
  },
};

const categoryColors: Record<string, string> = {
  SIGNATURE: "bg-amber-100 text-amber-900",
  GOURMET: "bg-stone-200 text-stone-800",
  VÉGÉTAL: "bg-emerald-100 text-emerald-900",
  "PLANT-BASED": "bg-emerald-100 text-emerald-900",
  SUCRÉ: "bg-orange-100 text-orange-900",
  SWEET: "bg-orange-100 text-orange-900",
  ÉPICÉ: "bg-red-100 text-red-900",
  SPICY: "bg-red-100 text-red-900",
  "B2B / VRAC": "bg-sky-100 text-sky-900",
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

    // Reset button after 2s
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
          className="mx-auto mt-5 max-w-3xl text-sm leading-7 text-[#4C463E] md:text-base"
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
            className={`group flex h-full flex-col overflow-hidden rounded-[1.5rem] border bg-white transition duration-300 hover:-translate-y-1 hover:shadow-[0_20px_55px_-30px_rgba(28,28,28,0.45)] ${
              product.isB2B
                ? "border-sky-900/20"
                : "border-[#1C1C1C]/10"
            }`}
          >
            <Link
              href={`/products/${product.slug}`}
              className="relative block aspect-square overflow-hidden bg-[#F7F2EB]"
              aria-label={product.name}
            >
              <Image
                src={product.image}
                alt={
                  product.isB2B
                    ? "Raw premium bulk Makhana kernels"
                    : `Sachet AÉRI ${product.name}`
                }
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

              <Link href={`/products/${product.slug}`} className="block">
                <h3
                  className="text-xl font-semibold leading-tight text-[#1D1B1A]"
                  style={{ fontFamily: "var(--font-didot)" }}
                >
                  {product.name}
                </h3>
              </Link>

              {product.flavor && (
                <p
                  className="mt-2 text-sm font-semibold leading-5 text-[#6A5B49]"
                  style={{ fontFamily: "var(--font-montserrat)" }}
                >
                  {product.flavor}
                </p>
              )}

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
                  : product.inStock === false
                      ? ""
                      : (product.basePrice !== undefined || product.basePriceINR !== undefined)
                          ? `${formatAmount(getPrice(product))} / ${product.id.includes("bundle") ? "pack" : "30g"}`
                          : ""
                }
              </p>

              {product.isB2B ? (
                <Link
                  href="/espace-pro#demande-professionnelle"
                  className="mt-5 inline-flex min-h-11 items-center justify-center rounded-xl bg-[#1C1C1C] px-5 py-3 text-center text-xs font-bold uppercase tracking-[0.13em] text-white transition-colors hover:bg-[#343434]"
                  style={{ fontFamily: "var(--font-montserrat)" }}
                >
                  {content.b2bButton}
                </Link>
              ) : product.inStock === false ? (
                <button
                  type="button"
                  disabled
                  className="mt-5 min-h-11 rounded-xl px-5 py-3 text-xs font-bold uppercase tracking-[0.13em] text-white transition-all duration-300 bg-stone-400 cursor-not-allowed"
                  style={{ fontFamily: "var(--font-montserrat)" }}
                >
                  {content.outOfStock}
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => handleAddToCart(product)}
                  disabled={addedIds.has(product.id)}
                  className={`mt-5 min-h-11 rounded-xl px-5 py-3 text-xs font-bold uppercase tracking-[0.13em] text-white transition-all duration-300 ${
                    addedIds.has(product.id)
                      ? "bg-green-700 scale-95"
                      : "bg-[#1C1C1C] hover:bg-[#343434]"
                  }`}
                  style={{ fontFamily: "var(--font-montserrat)" }}
                >
                  {addedIds.has(product.id) ? "✓ " + content.addedToCart : content.addToCart}
                </button>
              )}
            </div>
          </motion.article>
        ))}
      </motion.div>


    </section>
  );
}
