"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useContactModal, ProductOption } from "@/context/ContactModalContext";
import { event } from "@/lib/gtag";

export default function B2BHomePage() {
  const router = useRouter();
  const { openModal } = useContactModal();

  // Inline Form State
  const [fullName, setFullName] = useState("");
  const [company, setCompany] = useState("");
  const [country, setCountry] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [product, setProduct] = useState<ProductOption>("Raw Phool Makhana");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);

  const handleInlineSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFeedback(null);

    try {
      const res = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName,
          company,
          country,
          email,
          phone,
          product,
          message,
        }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setFeedback("Thank you. We will reply within 1 business day.");
        event("contact_form_sent", { product, country, form_type: "inline_home" });
        setTimeout(() => {
          router.push("/thank-you");
        }, 800);
      } else {
        setFeedback(data.message || "Something went wrong. Please try again.");
      }
    } catch {
      setFeedback("Failed to send request. Please try again or message us on WhatsApp.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#1C1C1C] flex flex-col font-montserrat">
      <Navbar />

      {/* Spacer for fixed navbar */}
      <div className="pt-24 lg:pt-28" />

      {/* ── Section 1: Hero ── */}
      <section className="bg-[#FAF8F5] py-12 md:py-20 border-b border-[#1C1C1C]/10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7">
              <span className="inline-block px-3 py-1 mb-4 rounded-full border border-[#1C1C1C]/20 text-[11px] font-semibold tracking-[0.25em] uppercase text-[#1C1C1C]/70">
                EXPORTED FROM INDIA
              </span>

              <h1
                className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl font-bold text-[#1C1C1C] leading-[1.15] mb-5 tracking-tight"
                style={{ fontFamily: "var(--font-didot)" }}
              >
                Raw Phool Makhana (Fox Nuts) and Private-Label Roasted Makhana,
                Exported from India
              </h1>

              <p className="text-base sm:text-lg text-[#1C1C1C]/80 mb-8 leading-relaxed font-normal">
                Grades 4, 5 and 6+ suta, handpicked. Low minimum order. About 1 week
                production. Certified partner facilities.
              </p>

              {/* Hero Buttons: Request a Quote (popup) and Explore Raw Makhana (link) */}
              <div className="flex flex-wrap items-center gap-3.5 mb-5">
                <button
                  onClick={() => openModal()}
                  type="button"
                  className="min-h-[44px] px-7 py-3 bg-[#1C1C1C] text-[#FAF8F5] text-sm font-semibold rounded-lg hover:bg-black transition-all shadow-sm active:scale-95"
                >
                  Request a Quote
                </button>

                <Link
                  href="/raw-phool-makhana"
                  className="min-h-[44px] inline-flex items-center justify-center px-6 py-3 border border-[#1C1C1C] text-[#1C1C1C] text-sm font-semibold rounded-lg hover:bg-[#1C1C1C] hover:text-white transition-all active:scale-95"
                >
                  Explore Raw Makhana
                </Link>
              </div>

              <div className="text-xs text-[#1C1C1C]/60 space-y-1">
                <p>Export-grade. Full export documentation provided.</p>
                <p className="font-medium text-[#1C1C1C]/80">
                  H&amp;G Ventures Private Limited. Part of KHT Group.
                </p>
              </div>
            </div>

            {/* Right Hero Real Image */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative w-full max-w-md aspect-square rounded-2xl overflow-hidden shadow-xl border border-[#1C1C1C]/10 bg-white">
                <Image
                  src="/hero-makhana-bag.webp"
                  alt="Raw Phool Makhana 5+ Suta Export Packaging Display"
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, 500px"
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Section 2: Certifications Strip ── */}
      <section className="bg-[#1C1C1C] py-7 text-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <p className="text-center text-xs font-semibold tracking-[0.2em] uppercase text-white/50 mb-3.5">
            Certifications
          </p>
          <div className="flex gap-2.5 overflow-x-auto pb-1 justify-start md:justify-center scrollbar-none">
            {[
              "US FDA registered",
              "FSSC 22000",
              "BRCGS (in progress)",
              "Halal",
              "Kosher",
              "FSSAI",
              "APEDA",
              "Vegan",
            ].map((badge) => (
              <span
                key={badge}
                className="flex-shrink-0 px-3.5 py-1.5 rounded-full border border-white/20 text-white/90 text-xs font-medium whitespace-nowrap bg-white/5"
              >
                {badge}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── Section 3: What We Supply ── */}
      <section className="py-20 bg-white border-b border-[#1C1C1C]/10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-12">
          <h2
            className="text-3xl md:text-4xl font-bold text-center text-[#1C1C1C] mb-12 tracking-tight"
            style={{ fontFamily: "var(--font-didot)" }}
          >
            What We Supply
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Card 1: Raw Phool Makhana */}
            <div className="p-8 rounded-2xl bg-[#FAF8F5] border border-[#1C1C1C]/10 flex flex-col justify-between hover:shadow-md transition-shadow">
              <div>
                <h3 className="text-xl font-bold text-[#1C1C1C] mb-3">
                  Raw Phool Makhana
                </h3>
                <p className="text-sm text-gray-700 leading-relaxed mb-6 font-normal">
                  Export-grade fox nuts in 4, 5 and 6+ suta, handpicked. Available in
                  bulk or under your own brand.
                </p>
              </div>
              <button
                onClick={() => openModal("Raw Phool Makhana")}
                type="button"
                className="w-full min-h-[44px] bg-[#1C1C1C] text-white text-sm font-semibold rounded-lg hover:bg-black transition-colors"
              >
                Contact Us
              </button>
            </div>

            {/* Card 2: Private Label Makhana */}
            <div className="p-8 rounded-2xl bg-[#FAF8F5] border border-[#1C1C1C]/10 flex flex-col justify-between hover:shadow-md transition-shadow">
              <div>
                <h3 className="text-xl font-bold text-[#1C1C1C] mb-3">
                  Private Label Makhana
                </h3>
                <p className="text-sm text-gray-700 leading-relaxed mb-6 font-normal">
                  Your brand on raw, roasted or flavored makhana. Himalayan Salt &amp;
                  Pepper, Gourmet Truffle, Dark Chocolate or your own flavor.
                </p>
              </div>
              <button
                onClick={() => openModal("Private Label: Raw")}
                type="button"
                className="w-full min-h-[44px] bg-[#1C1C1C] text-white text-sm font-semibold rounded-lg hover:bg-black transition-colors"
              >
                Contact Us
              </button>
            </div>

            {/* Card 3: AÉRI Makhana */}
            <div className="p-8 rounded-2xl bg-[#FAF8F5] border border-[#1C1C1C]/10 flex flex-col justify-between hover:shadow-md transition-shadow">
              <div>
                <h3 className="text-xl font-bold text-[#1C1C1C] mb-3">
                  AÉRI Makhana
                </h3>
                <p className="text-sm text-gray-700 leading-relaxed mb-6 font-normal">
                  Our own brand, ready for retail. For distributors and importers
                  who want to carry AÉRI in their market.
                </p>
              </div>
              <button
                onClick={() => openModal("AÉRI Brand (Distributor)")}
                type="button"
                className="w-full min-h-[44px] bg-[#1C1C1C] text-white text-sm font-semibold rounded-lg hover:bg-black transition-colors"
              >
                Contact Us
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── Section 4: Why Work With Us ── */}
      <section className="py-20 bg-[#F5F3F0] border-b border-[#1C1C1C]/10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-12">
          <h2
            className="text-3xl md:text-4xl font-bold text-center text-[#1C1C1C] mb-12 tracking-tight"
            style={{ fontFamily: "var(--font-didot)" }}
          >
            Why Work With Us
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-[#1C1C1C]/10 text-center shadow-sm">
              <p className="text-2xl sm:text-3xl font-bold text-[#1C1C1C] mb-1">
                Flexible
              </p>
              <p className="text-xs sm:text-sm text-gray-600">minimum orders</p>
            </div>

            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-[#1C1C1C]/10 text-center shadow-sm">
              <p className="text-2xl sm:text-3xl font-bold text-[#1C1C1C] mb-1">
                1 week
              </p>
              <p className="text-xs sm:text-sm text-gray-600">production lead time</p>
            </div>

            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-[#1C1C1C]/10 text-center shadow-sm">
              <p className="text-2xl sm:text-3xl font-bold text-[#1C1C1C] mb-1">
                4
              </p>
              <p className="text-xs sm:text-sm text-gray-600">
                partner facilities across India
              </p>
            </div>

            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-[#1C1C1C]/10 text-center shadow-sm">
              <p className="text-2xl sm:text-3xl font-bold text-[#1C1C1C] mb-1">
                On request
              </p>
              <p className="text-xs sm:text-sm text-gray-600">buyer factory visits</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Section 5: Part of KHT Group ── */}
      <section className="py-20 bg-white border-b border-[#1C1C1C]/10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-12 text-center">
          <h2
            className="text-3xl md:text-4xl font-bold text-[#1C1C1C] mb-2 tracking-tight"
            style={{ fontFamily: "var(--font-didot)" }}
          >
            Part of KHT Group
          </h2>
          <p className="text-sm text-gray-600 mb-10">25+ years of group experience.</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
            <div className="p-5 rounded-xl border border-gray-200 bg-[#FAF8F5] text-center flex flex-col justify-center min-h-[90px]">
              <p className="font-bold text-[#1C1C1C] text-sm">KHT Group</p>
            </div>

            <div className="p-5 rounded-xl border border-gray-200 bg-[#FAF8F5] text-center flex flex-col justify-center min-h-[90px]">
              <p className="font-bold text-[#1C1C1C] text-sm">KHT Developers</p>
              <p className="text-xs text-gray-500 mt-1">Real estate</p>
            </div>

            <div className="p-5 rounded-xl border border-gray-200 bg-[#FAF8F5] text-center flex flex-col justify-center min-h-[90px]">
              <p className="font-bold text-[#1C1C1C] text-sm">
                KHT Pharma Private Limited
              </p>
            </div>

            <div className="p-5 rounded-xl border border-gray-200 bg-[#FAF8F5] text-center flex flex-col justify-center min-h-[90px]">
              <p className="font-bold text-[#1C1C1C] text-sm">KHT Polymers</p>
              <p className="text-xs text-gray-500 mt-1">
                Plastic carry bags manufacturing
              </p>
            </div>

            <div className="p-5 rounded-xl border border-gray-200 bg-[#FAF8F5] text-center flex flex-col justify-center min-h-[90px]">
              <p className="font-bold text-[#1C1C1C] text-sm">
                Moksh Tarpaulin India Pvt Ltd
              </p>
              <p className="text-xs text-gray-500 mt-1">Tarpaulin manufacturing</p>
            </div>
          </div>

          <p className="text-xs text-gray-500">
            AÉRI Makhana is a brand of H&amp;G Ventures Private Limited.
          </p>
        </div>
      </section>

      {/* ── Section 6: Manufacturing Network ── */}
      <section className="py-20 bg-[#FAF8F5] border-b border-[#1C1C1C]/10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-12 text-center">
          <h2
            className="text-3xl md:text-4xl font-bold text-[#1C1C1C] mb-3 tracking-tight"
            style={{ fontFamily: "var(--font-didot)" }}
          >
            Our Manufacturing Network
          </h2>
          <p className="text-sm text-gray-700 max-w-2xl mx-auto mb-10 leading-relaxed font-normal">
            Partner facilities in Rajasthan, Bihar and Gujarat. Facility details are
            shared with qualified buyers.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {[
              { city: "Jaipur, Rajasthan" },
              { city: "Katihar, Bihar" },
              { city: "Purnea, Bihar" },
              { city: "Ahmedabad, Gujarat" },
            ].map((facility) => (
              <div
                key={facility.city}
                className="p-6 rounded-2xl bg-white border border-[#1C1C1C]/10 shadow-sm text-left"
              >
                <p className="font-bold text-[#1C1C1C] text-base mb-1">
                  {facility.city}
                </p>
                <p className="text-xs text-gray-500">Partner facility</p>
              </div>
            ))}
          </div>

          <Link
            href="/about-us"
            className="inline-flex items-center text-sm font-semibold text-[#1C1C1C] hover:underline"
          >
            Learn more →
          </Link>
        </div>
      </section>

      {/* ── Section 7: How Private Label Works ── */}
      <section className="py-20 bg-[#1C1C1C] text-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-12">
          <h2
            className="text-3xl md:text-4xl font-bold text-center text-white mb-14 tracking-tight"
            style={{ fontFamily: "var(--font-didot)" }}
          >
            How Private Label Works
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
            <div>
              <p className="text-3xl font-extrabold text-[#555555] mb-2 font-mono">
                01
              </p>
              <h3 className="text-lg font-bold text-white mb-2">Brief</h3>
              <p className="text-xs text-white/70 leading-relaxed font-light">
                Tell us the product, quantity, flavor and packaging.
              </p>
            </div>

            <div>
              <p className="text-3xl font-extrabold text-[#555555] mb-2 font-mono">
                02
              </p>
              <h3 className="text-lg font-bold text-white mb-2">Samples</h3>
              <p className="text-xs text-white/70 leading-relaxed font-light">
                Samples are dispatched within 7 to 10 business days.
              </p>
            </div>

            <div>
              <p className="text-3xl font-extrabold text-[#555555] mb-2 font-mono">
                03
              </p>
              <h3 className="text-lg font-bold text-white mb-2">Production</h3>
              <p className="text-xs text-white/70 leading-relaxed font-light">
                Production takes about 1 week after approval.
              </p>
            </div>

            <div>
              <p className="text-3xl font-extrabold text-[#555555] mb-2 font-mono">
                04
              </p>
              <h3 className="text-lg font-bold text-white mb-2">Ship</h3>
              <p className="text-xs text-white/70 leading-relaxed font-light">
                Export shipping with full documentation.
              </p>
            </div>
          </div>

          <div className="text-center">
            <Link
              href="/private-label"
              className="inline-flex items-center text-sm font-medium text-white/80 hover:text-white underline underline-offset-4"
            >
              Learn about private label →
            </Link>
          </div>
        </div>
      </section>

      {/* ── Section 8: Focus Markets ── */}
      <section className="py-16 bg-[#FAF8F5] border-b border-[#1C1C1C]/10 text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <h2
            className="text-2xl md:text-3xl font-bold text-[#1C1C1C] mb-6 tracking-tight"
            style={{ fontFamily: "var(--font-didot)" }}
          >
            Focus Markets
          </h2>

          <div className="flex flex-wrap items-center justify-center gap-3 mb-6">
            {["UK", "USA", "Canada", "European Union"].map((market) => (
              <span
                key={market}
                className="px-5 py-2 rounded-full border border-[#1C1C1C]/20 bg-white text-xs font-semibold tracking-wider text-[#1C1C1C]"
              >
                {market}
              </span>
            ))}
          </div>

          <p className="text-sm text-gray-600">
            We are building our export business in these markets. Ask us about yours.
          </p>
        </div>
      </section>

      {/* ── Section 9: Distributors Section ── */}
      <section className="py-20 bg-white border-b border-[#1C1C1C]/10 text-center">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <h2
            className="text-3xl md:text-4xl font-bold text-[#1C1C1C] mb-4 tracking-tight"
            style={{ fontFamily: "var(--font-didot)" }}
          >
            Become an AÉRI Distributor
          </h2>
          <p className="text-base text-gray-700 leading-relaxed mb-8">
            We are appointing distribution partners for the AÉRI brand in the UK,
            USA, Canada and the European Union. Carry AÉRI in your market.
          </p>
          <button
            onClick={() => openModal("AÉRI Brand (Distributor)")}
            type="button"
            className="min-h-[44px] px-8 py-3 bg-[#1C1C1C] text-white text-sm font-semibold rounded-lg hover:bg-black transition-colors"
          >
            Contact Us
          </button>
        </div>
      </section>

      {/* ── Section 10: Inline Contact Form ── */}
      <section className="py-20 bg-[#F5F3F0]">
        <div className="max-w-2xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
            <h2
              className="text-3xl md:text-4xl font-bold text-[#1C1C1C] mb-2 tracking-tight"
              style={{ fontFamily: "var(--font-didot)" }}
            >
              Contact Us
            </h2>
            <p className="text-sm text-gray-600">
              Tell us what you need. We reply within 1 business day.
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-gray-200 p-6 sm:p-10 shadow-sm">
            {feedback && (
              <div className="mb-6 p-4 rounded-lg bg-green-50 border border-green-200 text-green-800 text-sm font-medium">
                {feedback}
              </div>
            )}

            <form onSubmit={handleInlineSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
                  Full name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Your full name"
                  className="w-full border border-gray-300 rounded-lg px-3.5 py-2.5 text-[16px] text-[#1C1C1C] bg-white focus:outline-none focus:border-[#1C1C1C] focus:ring-1 focus:ring-[#1C1C1C]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
                    Company <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    placeholder="Company name"
                    className="w-full border border-gray-300 rounded-lg px-3.5 py-2.5 text-[16px] text-[#1C1C1C] bg-white focus:outline-none focus:border-[#1C1C1C] focus:ring-1 focus:ring-[#1C1C1C]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
                    Country <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    placeholder="Your country"
                    className="w-full border border-gray-300 rounded-lg px-3.5 py-2.5 text-[16px] text-[#1C1C1C] bg-white focus:outline-none focus:border-[#1C1C1C] focus:ring-1 focus:ring-[#1C1C1C]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@company.com"
                    className="w-full border border-gray-300 rounded-lg px-3.5 py-2.5 text-[16px] text-[#1C1C1C] bg-white focus:outline-none focus:border-[#1C1C1C] focus:ring-1 focus:ring-[#1C1C1C]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
                    Phone / WhatsApp <span className="text-gray-400 font-normal lowercase">(optional)</span>
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+1 (555) 000-0000"
                    className="w-full border border-gray-300 rounded-lg px-3.5 py-2.5 text-[16px] text-[#1C1C1C] bg-white focus:outline-none focus:border-[#1C1C1C] focus:ring-1 focus:ring-[#1C1C1C]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
                  Product
                </label>
                <select
                  value={product}
                  onChange={(e) => setProduct(e.target.value as ProductOption)}
                  className="w-full border border-gray-300 rounded-lg px-3.5 py-2.5 text-[16px] text-[#1C1C1C] bg-white focus:outline-none focus:border-[#1C1C1C] focus:ring-1 focus:ring-[#1C1C1C]"
                >
                  <option value="Raw Phool Makhana">Raw Phool Makhana</option>
                  <option value="Private Label: Raw">Private Label: Raw</option>
                  <option value="Private Label: Roasted or Flavored">
                    Private Label: Roasted or Flavored
                  </option>
                  <option value="AÉRI Brand (Distributor)">
                    AÉRI Brand (Distributor)
                  </option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
                  Message
                </label>
                <textarea
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Tell us about your requirements, destination port, or questions"
                  className="w-full border border-gray-300 rounded-lg px-3.5 py-2.5 text-[16px] text-[#1C1C1C] bg-white focus:outline-none focus:border-[#1C1C1C] focus:ring-1 focus:ring-[#1C1C1C]"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full min-h-[48px] bg-[#1C1C1C] text-white font-medium rounded-lg hover:bg-black transition-colors flex items-center justify-center disabled:opacity-50 text-[16px]"
              >
                {isSubmitting ? "Sending..." : "Send Message"}
              </button>
            </form>

            <div className="mt-6 pt-4 border-t border-gray-200 text-center text-xs text-gray-500 space-y-1">
              <p>
                <a href="mailto:kriya@aerisnacks.com" className="hover:underline">
                  kriya@aerisnacks.com (exports)
                </a>
                {" | "}
                <a href="mailto:info@aerisnacks.com" className="hover:underline">
                  info@aerisnacks.com (distributors)
                </a>
              </p>
              <p>
                WhatsApp:{" "}
                <a
                  href="https://wa.me/919499729424?text=Hello%20A%C3%89RI%20Team%2C%20I%27m%20interested%20in%20your%20products%20and%20would%20like%20to%20know%20more.%20Could%20you%20please%20assist%20me%3F"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline text-[#1C1C1C] font-semibold"
                >
                  +91 94997 29424
                </a>
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
