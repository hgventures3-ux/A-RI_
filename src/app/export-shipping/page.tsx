import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Makhana Export & Shipping | FOB Mundra | AÉRI India",
  description:
    "Export and shipping details for raw phool makhana and private label. FOB Mundra. Documents: COO, phytosanitary, FSSAI, lab reports.",
};

const infoGrid = [
  { label: "Shipping Terms", value: "FOB Mundra Port, Gujarat, India" },
  { label: "Payment Terms", value: "T/T Advance, Letter of Credit (L/C at sight), DP" },
  { label: "HS Code", value: "Makhana HS Code: 2008.19.21 — 0% base customs duty India to EU" },
  { label: "Lead Time", value: "Production ~1 week. Sea freight 15–35 days." },
  { label: "Minimum Order", value: "From 100 kg raw / 15,000 pouches private label" },
  { label: "Dispatch Port", value: "Mundra, Gujarat (primary) or JNPT Mumbai" },
];

const exportDocs = [
  "Commercial Invoice",
  "Packing List",
  "Bill of Lading (B/L)",
  "Certificate of Origin (COO)",
  "Phytosanitary Certificate",
  "FSSAI / Health Certificate",
  "Laboratory Analysis Report (NABL-accredited)",
  "Fumigation Certificate (if required by destination)",
];

const markets = ["UK", "USA", "Canada", "Switzerland", "EU"];

export default function ExportShippingPage() {
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
            Export and Shipping
          </h1>
          <p
            className="text-base md:text-lg text-[#1C1C1C]/65 max-w-2xl mx-auto"
            style={{ fontFamily: "var(--font-lora)" }}
          >
            FOB Mundra. Comprehensive export documentation. Shipping to UK, USA, Canada,
            Switzerland, and EU.
          </p>
        </section>

        {/* ── Info Grid (2 cols × 3 rows) ── */}
        <section className="max-w-5xl mx-auto px-4 sm:px-6 pb-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {infoGrid.map((item) => (
              <div
                key={item.label}
                className="bg-white rounded-2xl p-6 border border-[#1C1C1C]/8 shadow-sm"
              >
                <h3
                  className="text-[11px] font-semibold tracking-[0.25em] uppercase text-[#1C1C1C]/50 mb-2"
                  style={{ fontFamily: "var(--font-montserrat)" }}
                >
                  {item.label}
                </h3>
                <p
                  className="text-sm text-[#1C1C1C]/80 leading-relaxed"
                  style={{ fontFamily: "var(--font-lora)" }}
                >
                  {item.value}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ── Export Documents ── */}
        <section className="bg-[#F5F3F0] py-14 md:py-16">
          <div className="max-w-5xl mx-auto px-4 sm:px-6">
            <h2
              className="text-xl sm:text-2xl font-bold text-[#1C1C1C] mb-8"
              style={{ fontFamily: "var(--font-montserrat)" }}
            >
              Standard Export Documentation
            </h2>
            <div className="bg-white rounded-2xl p-7 border border-[#1C1C1C]/8 shadow-sm">
              <ul className="space-y-3">
                {exportDocs.map((doc) => (
                  <li
                    key={doc}
                    className="flex items-start gap-3 text-sm text-[#1C1C1C]/80 leading-relaxed"
                    style={{ fontFamily: "var(--font-lora)" }}
                  >
                    <span className="shrink-0 mt-0.5">✅</span>
                    {doc}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* ── Packing Details ── */}
        <section className="max-w-5xl mx-auto px-4 sm:px-6 py-14 md:py-16">
          <h2
            className="text-xl sm:text-2xl font-bold text-[#1C1C1C] mb-8"
            style={{ fontFamily: "var(--font-montserrat)" }}
          >
            Packing Details
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-2xl p-7 border border-[#1C1C1C]/8 shadow-sm">
              <h3
                className="text-[12px] font-semibold tracking-[0.2em] uppercase text-[#1C1C1C]/50 mb-3"
                style={{ fontFamily: "var(--font-montserrat)" }}
              >
                Raw
              </h3>
              <p
                className="text-sm text-[#1C1C1C]/80 leading-relaxed"
                style={{ fontFamily: "var(--font-lora)" }}
              >
                10 kg multi-layer food-grade poly bags in master cartons or PP woven bags
              </p>
            </div>
            <div className="bg-white rounded-2xl p-7 border border-[#1C1C1C]/8 shadow-sm">
              <h3
                className="text-[12px] font-semibold tracking-[0.2em] uppercase text-[#1C1C1C]/50 mb-3"
                style={{ fontFamily: "var(--font-montserrat)" }}
              >
                Private Label Retail
              </h3>
              <p
                className="text-sm text-[#1C1C1C]/80 leading-relaxed"
                style={{ fontFamily: "var(--font-lora)" }}
              >
                Nitrogen-flushed pillow pouches or stand-up doypacks, in export cartons
              </p>
            </div>
          </div>
        </section>

        {/* ── Markets ── */}
        <section className="bg-[#F5F3F0] py-14 md:py-16">
          <div className="max-w-5xl mx-auto px-4 sm:px-6">
            <h2
              className="text-xl sm:text-2xl font-bold text-[#1C1C1C] mb-6"
              style={{ fontFamily: "var(--font-montserrat)" }}
            >
              Current Export Markets
            </h2>
            <div className="flex flex-wrap gap-3 mb-4">
              {markets.map((m) => (
                <span
                  key={m}
                  className="px-5 py-2 rounded-full bg-[#1C1C1C] text-[#FAF8F5] text-[12px] font-semibold tracking-[0.15em]"
                  style={{ fontFamily: "var(--font-montserrat)" }}
                >
                  {m}
                </span>
              ))}
            </div>
            <p
              className="text-sm text-[#1C1C1C]/60 mt-3"
              style={{ fontFamily: "var(--font-lora)" }}
            >
              Currently exporting to these markets. Inquire for other regions.
            </p>
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="bg-[#1C1C1C] py-14 md:py-16">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
            <p
              className="text-lg md:text-xl text-[#FAF8F5]/85 mb-7"
              style={{ fontFamily: "var(--font-lora)" }}
            >
              Ready to start an export inquiry?
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
