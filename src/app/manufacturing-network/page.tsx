import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Manufacturing Network India | Makhana Partner Facilities | AÉRI",
  description:
    "Partner makhana processing facilities in Jaipur, Katihar, Purnea, and Ahmedabad. Factory visits available. All FSSAI certified.",
};

const facilities = [
  { city: "Jaipur", state: "Rajasthan", role: "Processing and packaging" },
  { city: "Katihar", state: "Bihar", role: "Primary sourcing and processing hub" },
  { city: "Purnea", state: "Bihar", role: "Grading and quality control" },
  { city: "Ahmedabad", state: "Gujarat", role: "Export packaging and dispatch" },
];

const certifications = [
  "FSSAI Central",
  "US-FDA",
  "BRCGS",
  "FSSC 22000",
  "Halal",
  "Kosher",
];

export default function ManufacturingNetworkPage() {
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
            Our Manufacturing Network
          </h1>
          <p
            className="text-base md:text-lg text-[#1C1C1C]/65 max-w-2xl mx-auto"
            style={{ fontFamily: "var(--font-lora)" }}
          >
            Partner facilities across India. Manufacturer names are kept confidential to protect
            commercial relationships.
          </p>
        </section>

        {/* ── Facility Cards (2×2) ── */}
        <section className="max-w-5xl mx-auto px-4 sm:px-6 pb-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {facilities.map((f) => (
              <div
                key={`${f.city}-${f.state}`}
                className="bg-white rounded-2xl p-7 border border-[#1C1C1C]/8 shadow-sm"
              >
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-[#1C1C1C] flex items-center justify-center shrink-0">
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#FAF8F5"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                      <circle cx="12" cy="10" r="3" />
                    </svg>
                  </div>
                  <div>
                    <h3
                      className="text-base font-bold text-[#1C1C1C] mb-0.5"
                      style={{ fontFamily: "var(--font-montserrat)" }}
                    >
                      {f.city}, {f.state}
                    </h3>
                    <p
                      className="text-sm text-[#1C1C1C]/65 leading-relaxed"
                      style={{ fontFamily: "var(--font-lora)" }}
                    >
                      {f.role}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── Certifications ── */}
        <section className="bg-[#F5F3F0] py-14 md:py-16">
          <div className="max-w-5xl mx-auto px-4 sm:px-6">
            <h2
              className="text-xl sm:text-2xl font-bold text-[#1C1C1C] mb-6"
              style={{ fontFamily: "var(--font-montserrat)" }}
            >
              Certifications Held
            </h2>
            <div className="flex flex-wrap gap-3 mb-4">
              {certifications.map((cert) => (
                <span
                  key={cert}
                  className="px-4 py-2 rounded-full bg-white border border-[#1C1C1C]/12 text-[12px] font-semibold tracking-[0.1em] text-[#1C1C1C]/80"
                  style={{ fontFamily: "var(--font-montserrat)" }}
                >
                  {cert}
                </span>
              ))}
            </div>
            <p
              className="text-xs text-[#1C1C1C]/50 mt-2"
              style={{ fontFamily: "var(--font-lora)" }}
            >
              Certificate copies available on request
            </p>
          </div>
        </section>

        {/* ── Compliance ── */}
        <section className="max-w-5xl mx-auto px-4 sm:px-6 py-14 md:py-16">
          <h2
            className="text-xl sm:text-2xl font-bold text-[#1C1C1C] mb-6"
            style={{ fontFamily: "var(--font-montserrat)" }}
          >
            Compliance
          </h2>
          <div className="bg-white rounded-2xl p-7 border border-[#1C1C1C]/8 shadow-sm space-y-4">
            <p className="text-sm text-[#1C1C1C]/80 leading-relaxed" style={{ fontFamily: "var(--font-lora)" }}>
              All facilities comply with FSSAI Central License requirements.
            </p>
            <p className="text-sm text-[#1C1C1C]/80 leading-relaxed" style={{ fontFamily: "var(--font-lora)" }}>
              Laboratory testing at NABL-accredited labs.
            </p>
            <p className="text-sm text-[#1C1C1C]/80 leading-relaxed" style={{ fontFamily: "var(--font-lora)" }}>
              Testing includes: EtO, heavy metals, pesticide residues, microbiological tests.
            </p>
          </div>
        </section>

        {/* ── Visits ── */}
        <section className="bg-[#1C1C1C] py-14 md:py-16">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
            <p
              className="text-lg md:text-xl text-[#FAF8F5]/85 mb-3"
              style={{ fontFamily: "var(--font-lora)" }}
            >
              Buyer factory visits can be arranged.
            </p>
            <p
              className="text-sm text-[#FAF8F5]/55 mb-7"
              style={{ fontFamily: "var(--font-lora)" }}
            >
              Contact us to schedule.
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
