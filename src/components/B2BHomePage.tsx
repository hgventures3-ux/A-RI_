"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// ── Animation variants ──────────────────────────────────────────────────────
const fadeUp: any = {
  hidden: { opacity: 0, y: 30 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay, ease: "easeOut" },
  }),
};

const fadeIn: any = {
  hidden: { opacity: 0 },
  visible: (delay = 0) => ({
    opacity: 1,
    transition: { duration: 0.5, delay, ease: "easeOut" },
  }),
};

// ── Types ────────────────────────────────────────────────────────────────────
interface QuoteFormData {
  name: string;
  company: string;
  country: string;
  email: string;
  phone: string;
  product: string;
  quantity: string;
  message: string;
}

// ── Sub-components ───────────────────────────────────────────────────────────

function SectionHeading({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <h2
      className={`text-3xl md:text-4xl font-bold text-[#1C1C1C] ${className}`}
      style={{ fontFamily: "var(--font-didot)" }}
    >
      {children}
    </h2>
  );
}

function BlackButton({
  href,
  children,
  className = "",
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={`inline-flex items-center justify-center px-6 py-3 bg-[#1C1C1C] text-[#FAF8F5] text-sm font-semibold tracking-wide rounded-lg hover:bg-[#333] transition-all duration-200 ${className}`}
      style={{ fontFamily: "var(--font-montserrat)" }}
    >
      {children}
    </Link>
  );
}

