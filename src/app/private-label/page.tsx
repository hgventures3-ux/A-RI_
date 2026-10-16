import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Private Label Makhana | Contract Manufacturing | AÉRI India",
  description:
    "Private label and contract manufacturing for raw, roasted, and flavored makhana. Low MOQ from 15,000 pouches. FOB Mundra.",
};

const options = [
  {
    title: "Raw",
    description:
      "Uncoated, bulk or retail-packed raw phool makhana under your brand. Minimal processing, maximum freshness.",
  },
  {
    title: "Roasted Plain",
    description:
      "Oven-roasted, lightly salted. Nitrogen-flushed packaging for 12+ month shelf life.",
  },
  {
    title: "Flavored",
    description:
      "Himalayan Salt & Pepper, Gourmet Truffle, Dark Chocolate, or submit a custom flavor brief.",
  },
];

const terms = [
  { label: "Pack formats", value: "Nitrogen-flushed pillow pouch, Stand-up doypack, Bulk 10 kg bags" },
  { label: "MOQ", value: "From 15,000 pouches per SKU" },
  { label: "Lead time", value: "Approximately 1 week from production approval" },
  { label: "Packaging", value: "Custom artwork and label design support available" },
];

const steps = [
  { num: "01", title: "Brief", desc: "Tell us your product spec, quantity, flavor, packaging format" },
  { num: "02", title: "Samples", desc: "Physical samples dispatched within 7–10 business days" },
  { num: "03", title: "Production", desc: "Manufactured to your specification in approximately 1 week" },
  { num: "04", title: "Ship (FOB)", desc: "FOB Mundra. Full export documentation provided." },
];

export default function PrivateLabelPage() {
  return (
    <div className="min-h-screen bg-[#FAF8F5]">
      <Navbar />

      {/* pt-20 spacer for fixed navbar */}
      <main className="pt-20">

        {/* ── Hero ── */}
        <section className="max-w-5xl mx-auto px-4 sm:px-6 py-14 md:py-20 text-center">
          <h1
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#1C1C1C] leading-tight mb-5"
            style={{ fontFamily: "var(--font-montserrat)" }}
          >
            Private Label and<br className="hidden sm:block" /> Contract Manufacturing
          </h1>
          <p
            className="text-base md:text-lg text-[#1C1C1C]/65 max-w-xl mx-auto"
            style={{ fontFamily: "var(--font-lora)" }}
          >
            Your brand on raw, roasted or flavored makhana. Low MOQ. Fast production.
          </p>
        </section>

        {/* ── Options ── */}
        <section className="max-w-5xl mx-auto px-4 sm:px-6 pb-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {options.map((opt) => (
              <div
                key={opt.title}
                className="bg-white rounded-2xl p-7 border border-[#1C1C1C]/8 shadow-sm"
              >
                <h3
                  className="text-base font-bold text-[#1C1C1C] mb-3"
                  style={{ fontFamily: "var(--font-montserrat)" }}
                >
                  {opt.title}
                </h3>
                <p
                  className="text-sm text-[#1C1C1C]/70 leading-relaxed"
                  style={{ fontFamily: "var(--font-lora)" }}
                >
                  {opt.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ── Terms ── */}
        <section className="bg-[#F5F3F0] py-14 md:py-16">
          <div className="max-w-5xl mx-auto px-4 sm:px-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {terms.map((term) => (
                <div
                  key={term.label}
                  className="bg-white rounded-2xl p-6 border border-[#1C1C1C]/8 shadow-sm"
                >
                  <h4
                    className="text-[11px] font-semibold tracking-[0.25em] uppercase text-[#1C1C1C]/50 mb-2"
                    style={{ fontFamily: "var(--font-montserrat)" }}
                  >
                    {term.label}
                  </h4>
                  <p
                    className="text-sm text-[#1C1C1C]/80 leading-relaxed"
                    style={{ fontFamily: "var(--font-lora)" }}
                  >
                    {term.value}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── 4-Step Process ── */}
        <section className="max-w-5xl mx-auto px-4 sm:px-6 py-14 md:py-16">
          <h2
            className="text-xl sm:text-2xl font-bold text-[#1C1C1C] mb-10 text-center"
            style={{ fontFamily: "var(--font-montserrat)" }}
          >
            How It Works
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((step) => (
              <div key={step.num} className="relative">
                <div
                  className="text-[40px] font-bold text-[#1C1C1C]/8 leading-none mb-3 select-none"
                  style={{ fontFamily: "var(--font-montserrat)" }}
                >
                  {step.num}
                </div>
                <h3
                  className="text-[13px] font-bold tracking-[0.1em] uppercase text-[#1C1C1C] mb-2"
                  style={{ fontFamily: "var(--font-montserrat)" }}
                >
                  Step {step.num} — {step.title}
                </h3>
                <p
                  className="text-sm text-[#1C1C1C]/65 leading-relaxed"
                  style={{ fontFamily: "var(--font-lora)" }}
                >
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="bg-[#1C1C1C] py-14 md:py-16">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
            <p
              className="text-lg md:text-xl text-[#FAF8F5]/85 mb-7"
              style={{ fontFamily: "var(--font-lora)" }}
            >
              Start with a brief
            </p>
            <Link
              href="/espace-pro"
              className="inline-block px-8 py-3.5 rounded-xl bg-[#FAF8F5] text-[#1C1C1C] text-[13px] font-semibold tracking-[0.08em] hover:bg-white transition-colors"
              style={{ fontFamily: "var(--font-montserrat)" }}
            >
              Request a Quote
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
