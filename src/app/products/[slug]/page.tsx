"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";

/* ─── product catalogue ─── */
const productData: Record<
  string,
  {
    title: string;
    tagline: string;
    heroDesc: string;
    image: string;
    color: string;
    story: string;
    process: string;
    ingredients: string;
    allergens: string;
    nutrition: { label: string; value: string }[];
    pairings: string[];
    storage: string;
    weight: string;
    origin: string;
  }
> = {
  "himalayan-salt": {
    title: "Himalayan Salt",
    tagline: "Pure Simplicity, Elevated",
    heroDesc:
      "The timeless elegance of pink Himalayan salt meets the ethereal crunch of hand-popped Makhana. A minimalist masterpiece for the discerning palate.",
    image: "/flavor_salt.png",
    color: "#FDF6F0",
    story: "Sourced from the ancient Khewra salt mines at the foothills of the Himalayas, our pink salt carries over 84 trace minerals that have been preserved for 250 million years. When paired with the delicate, air-popped texture of Bihar's finest Makhana seeds, it creates a snack that is both profoundly simple and deeply satisfying. This is the flavor that started our journey — a tribute to the philosophy that the finest ingredients need nothing more than each other.",
    process:
      "Each Makhana seed is hand-harvested from the pristine ponds of Bihar, sun-dried for 48 hours, and then popped using traditional heat methods — no oil, no machines. The seeds are then lightly misted with cold-pressed extra virgin olive oil and dusted with finely ground Himalayan pink salt. The result is a snack with less than 2% fat content that delivers a satisfying crunch in every bite.",
    ingredients:
      "Popped Euryale Ferox seeds (Makhana) (92%), cold-pressed extra virgin olive oil (5%), Himalayan pink salt (3%).",
    allergens:
      "Naturally gluten-free. No nuts. No soy. No dairy. Produced in a facility that handles tree nuts and sesame.",
    nutrition: [
      { label: "Energy", value: "110 kcal" },
      { label: "Protein", value: "3.0 g" },
      { label: "Total Fat", value: "1.8 g" },
      { label: "Carbohydrates", value: "21 g" },
      { label: "Dietary Fiber", value: "1.4 g" },
      { label: "Sodium", value: "180 mg" },
      { label: "Calcium", value: "25 mg" },
      { label: "Iron", value: "0.8 mg" },
    ],
    pairings: [
      "Pairs beautifully with a crisp Chablis or Sauvignon Blanc",
      "Excellent alongside hummus or tzatziki",
      "A refined addition to any cheese board",
      "Perfect with sparkling water and a slice of lemon",
    ],
    storage:
      "Store in a cool, dry place away from direct sunlight. Once opened, reseal tightly and consume within 7 days for optimal crunch.",
    weight: "30g per serving · 90g per pack",
    origin:
      "Makhana: Bihar, India · Salt: Khewra, Pakistan · Olive Oil: Andalusia, Spain",
  },
  "herbes-de-provence": {
    title: "Herbes de Provence",
    tagline: "The Mediterranean Garden",
    heroDesc:
      "Thyme, rosemary, savory, oregano, and basil — the aromatic soul of Southern France captured in every air-popped Makhana seed.",
    image: "/flavor_herbes.png",
    color: "#F5F7F0",
    story: "The herbes de Provence blend is a love letter to the sun-drenched hillsides of Southern France, where wild herbs grow in abundance among the lavender fields. Our proprietary blend uses only whole dried herbs, hand-selected from certified organic farms in the Luberon valley. Each herb is harvested at peak potency and gently dried to preserve its essential oils. When combined with the neutral, airy canvas of Makhana, the herbs sing — delivering an aromatic experience that transports you to a Provençal garden with every handful.",
    process:
      "The Makhana seeds undergo our signature zero-oil popping process, then receive a fine coating of premium extra virgin olive oil sourced from century-old groves in Andalusia. The herbes de Provence are then precisely measured and tumbled with the seeds in small batches to ensure even distribution. Each batch is tasted by our quality team before packaging.",
    ingredients:
      "Popped Euryale Ferox seeds (Makhana) (88%), extra virgin olive oil (5%), herbes de Provence blend (thyme, rosemary, savory, oregano, basil) (5%), sea salt (2%).",
    allergens:
      "Naturally gluten-free. No nuts. No soy. No dairy. Produced in a facility that handles tree nuts and sesame.",
    nutrition: [
      { label: "Energy", value: "115 kcal" },
      { label: "Protein", value: "3.2 g" },
      { label: "Total Fat", value: "2.1 g" },
      { label: "Carbohydrates", value: "21 g" },
      { label: "Dietary Fiber", value: "1.6 g" },
      { label: "Sodium", value: "150 mg" },
      { label: "Calcium", value: "28 mg" },
      { label: "Iron", value: "1.0 mg" },
    ],
    pairings: [
      "Ideal with a chilled rosé from Provence",
      "Complements goat cheese and olive tapenade",
      "A gourmet alternative to croutons in salads",
      "Serve alongside grilled vegetables and dips",
    ],
    storage:
      "Store in a cool, dry place away from direct sunlight. Once opened, reseal tightly and consume within 7 days for optimal crunch.",
    weight: "30g per serving · 90g per pack",
    origin:
      "Makhana: Bihar, India · Herbs: Luberon, France · Olive Oil: Andalusia, Spain",
  },
  "black-truffle": {
    title: "Black Truffle",
    tagline: "The Black Gold of Apéro",
    heroDesc:
      "The intoxicating aroma of Périgord black truffle, elevated by the cloud-like lightness of Makhana. Accessible luxury, redefined.",
    image: "/flavor_truffle.png",
    color: "#F5F3F0",
    story: "The Périgord black truffle (Tuber Melanosporum) has been the crown jewel of French gastronomy for centuries. Prized by chefs worldwide for its deep, earthy, and slightly musky aroma, it transforms any dish it touches into something extraordinary. We worked with truffle artisans from the Dordogne region to develop a proprietary seasoning that captures the essence of freshly shaved truffle. Combined with the ethereal crunch of hand-popped Makhana and a whisper of Guérande sea salt, this is our most indulgent creation — proof that luxury and health can coexist beautifully.",
    process:
      "Our truffle seasoning is crafted from real summer black truffle pieces (Tuber Aestivum) combined with natural truffle aroma derived from the prestigious Périgord variety. The Makhana seeds are first lightly coated with extra virgin olive oil, then the truffle blend is carefully applied in our temperature-controlled facility to preserve the volatile aromatic compounds. Finally, a delicate finish of hand-harvested Guérande sea salt adds mineral complexity.",
    ingredients:
      "Popped Euryale Ferox seeds (Makhana) (86%), extra virgin olive oil (6%), summer black truffle pieces (Tuber Aestivum) (3%), natural truffle aroma (2%), Guérande sea salt (3%).",
    allergens:
      "Naturally gluten-free. No nuts. No soy. No dairy. Contains truffle. Produced in a facility that handles tree nuts and sesame.",
    nutrition: [
      { label: "Energy", value: "118 kcal" },
      { label: "Protein", value: "3.5 g" },
      { label: "Total Fat", value: "2.5 g" },
      { label: "Carbohydrates", value: "20.5 g" },
      { label: "Dietary Fiber", value: "1.5 g" },
      { label: "Sodium", value: "160 mg" },
      { label: "Calcium", value: "22 mg" },
      { label: "Iron", value: "0.9 mg" },
    ],
    pairings: [
      "Exceptional with a glass of aged Burgundy or Barolo",
      "Sublime alongside aged Comté or Parmigiano-Reggiano",
      "Elevates any charcuterie board to gastronomic heights",
      "Perfect with champagne for celebrations",
    ],
    storage:
      "Store in a cool, dry place away from direct sunlight. Once opened, reseal tightly and consume within 5 days to preserve truffle aroma.",
    weight: "30g per serving · 90g per pack",
    origin:
      "Makhana: Bihar, India · Truffle: Dordogne, France · Salt: Guérande, France",
  },
  "coming-soon": {
    title: "Coming Soon",
    tagline: "The Next Chapter",
    heroDesc:
      "Something extraordinary is in development. A new flavor experience that will push the boundaries of what a snack can be.",
    image: "/flavor_mystery.png",
    color: "#F5F5F7",
    story: "",
    process: "",
    ingredients: "",
    allergens: "",
    nutrition: [],
    pairings: [],
    storage: "",
    weight: "",
    origin: "",
  },
};