// ── Section 1: Hero ──────────────────────────────────────────────────────────
function HeroSection() {
  return (
    <section className="min-h-[85vh] bg-[#FAF8F5] flex items-center">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-12 py-20 w-full">
        <motion.div
          initial="hidden"
          animate="visible"
          className="max-w-3xl"
        >
          {/* Badge */}
          <motion.span
            custom={0.1}
            variants={fadeUp}
            className="inline-flex items-center gap-2 px-3 py-1.5 mb-6 rounded-full border border-[#1C1C1C]/20 text-[11px] font-semibold tracking-[0.3em] uppercase text-[#1C1C1C]/70"
            style={{ fontFamily: "var(--font-montserrat)" }}
          >
            INDIA → WORLD
          </motion.span>

          {/* H1 */}
          <motion.h1
            custom={0.2}
            variants={fadeUp}
            className="text-4xl md:text-6xl font-bold text-[#1C1C1C] leading-[1.1] mb-6"
            style={{ fontFamily: "var(--font-didot)" }}
          >
            Raw Phool Makhana (Fox Nuts) and Private-Label Roasted Makhana,
            Exported from India
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            custom={0.35}
            variants={fadeUp}
            className="text-lg text-[#1C1C1C]/70 mb-8 leading-relaxed"
            style={{ fontFamily: "var(--font-lora)" }}
          >
            4 to 6 suta grades · Low MOQ · ~1 week production · Certified
            partner facilities
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            custom={0.45}
            variants={fadeUp}
            className="flex flex-wrap gap-3 mb-6"
          >
            <BlackButton href="/espace-pro">Request a Quote</BlackButton>
            <Link
              href="/raw-phool-makhana"
              className="inline-flex items-center justify-center px-6 py-3 border border-[#1C1C1C] text-[#1C1C1C] text-sm font-semibold tracking-wide rounded-lg hover:bg-[#1C1C1C] hover:text-[#FAF8F5] transition-all duration-200"
              style={{ fontFamily: "var(--font-montserrat)" }}
            >
              View Grades &amp; Specs
            </Link>
          </motion.div>

          {/* Trust line */}
          <motion.p
            custom={0.55}
            variants={fadeUp}
            className="text-xs text-[#1C1C1C]/50 tracking-wide"
            style={{ fontFamily: "var(--font-montserrat)" }}
          >
            100% export-grade. FOB Mundra. Documentation provided.
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}

// ── Section 2: Trust Strip ───────────────────────────────────────────────────
const CERT_BADGES = [
  "US-FDA",
  "BRCGS",
  "FSSC 22000",
  "FSSAI Central",
  "Halal",
  "Kosher",
];

function TrustStrip() {
  return (
    <section className="bg-[#1C1C1C] py-6">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <p
          className="text-center text-xs text-white/50 mb-4 tracking-wide"
          style={{ fontFamily: "var(--font-montserrat)" }}
        >
          Certificates available on request, held by our partner facilities
        </p>
        <div className="flex gap-3 overflow-x-auto pb-1 justify-start md:justify-center scrollbar-none">
          {CERT_BADGES.map((badge) => (
            <span
              key={badge}
              className="flex-shrink-0 px-4 py-1.5 rounded-full border border-white/30 text-white text-[11px] font-semibold tracking-[0.1em] whitespace-nowrap"
              style={{ fontFamily: "var(--font-montserrat)" }}
            >
              {badge}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Section 3: What We Supply ────────────────────────────────────────────────
const SUPPLY_CARDS = [
  {
    icon: (
      <svg
        width="36"
        height="36"
        viewBox="0 0 36 36"
        fill="none"
        aria-hidden="true"
      >
        <circle cx="18" cy="18" r="16" stroke="#1C1C1C" strokeWidth="1.5" />
        <circle cx="18" cy="18" r="8" stroke="#1C1C1C" strokeWidth="1.5" />
        <circle cx="18" cy="18" r="3" fill="#1C1C1C" />
        <circle cx="18" cy="6" r="2" fill="#1C1C1C/30" stroke="#1C1C1C" strokeWidth="1" />
        <circle cx="18" cy="30" r="2" fill="#1C1C1C/30" stroke="#1C1C1C" strokeWidth="1" />
        <circle cx="6" cy="18" r="2" fill="#1C1C1C/30" stroke="#1C1C1C" strokeWidth="1" />
        <circle cx="30" cy="18" r="2" fill="#1C1C1C/30" stroke="#1C1C1C" strokeWidth="1" />
      </svg>
    ),
    title: "Raw Phool Makhana",
    body: "4, 4+, 5, 5+, 6 suta grades. Clean, moisture-controlled, food-grade packed. 10 kg bags or bulk.",
  },
  {
    icon: (
      <svg
        width="36"
        height="36"
        viewBox="0 0 36 36"
        fill="none"
        aria-hidden="true"
      >
        <rect x="4" y="8" width="28" height="20" rx="3" stroke="#1C1C1C" strokeWidth="1.5" />
        <path d="M4 14h28" stroke="#1C1C1C" strokeWidth="1.5" />
        <path d="M13 8v6M23 8v6" stroke="#1C1C1C" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="12" cy="22" r="2" fill="#1C1C1C" />
        <circle cx="18" cy="22" r="2" fill="#1C1C1C" />
        <circle cx="24" cy="22" r="2" fill="#1C1C1C" />
      </svg>
    ),
    title: "Private-Label Roasted Makhana",
    body: "Your brand, our production. Himalayan Salt, Truffle, Dark Chocolate or custom flavor. 15,000 pouches MOQ.",
  },
  {
    icon: (
      <svg
        width="36"
        height="36"
        viewBox="0 0 36 36"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M18 4L22 12H30L24 18L26 28L18 22L10 28L12 18L6 12H14L18 4Z"
          stroke="#1C1C1C"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
      </svg>
    ),
    title: "AÉRI Makhana Brand",
    body: "Finished retail product for distributors and importers. EU-ready packaging. Suitable for retail shelves.",
  },
];

function WhatWeSupply() {
  return (
    <section className="bg-white py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="text-center mb-14"
        >
          <motion.div variants={fadeUp} custom={0}>
            <SectionHeading>What We Supply</SectionHeading>
          </motion.div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {SUPPLY_CARDS.map((card, i) => (
            <motion.div
              key={card.title}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              custom={i * 0.15}
              variants={fadeUp}
              className="flex flex-col p-8 border border-[#1C1C1C]/10 rounded-2xl bg-[#FAF8F5] hover:shadow-md transition-shadow duration-300"
            >
              <div className="mb-5">{card.icon}</div>
              <h3
                className="text-lg font-bold text-[#1C1C1C] mb-3"
                style={{ fontFamily: "var(--font-didot)" }}
              >
                {card.title}
              </h3>
              <p
                className="text-sm text-[#1C1C1C]/65 leading-relaxed mb-6 flex-1"
                style={{ fontFamily: "var(--font-lora)" }}
              >
                {card.body}
              </p>
              <BlackButton href="/espace-pro" className="self-start">
                Request a Quote
              </BlackButton>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Section 4: Why Work With Us ──────────────────────────────────────────────
const METRICS = [
  { value: "15,000+", label: "Min. order pouches" },
  { value: "~1 Week", label: "Production lead time" },
  { value: "4 Facilities", label: "Partner sites across India" },
  { value: "Visits", label: "Factory visits on request" },
];

function WhyWorkWithUs() {
  return (
    <section className="bg-[#F5F3F0] py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="text-center mb-14"
        >
          <motion.div variants={fadeUp} custom={0}>
            <SectionHeading>Why Work With Us</SectionHeading>
          </motion.div>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {METRICS.map((m, i) => (
            <motion.div
              key={m.label}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              custom={i * 0.1}
              variants={fadeUp}
              className="flex flex-col items-center justify-center text-center p-6 bg-white rounded-2xl border border-[#1C1C1C]/8"
            >
              <span
                className="text-3xl md:text-4xl font-bold text-[#1C1C1C] mb-2"
                style={{ fontFamily: "var(--font-didot)" }}
              >
                {m.value}
              </span>
              <span
                className="text-xs text-[#1C1C1C]/55 tracking-wide"
                style={{ fontFamily: "var(--font-montserrat)" }}
              >
                {m.label}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Section 5: Manufacturing Network ────────────────────────────────────────
const LOCATIONS = [
  {
    city: "Jaipur",
    state: "Rajasthan",
    description: "Processing & packaging",
  },
  {
    city: "Katihar",
    state: "Bihar",
    description: "Primary sourcing hub",
  },
  {
    city: "Purnea",
    state: "Bihar",
    description: "Grading & quality control",
  },
  {
    city: "Ahmedabad",
    state: "Gujarat",
    description: "Export dispatch center",
  },
];

function ManufacturingNetwork() {
  return (
    <section className="bg-white py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="text-center mb-4"
        >
          <motion.div variants={fadeUp} custom={0}>
            <SectionHeading>Our Manufacturing Network</SectionHeading>
          </motion.div>
          <motion.p
            variants={fadeUp}
            custom={0.1}
            className="mt-3 text-sm text-[#1C1C1C]/55 max-w-xl mx-auto"
            style={{ fontFamily: "var(--font-lora)" }}
          >
            Partner facilities across India. Manufacturer names are kept
            confidential.
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-10">
          {LOCATIONS.map((loc, i) => (
            <motion.div
              key={loc.city}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              custom={i * 0.12}
              variants={fadeUp}
              className="flex items-start gap-4 p-6 rounded-2xl border border-[#1C1C1C]/10 bg-[#FAF8F5] hover:shadow-sm transition-shadow duration-200"
            >
              <span className="text-2xl mt-0.5" aria-hidden="true">
                📍
              </span>
              <div>
                <p
                  className="text-base font-bold text-[#1C1C1C]"
                  style={{ fontFamily: "var(--font-didot)" }}
                >
                  {loc.city}
                </p>
                <p
                  className="text-xs text-[#1C1C1C]/50 mb-1 tracking-wide"
                  style={{ fontFamily: "var(--font-montserrat)" }}
                >
                  {loc.state}
                </p>
                <p
                  className="text-sm text-[#1C1C1C]/65"
                  style={{ fontFamily: "var(--font-lora)" }}
                >
                  {loc.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
          custom={0.3}
          className="text-center mt-10"
        >
          <Link
            href="/manufacturing-network"
            className="text-sm font-semibold text-[#1C1C1C] hover:opacity-70 transition-opacity"
            style={{ fontFamily: "var(--font-montserrat)" }}
          >
            Learn more →
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

// ── Section 6: How Private Label Works ──────────────────────────────────────
const PRIVATE_LABEL_STEPS = [
  {
    num: "01",
    title: "Brief",
    desc: "Tell us product, quantity, flavor, packaging",
  },
  {
    num: "02",
    title: "Samples",
    desc: "Physical samples in 7–10 days",
  },
  {
    num: "03",
    title: "Production",
    desc: "We manufacture in ~1 week",
  },
  {
    num: "04",
    title: "Ship (FOB)",
    desc: "FOB Mundra. Full documentation.",
  },
];

function HowPrivateLabelWorks() {
  return (
    <section className="bg-[#1C1C1C] py-20 text-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="text-center mb-14"
        >
          <motion.h2
            variants={fadeUp}
            custom={0}
            className="text-3xl md:text-4xl font-bold text-white"
            style={{ fontFamily: "var(--font-didot)" }}
          >
            How Private Label Works
          </motion.h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {PRIVATE_LABEL_STEPS.map((step, i) => (
            <motion.div
              key={step.num}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              custom={i * 0.12}
              variants={fadeUp}
              className="flex flex-col"
            >
              <span
                className="text-4xl font-bold text-white/15 mb-3 select-none"
                style={{ fontFamily: "var(--font-didot)" }}
                aria-hidden="true"
              >
                {step.num}
              </span>
              <h3
                className="text-base font-bold text-white mb-2"
                style={{ fontFamily: "var(--font-didot)" }}
              >
                {step.title}
              </h3>
              <p
                className="text-sm text-white/55 leading-relaxed"
                style={{ fontFamily: "var(--font-lora)" }}
              >
                {step.desc}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
          custom={0.35}
          className="text-center mt-12"
        >
          <Link
            href="/private-label"
            className="text-sm font-semibold text-white/70 hover:text-white transition-colors"
            style={{ fontFamily: "var(--font-montserrat)" }}
          >
            Learn about private label →
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

// ── Section 7: Markets Served ────────────────────────────────────────────────
const MARKETS = [
  { flag: "🇬🇧", label: "UK" },
  { flag: "🇺🇸", label: "USA" },
  { flag: "🇨🇦", label: "Canada" },
  { flag: "🇨🇭", label: "Switzerland" },
  { flag: "🇪🇺", label: "European Union" },
];

function MarketsServed() {
  return (
    <section className="bg-[#FAF8F5] py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          <motion.div variants={fadeUp} custom={0}>
            <SectionHeading className="mb-10">Markets We Serve</SectionHeading>
          </motion.div>

          <motion.div
            variants={fadeUp}
            custom={0.1}
            className="flex flex-wrap gap-3 justify-center mb-8"
          >
            {MARKETS.map((m) => (
              <span
                key={m.label}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white border border-[#1C1C1C]/12 text-sm font-medium text-[#1C1C1C]"
                style={{ fontFamily: "var(--font-montserrat)" }}
              >
                <span aria-hidden="true">{m.flag}</span>
                {m.label}
              </span>
            ))}
          </motion.div>

          <motion.p
            variants={fadeUp}
            custom={0.2}
            className="text-sm text-[#1C1C1C]/50"
            style={{ fontFamily: "var(--font-lora)" }}
          >
            Currently exporting to multiple markets. Inquire for yours.
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}

// ── Section 8: Distributors ──────────────────────────────────────────────────
function DistributorsSection() {
  return (
    <section className="bg-white py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          <motion.div variants={fadeUp} custom={0}>
            <SectionHeading className="mb-4">
              Become an AÉRI Distributor
            </SectionHeading>
          </motion.div>
          <motion.p
            variants={fadeUp}
            custom={0.1}
            className="text-base text-[#1C1C1C]/60 max-w-xl mx-auto mb-8 leading-relaxed"
            style={{ fontFamily: "var(--font-lora)" }}
          >
            We are looking for exclusive distribution partners in France, UK,
            UAE, and Canada. Carry the AÉRI brand in your market.
          </motion.p>
          <motion.div variants={fadeUp} custom={0.2}>
            <BlackButton href="/espace-pro">Become a Distributor</BlackButton>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

// ── Section 9: Request a Quote Form ─────────────────────────────────────────
const PRODUCT_OPTIONS = [
  "Raw Phool Makhana",
  "Private Label Roasted",
  "AÉRI Brand",
  "Other",
];

const inputClass =
  "w-full border border-[#1C1C1C]/20 rounded-lg px-4 py-3 bg-white focus:outline-none focus:border-[#1C1C1C]/50 text-[#1C1C1C] text-sm transition-colors";

function QuoteFormSection() {
  const [form, setForm] = useState<QuoteFormData>({
    name: "",
    company: "",
    country: "",
    email: "",
    phone: "",
    product: "",
    quantity: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!form.name.trim() || !form.country.trim()) {
      setError("Name and Country are required.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (data.success) {
        setSuccess(true);
        setForm({
          name: "",
          company: "",
          country: "",
          email: "",
          phone: "",
          product: "",
          quantity: "",
          message: "",
        });
      } else {
        setError(data.message || "Failed to send. Please try again.");
      }
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="bg-[#F5F3F0] py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="text-center mb-10"
        >
          <motion.div variants={fadeUp} custom={0}>
            <SectionHeading>Request a Quote</SectionHeading>
          </motion.div>
          <motion.p
            variants={fadeUp}
            custom={0.1}
            className="mt-2 text-sm text-[#1C1C1C]/55"
            style={{ fontFamily: "var(--font-lora)" }}
          >
            We respond within 24 hours.
          </motion.p>
        </motion.div>

        <motion.form
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={fadeUp}
          custom={0.15}
          onSubmit={handleSubmit}
          className="max-w-2xl mx-auto space-y-4"
          style={{ fontFamily: "var(--font-montserrat)" }}
        >
          {/* Name */}
          <div>
            <label className="block text-xs font-semibold text-[#1C1C1C]/70 mb-1.5 tracking-wide uppercase">
              Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              className={inputClass}
              placeholder="Your full name"
            />
          </div>

          {/* Company */}
          <div>
            <label className="block text-xs font-semibold text-[#1C1C1C]/70 mb-1.5 tracking-wide uppercase">
              Company
            </label>
            <input
              type="text"
              name="company"
              value={form.company}
              onChange={handleChange}
              className={inputClass}
              placeholder="Company name"
            />
          </div>

          {/* Country */}
          <div>
            <label className="block text-xs font-semibold text-[#1C1C1C]/70 mb-1.5 tracking-wide uppercase">
              Country <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="country"
              value={form.country}
              onChange={handleChange}
              required
              className={inputClass}
              placeholder="e.g. United Kingdom"
            />
          </div>

          {/* Email (Optional) */}
          <div>
            <label className="block text-xs font-semibold text-[#1C1C1C]/70 mb-1.5 tracking-wide uppercase">
              Email <span className="text-xs text-[#1C1C1C]/40 font-normal lowercase">(optional)</span>
            </label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className={inputClass}
              placeholder="e.g. buyer@company.com"
            />
          </div>

          {/* Phone / WhatsApp (Optional) */}
          <div>
            <label className="block text-xs font-semibold text-[#1C1C1C]/70 mb-1.5 tracking-wide uppercase">
              Phone / WhatsApp Number <span className="text-xs text-[#1C1C1C]/40 font-normal lowercase">(optional)</span>
            </label>
            <input
              type="tel"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              className={inputClass}
              placeholder="e.g. +44 7123 456789 or +91 98765 43210"
            />
          </div>

          {/* Product Interest */}
          <div>
            <label className="block text-xs font-semibold text-[#1C1C1C]/70 mb-1.5 tracking-wide uppercase">
              Product Interest
            </label>
            <select
              name="product"
              value={form.product}
              onChange={handleChange}
              className={inputClass}
            >
              <option value="">Select a product</option>
              {PRODUCT_OPTIONS.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          </div>

          {/* Estimated Quantity */}
          <div>
            <label className="block text-xs font-semibold text-[#1C1C1C]/70 mb-1.5 tracking-wide uppercase">
              Estimated Quantity
            </label>
            <input
              type="text"
              name="quantity"
              value={form.quantity}
              onChange={handleChange}
              className={inputClass}
              placeholder="e.g. 500 kg, 10,000 pouches"
            />
          </div>

          {/* Message */}
          <div>
            <label className="block text-xs font-semibold text-[#1C1C1C]/70 mb-1.5 tracking-wide uppercase">
              Message
            </label>
            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              rows={4}
              className={inputClass}
              placeholder="Tell us more about your requirements..."
            />
          </div>

          {/* Error */}
          {error && (
            <p className="text-red-600 text-sm font-medium">{error}</p>
          )}

          {/* Success */}
          {success && (
            <div className="rounded-lg bg-green-50 border border-green-200 px-4 py-3">
              <p className="text-green-800 text-sm font-semibold">
                ✓ Quote request received. We&apos;ll be in touch within 24 hours.
              </p>
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 bg-[#1C1C1C] text-[#FAF8F5] text-sm font-semibold tracking-wide rounded-lg hover:bg-[#333] transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <svg
                  className="animate-spin w-4 h-4"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                  />
                </svg>
                Sending…
              </>
            ) : (
              "Send Request"
            )}
          </button>
        </motion.form>
      </div>
    </section>
  );
}

// ── Main Page Component ──────────────────────────────────────────────────────
export default function B2BHomePage() {
  return (
    <main className="flex flex-col">
      {/* Navbar */}
      <Navbar />

      {/* Spacer for fixed navbar */}
      <div className="pt-20" aria-hidden="true" />

      {/* 1. Hero */}
      <HeroSection />

      {/* 2. Trust Strip */}
      <TrustStrip />

      {/* 3. What We Supply */}
      <WhatWeSupply />

      {/* 4. Why Work With Us */}
      <WhyWorkWithUs />

      {/* 5. Manufacturing Network */}
      <ManufacturingNetwork />

      {/* 6. How Private Label Works */}
      <HowPrivateLabelWorks />

      {/* 7. Markets Served */}
      <MarketsServed />

      {/* 8. Distributors */}
      <DistributorsSection />

      {/* 9. Request a Quote Form */}
      <QuoteFormSection />

      {/* 10. Footer */}
      <Footer />
    </main>
  );
}
