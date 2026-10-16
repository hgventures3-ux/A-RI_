import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Raw Phool Makhana Exporter India | Fox Nuts 4-6 Suta | AÉRI",
  description:
    "Export-grade raw Phool Makhana (fox nuts) in 4, 4+, 5, 5+, 6 suta grades. 10 kg food-grade bags. FOB Mundra. Request a quote.",
};

const grades = [
  { grade: "4 Suta", size: "16–18 mm", moisture: "≤ 10%", packaging: "10 kg food-grade poly bags", origin: "Bihar, India" },
  { grade: "4+ Suta", size: "18–20 mm", moisture: "≤ 10%", packaging: "10 kg food-grade poly bags", origin: "Bihar, India" },
  { grade: "5 Suta", size: "20–22 mm", moisture: "≤ 10%", packaging: "10 kg food-grade poly bags", origin: "Bihar, India" },
  { grade: "5+ Suta", size: "22–24 mm", moisture: "≤ 10%", packaging: "10 kg food-grade poly bags", origin: "Bihar, India" },
  { grade: "6 Suta", size: "24 mm+", moisture: "≤ 10%", packaging: "10 kg food-grade poly bags", origin: "Bihar, India" },
];

const qualityParams = [
  { icon: "🎨", label: "Color", value: "Creamy white to pale yellow, uniform" },
  { icon: "💧", label: "Broken/Flat kernels", value: "≤ 3% by weight" },
  { icon: "🌿", label: "Foreign matter", value: "≤ 0.5% by weight" },
  { icon: "⏱", label: "Shelf life", value: "12–24 months from production date" },
];

export default function RawPhoolMakhanaPage() {
  return (
    <div className="min-h-screen bg-[#FAF8F5]">
      <Navbar />

      {/* pt-20 spacer for fixed navbar */}
      <main className="pt-20">

        {/* ── Hero ── */}
        <section className="max-w-5xl mx-auto px-4 sm:px-6 py-14 md:py-20 text-center">
          <span
            className="inline-block mb-4 px-3 py-1 rounded-full bg-[#1C1C1C] text-[#FAF8F5] text-[10px] font-semibold tracking-[0.3em] uppercase"
            style={{ fontFamily: "var(--font-montserrat)" }}
          >
            EXPORT GRADE
          </span>
          <h1
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#1C1C1C] leading-tight mb-5"
            style={{ fontFamily: "var(--font-montserrat)" }}
          >
            Raw Phool Makhana<br className="hidden sm:block" /> (Fox Nuts / Lotus Seeds)
          </h1>
          <p
            className="text-base md:text-lg text-[#1C1C1C]/65 max-w-xl mx-auto"
            style={{ fontFamily: "var(--font-lora)" }}
          >
            Export-grade, 4 to 6 suta. Request a quote for current pricing.
          </p>
        </section>

        {/* ── Grade Specifications Table ── */}
        <section className="max-w-5xl mx-auto px-4 sm:px-6 pb-16">
          <h2
            className="text-xl sm:text-2xl font-bold text-[#1C1C1C] mb-6"
            style={{ fontFamily: "var(--font-montserrat)" }}
          >
            Grade Specifications
          </h2>
          <div className="overflow-x-auto rounded-2xl border border-[#1C1C1C]/10 bg-white shadow-sm">
            <table className="w-full text-sm text-left" style={{ fontFamily: "var(--font-lora)" }}>
              <thead>
                <tr className="border-b border-[#1C1C1C]/10 bg-[#F5F3F0]">
                  {["Grade", "Size (mm)", "Moisture", "Packaging", "Origin", "Action"].map((h) => (
                    <th
                      key={h}
                      className="px-5 py-3.5 text-[11px] font-semibold tracking-[0.2em] uppercase text-[#1C1C1C]/60 whitespace-nowrap"
                      style={{ fontFamily: "var(--font-montserrat)" }}
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {grades.map((row, i) => (
                  <tr
                    key={row.grade}
                    className={`border-b border-[#1C1C1C]/6 transition-colors hover:bg-[#FAF8F5] ${i === grades.length - 1 ? "border-b-0" : ""}`}
                  >
                    <td className="px-5 py-4 font-semibold text-[#1C1C1C] whitespace-nowrap" style={{ fontFamily: "var(--font-montserrat)" }}>
                      {row.grade}
                    </td>
                    <td className="px-5 py-4 text-[#1C1C1C]/80 whitespace-nowrap">{row.size}</td>
                    <td className="px-5 py-4 text-[#1C1C1C]/80 whitespace-nowrap">{row.moisture}</td>
                    <td className="px-5 py-4 text-[#1C1C1C]/80">{row.packaging}</td>
                    <td className="px-5 py-4 text-[#1C1C1C]/80 whitespace-nowrap">{row.origin}</td>
                    <td className="px-5 py-4 whitespace-nowrap">
                      <Link
                        href="/espace-pro"
                        className="inline-block px-3.5 py-1.5 rounded-lg bg-[#1C1C1C] text-[#FAF8F5] text-[11px] font-semibold tracking-[0.05em] hover:bg-[#333] transition-colors"
                        style={{ fontFamily: "var(--font-montserrat)" }}
                      >
                        Request Quote
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* ── Quality Parameters ── */}
        <section className="bg-[#F5F3F0] py-14 md:py-16">
          <div className="max-w-5xl mx-auto px-4 sm:px-6">
            <h2
              className="text-xl sm:text-2xl font-bold text-[#1C1C1C] mb-8"
              style={{ fontFamily: "var(--font-montserrat)" }}
            >
              Quality Parameters
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {qualityParams.map((param) => (
                <div
                  key={param.label}
                  className="bg-white rounded-2xl p-6 border border-[#1C1C1C]/8 shadow-sm"
                >
                  <div className="text-2xl mb-3">{param.icon}</div>
                  <h3
                    className="text-[12px] font-semibold tracking-[0.15em] uppercase text-[#1C1C1C]/60 mb-2"
                    style={{ fontFamily: "var(--font-montserrat)" }}
                  >
                    {param.label}
                  </h3>
                  <p
                    className="text-sm text-[#1C1C1C]/80 leading-relaxed"
                    style={{ fontFamily: "var(--font-lora)" }}
                  >
                    {param.value}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA Banner ── */}
        <section className="bg-[#1C1C1C] py-14 md:py-16">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
            <p
              className="text-lg md:text-xl text-[#FAF8F5]/85 mb-7 leading-relaxed"
              style={{ fontFamily: "var(--font-lora)" }}
            >
              Tell us what you need — we will get back within 24 hours.
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