/* ─── animation helpers ─── */
const fadeUp: any = {
  hidden: { opacity: 0, y: 36 },
  visible: (d: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94], delay: d },
  }),
};

const fadeIn: any = {
  hidden: { opacity: 0 },
  visible: (d: number = 0) => ({
    opacity: 1,
    transition: { duration: 0.6, delay: d },
  }),
};

/* ─── component ─── */
export default function ProductDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const product = productData[slug];

  /* 404 */
  if (!product) {
    return (
      <main
        className="min-h-screen flex items-center justify-center"
        style={{
          backgroundColor: "#fef8f6",
          fontFamily: "var(--font-inter), sans-serif",
        }}
      >
        <div className="text-center">
          <h1
            className="text-5xl font-bold mb-4 tracking-tight"
            style={{
              color: "#1d1b1a",
              fontFamily: "var(--font-playfair), serif",
            }}
          >
            Product Not Found
          </h1>
          <Link
            href="/products"
            className="text-sm tracking-widest uppercase hover:opacity-70 transition-opacity"
            style={{ color: "#675d4e" }}
          >
            ← Back to Products
          </Link>
        </div>
      </main>
    );
  }

  const isComingSoon = slug === "coming-soon";

  return (
    <main
      className="min-h-screen"
      style={{
        backgroundColor: "#fef8f6",
        color: "#1d1b1a",
        fontFamily: "var(--font-inter), sans-serif",
      }}
    >
      {/* ════════ FIXED NAVBAR ════════ */}
      <header
        className="fixed top-0 left-0 right-0 z-[50] w-full flex justify-between items-center px-6 md:px-12 py-4 backdrop-blur-xl border-b"
        style={{
          backgroundColor: "rgba(254,248,246,0.8)",
          borderColor: "rgba(29,27,26,0.05)",
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <Link href="/">
            <h2
              className="text-xl tracking-[0.25em] uppercase font-semibold cursor-pointer"
              style={{
                color: "#1d1b1a",
                fontFamily: "var(--font-montserrat), sans-serif",
              }}
            >
              AÉRI
            </h2>
          </Link>
        </motion.div>

        <motion.nav
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="hidden md:flex gap-8 text-xs tracking-[0.2em] uppercase font-medium"
          style={{ color: "rgba(29,27,26,0.55)" }}
        >
          <Link
            href="/brand"
            className="hover:opacity-100 transition-opacity"
            style={{ opacity: 0.7 }}
          >
            The Brand
          </Link>
          <Link href="/products" style={{ color: "#1d1b1a", opacity: 1 }}>
            Products
          </Link>
          <Link
            href="/contact"
            className="hover:opacity-100 transition-opacity"
            style={{ opacity: 0.7 }}
          >
            Contact
          </Link>
        </motion.nav>
      </header>

      {/* ════════ HERO ════════ */}
      <section
        className="pt-32 pb-16 md:pt-40 md:pb-28 px-6 md:px-12"
        style={{ backgroundColor: product.color }}
      >
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-12 md:gap-20">
          {/* Text side */}
          <motion.div
            initial="hidden"
            animate="visible"
            className="w-full md:w-1/2 flex flex-col justify-center"
          >
            <motion.span
              variants={fadeUp}
              custom={0}
              className="text-[11px] font-semibold tracking-[0.35em] uppercase mb-5 block"
              style={{
                color: "#4c463e",
                fontFamily: "var(--font-montserrat), sans-serif",
              }}
            >
              {product.tagline}
            </motion.span>

            <motion.h1
              variants={fadeUp}
              custom={0.1}
              className="text-5xl md:text-7xl font-bold tracking-tight mb-6 leading-[1.05]"
              style={{ fontFamily: "var(--font-playfair), serif" }}
            >
              {product.title}
            </motion.h1>

            <motion.p
              variants={fadeUp}
              custom={0.2}
              className="text-[17px] leading-[1.8] mb-10 max-w-lg"
              style={{
                color: "#4c463e",
                fontFamily: "var(--font-lora), serif",
              }}
            >
              {product.heroDesc}
            </motion.p>

            {!isComingSoon && (
              <motion.div
                variants={fadeUp}
                custom={0.35}
                className="flex flex-wrap gap-4"
              >
                <button
                  className="px-8 py-4 rounded-2xl font-medium tracking-wide transition-all duration-300 hover:shadow-lg cursor-pointer"
                  style={{
                    backgroundColor: "#675d4e",
                    color: "#fff",
                    fontFamily: "var(--font-montserrat), sans-serif",
                    fontSize: "14px",
                    letterSpacing: "0.05em",
                  }}
                >
                  Order Now
                </button>
                <Link
                  href="/products"
                  className="px-8 py-4 rounded-2xl font-medium tracking-wide transition-all duration-300 hover:bg-[#1d1b1a]/5"
                  style={{
                    border: "1px solid rgba(29,27,26,0.12)",
                    fontFamily: "var(--font-montserrat), sans-serif",
                    fontSize: "14px",
                    letterSpacing: "0.05em",
                    color: "#1d1b1a",
                  }}
                >
                  All Products
                </Link>
              </motion.div>
            )}
          </motion.div>

          {/* Image side */}
          <motion.div
            initial={{ opacity: 0, scale: 0.88 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 0.9,
              delay: 0.2,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
            className="w-full md:w-1/2 flex justify-center"
          >
            <div
              className="relative w-[300px] h-[300px] md:w-[460px] md:h-[460px] group"
              style={{
                filter:
                  "drop-shadow(0 10px 30px rgba(29,27,26,0.15))",
              }}
            >
              <Image
                src={product.image}
                alt={product.title}
                fill
                className="object-contain transition-transform duration-700 ease-out group-hover:scale-105"
                priority
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* ════════ COMING SOON ════════ */}
      {isComingSoon ? (
        <section className="py-32 px-6 text-center">
          <motion.div
            initial="hidden"
            animate="visible"
            className="max-w-md mx-auto"
          >
            <motion.div
              variants={fadeIn}
              custom={0}
              className="w-20 h-20 rounded-full border-4 animate-spin mx-auto mb-10"
              style={{
                borderColor: "rgba(29,27,26,0.08)",
                borderTopColor: "#675d4e",
              }}
            />
            <motion.h2
              variants={fadeUp}
              custom={0.1}
              className="text-3xl font-bold mb-4"
              style={{ fontFamily: "var(--font-playfair), serif" }}
            >
              In Development
            </motion.h2>
            <motion.p
              variants={fadeUp}
              custom={0.2}
              className="mb-10 text-lg leading-relaxed"
              style={{
                color: "#4c463e",
                fontFamily: "var(--font-lora), serif",
              }}
            >
              Our team is crafting the next unforgettable flavor. Sign up to be
              the first to know when it launches.
            </motion.p>
            <motion.div
              variants={fadeUp}
              custom={0.3}
              className="flex justify-center gap-3"
            >
              <input
                type="email"
                placeholder="your@email.com"
                className="flex-1 px-5 py-3 rounded-xl focus:outline-none focus:ring-2 text-sm focus:ring-[#675d4e]/30"
                style={{
                  border: "1px solid rgba(29,27,26,0.1)",
                  fontFamily: "var(--font-inter), sans-serif",
                }}
              />
              <button
                className="px-6 py-3 rounded-xl font-medium transition-all duration-300 hover:opacity-90 shrink-0 cursor-pointer text-sm"
                style={{
                  backgroundColor: "#675d4e",
                  color: "#fff",
                  fontFamily: "var(--font-montserrat), sans-serif",
                }}
              >
                Notify Me
              </button>
            </motion.div>
          </motion.div>
        </section>
      ) : (
        <>
          {/* ════════ THE STORY ════════ */}
          <section className="py-20 md:py-28 px-6 md:px-12">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              className="max-w-3xl mx-auto"
            >
              <motion.h2
                variants={fadeUp}
                custom={0}
                className="text-3xl md:text-4xl font-bold mb-8"
                style={{ fontFamily: "var(--font-playfair), serif" }}
              >
                The Story
              </motion.h2>
              <motion.p
                variants={fadeUp}
                custom={0.1}
                className="text-[17px] leading-[2]"
                style={{
                  color: "rgba(29,27,26,0.65)",
                  fontFamily: "var(--font-lora), serif",
                }}
              >
                {product.story}
              </motion.p>
            </motion.div>
          </section>

          {/* subtle divider */}
          <div
            className="h-px max-w-3xl mx-auto"
            style={{ backgroundColor: "rgba(29,27,26,0.06)" }}
          />

          {/* ════════ HOW IT'S MADE ════════ */}
          <section className="py-20 md:py-28 px-6 md:px-12">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              className="max-w-3xl mx-auto"
            >
              <motion.h2
                variants={fadeUp}
                custom={0}
                className="text-3xl md:text-4xl font-bold mb-8"
                style={{ fontFamily: "var(--font-playfair), serif" }}
              >
                How It&apos;s Made
              </motion.h2>
              <motion.p
                variants={fadeUp}
                custom={0.1}
                className="text-[17px] leading-[2]"
                style={{
                  color: "rgba(29,27,26,0.65)",
                  fontFamily: "var(--font-lora), serif",
                }}
              >
                {product.process}
              </motion.p>
            </motion.div>
          </section>

          {/* ════════ NUTRITION & INGREDIENTS ════════ */}
          <section
            className="py-20 md:py-28 px-6 md:px-12"
            style={{ backgroundColor: "#f2edea" }}
          >
            <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Nutrition Table */}
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-60px" }}
                variants={fadeUp}
                custom={0}
                className="p-8 md:p-10 rounded-3xl"
                style={{
                  backgroundColor: "#fef8f6",
                  border: "1px solid rgba(29,27,26,0.05)",
                  boxShadow: "0 10px 30px -10px rgba(29,27,26,0.08)",
                }}
              >
                <h3
                  className="text-2xl font-bold mb-1"
                  style={{ fontFamily: "var(--font-playfair), serif" }}
                >
                  Nutritional Values
                </h3>
                <span
                  className="text-xs block mb-7"
                  style={{
                    color: "#4c463e",
                    fontFamily: "var(--font-inter), sans-serif",
                  }}
                >
                  per 30 g serving
                </span>

                <div className="space-y-0">
                  {product.nutrition.map((n, i) => (
                    <div
                      key={i}
                      className="flex justify-between items-center py-3"
                      style={{
                        borderBottom:
                          i < product.nutrition.length - 1
                            ? "1px solid rgba(29,27,26,0.06)"
                            : "none",
                      }}
                    >
                      <span
                        className="text-sm"
                        style={{ color: "#4c463e" }}
                      >
                        {n.label}
                      </span>
                      <span
                        className="text-sm font-semibold"
                        style={{ color: "#1d1b1a" }}
                      >
                        {n.value}
                      </span>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Ingredients + Allergens */}
              <div className="flex flex-col gap-6">
                <motion.div
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-60px" }}
                  variants={fadeUp}
                  custom={0.1}
                  className="p-8 rounded-3xl flex-1"
                  style={{
                    backgroundColor: "#fef8f6",
                    border: "1px solid rgba(29,27,26,0.05)",
                    boxShadow: "0 10px 30px -10px rgba(29,27,26,0.08)",
                  }}
                >
                  <h3
                    className="text-xl font-bold mb-3"
                    style={{ fontFamily: "var(--font-playfair), serif" }}
                  >
                    Ingredients
                  </h3>
                  <p
                    className="text-[15px] leading-relaxed"
                    style={{
                      color: "#4c463e",
                      fontFamily: "var(--font-lora), serif",
                    }}
                  >
                    {product.ingredients}
                  </p>
                </motion.div>

                <motion.div
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-60px" }}
                  variants={fadeUp}
                  custom={0.2}
                  className="p-8 rounded-3xl flex-1"
                  style={{
                    backgroundColor: "#fef8f6",
                    border: "1px solid rgba(29,27,26,0.05)",
                    boxShadow: "0 10px 30px -10px rgba(29,27,26,0.08)",
                  }}
                >
                  <h3
                    className="text-xl font-bold mb-3"
                    style={{ fontFamily: "var(--font-playfair), serif" }}
                  >
                    Allergen Information
                  </h3>
                  <p
                    className="text-[15px] leading-relaxed"
                    style={{
                      color: "#4c463e",
                      fontFamily: "var(--font-lora), serif",
                    }}
                  >
                    {product.allergens}
                  </p>
                </motion.div>
              </div>
            </div>
          </section>

          {/* ════════ PAIRINGS & DETAILS ════════ */}
          <section className="py-20 md:py-28 px-6 md:px-12">
            <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Pairing Suggestions */}
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-60px" }}
                variants={fadeUp}
                custom={0}
                className="p-8 rounded-3xl"
                style={{
                  backgroundColor: "#f2edea",
                  border: "1px solid rgba(29,27,26,0.05)",
                }}
              >
                <h3
                  className="text-xl font-bold mb-5"
                  style={{ fontFamily: "var(--font-playfair), serif" }}
                >
                  Pairing Suggestions
                </h3>
                <ul className="space-y-3">
                  {product.pairings.map((p, i) => (
                    <li
                      key={i}
                      className="text-sm leading-relaxed flex gap-2.5"
                      style={{
                        color: "#4c463e",
                        fontFamily: "var(--font-lora), serif",
                      }}
                    >
                      <span
                        className="mt-0.5 shrink-0"
                        style={{ color: "#cec5bb" }}
                      >
                        •
                      </span>
                      {p}
                    </li>
                  ))}
                </ul>
              </motion.div>

              {/* Storage + Pack Size */}
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-60px" }}
                variants={fadeUp}
                custom={0.1}
                className="p-8 rounded-3xl"
                style={{
                  backgroundColor: "#f2edea",
                  border: "1px solid rgba(29,27,26,0.05)",
                }}
              >
                <h3
                  className="text-xl font-bold mb-4"
                  style={{ fontFamily: "var(--font-playfair), serif" }}
                >
                  Storage
                </h3>
                <p
                  className="text-sm leading-relaxed mb-8"
                  style={{
                    color: "#4c463e",
                    fontFamily: "var(--font-lora), serif",
                  }}
                >
                  {product.storage}
                </p>

                <h3
                  className="text-xl font-bold mb-4"
                  style={{ fontFamily: "var(--font-playfair), serif" }}
                >
                  Pack Size
                </h3>
                <p
                  className="text-sm"
                  style={{
                    color: "#4c463e",
                    fontFamily: "var(--font-lora), serif",
                  }}
                >
                  {product.weight}
                </p>
              </motion.div>

              {/* Origin & Certifications */}
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-60px" }}
                variants={fadeUp}
                custom={0.2}
                className="p-8 rounded-3xl"
                style={{
                  backgroundColor: "#f2edea",
                  border: "1px solid rgba(29,27,26,0.05)",
                }}
              >
                <h3
                  className="text-xl font-bold mb-4"
                  style={{ fontFamily: "var(--font-playfair), serif" }}
                >
                  Origin &amp; Traceability
                </h3>
                <p
                  className="text-sm leading-relaxed"
                  style={{
                    color: "#4c463e",
                    fontFamily: "var(--font-lora), serif",
                  }}
                >
                  {product.origin}
                </p>

                <div
                  className="mt-7 pt-6"
                  style={{ borderTop: "1px solid rgba(29,27,26,0.08)" }}
                >
                  <span
                    className="text-[10px] uppercase tracking-[0.2em] block mb-2"
                    style={{
                      color: "#4c463e",
                      fontFamily: "var(--font-montserrat), sans-serif",
                    }}
                  >
                    Certifications
                  </span>
                  <p
                    className="text-sm font-semibold"
                    style={{ color: "#1d1b1a" }}
                  >
                    FSSAI · NABL · EU Compliant
                  </p>
                </div>
              </motion.div>
            </div>
          </section>

          {/* ════════ CTA ════════ */}
          <section
            className="py-24 px-6 text-center"
            style={{ backgroundColor: "#32302f" }}
          >
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
            >
              <motion.h2
                variants={fadeUp}
                custom={0}
                className="text-3xl md:text-4xl font-bold mb-4"
                style={{
                  color: "#fef8f6",
                  fontFamily: "var(--font-playfair), serif",
                }}
              >
                Ready to Taste?
              </motion.h2>
              <motion.p
                variants={fadeUp}
                custom={0.1}
                className="max-w-lg mx-auto mb-10 text-[16px]"
                style={{
                  color: "rgba(254,248,246,0.5)",
                  fontFamily: "var(--font-lora), serif",
                }}
              >
                Experience the perfect balance of tradition and innovation.
              </motion.p>
              <motion.div variants={fadeUp} custom={0.2}>
                <Link
                  href="/products"
                  className="inline-block px-9 py-4 rounded-2xl font-medium transition-all duration-300 hover:opacity-90 text-sm tracking-wide"
                  style={{
                    backgroundColor: "#fef8f6",
                    color: "#32302f",
                    fontFamily: "var(--font-montserrat), sans-serif",
                    letterSpacing: "0.05em",
                  }}
                >
                  Explore All Flavors
                </Link>
              </motion.div>
            </motion.div>
          </section>
        </>
      )}
    </main>
  );
}
