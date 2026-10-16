"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import t from "@/translations";

// Static footer link columns
const footerColumns = [
  {
    heading: "Services",
    links: [
      { label: "Raw Phool Makhana", href: "/raw-phool-makhana" },
      { label: "Private Label", href: "/private-label" },
      { label: "Manufacturing Network", href: "/manufacturing-network" },
      { label: "Export & Shipping", href: "/export-shipping" },
    ],
  },
  {
    heading: "Brand",
    links: [
      { label: "AÉRI Brand", href: "/brand" },
      { label: "Products", href: "/products" },
      { label: "Our Story", href: "/brand" },
      { label: "Request a Quote", href: "/espace-pro" },
    ],
  },
  {
    heading: "Legal",
    links: [
      { label: "Legal Notice", href: "/legal/legal-notice" },
      { label: "Terms & Conditions", href: "/legal/t-c" },
      { label: "Return Policy", href: "/legal/return-policy" },
      { label: "Privacy Policy", href: "/legal/privacy" },
      { label: "Grievance Officer", href: "/legal/legal-notice" },
    ],
  },
];

export default function Footer() {
  const { lang } = useLanguage();
  const s = t.pro[lang];

  return (
    <footer className="relative w-full bg-[#1C1C1C] text-[#FFFFFF] overflow-hidden">
      {/* Request a Quote CTA strip */}
      <div className="border-b border-[#FFFFFF]/8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 md:py-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <p
            className="text-lg md:text-xl font-semibold text-[#FFFFFF]"
            style={{ fontFamily: "var(--font-montserrat)" }}
          >
            Ready to place an order or request samples?
          </p>
          <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
            <Link
              href="/espace-pro"
              className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-[#FAF8F5] text-[#1C1C1C] text-sm font-semibold tracking-wide transition-colors hover:bg-[#e8e6e3] cursor-pointer shrink-0 whitespace-nowrap"
              style={{ fontFamily: "var(--font-montserrat)" }}
            >
              Request a Quote
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Main footer */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 md:gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <h3
              className="text-2xl font-bold italic text-[#FFFFFF] mb-3"
              style={{ fontFamily: "var(--font-didot)" }}
            >
              AÉRI
            </h3>
            <p
              className="text-sm text-[#FFFFFF]/70 font-light leading-relaxed mb-3"
              style={{ fontFamily: "var(--font-lora)" }}
            >
              Raw &amp; Private-Label Makhana Exporter
              <br />
              H&amp;G Ventures Private Limited, India
            </p>
            <div
              className="text-xs text-[#FFFFFF]/70 font-light space-y-1 mb-5"
              style={{ fontFamily: "var(--font-montserrat)" }}
            >
              <div>
                <span className="text-[#FFFFFF]/40 uppercase tracking-wider text-[10px]">WhatsApp:</span>{" "}
                <a
                  href="https://wa.me/919499729424"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors underline underline-offset-2"
                >
                  +91 94997 29424
                </a>
              </div>
              <div>
                <span className="text-[#FFFFFF]/40 uppercase tracking-wider text-[10px]">Call (Alternate):</span>{" "}
                <a
                  href="tel:+918460058916"
                  className="hover:text-white transition-colors underline underline-offset-2"
                >
                  +91 84600 58916
                </a>
              </div>
            </div>
            {/* Social & Contact icons */}
            <div className="flex flex-wrap gap-2.5">
              {[
                {
                  name: "Instagram",
                  href: "https://www.instagram.com/aeri.makhana",
                  icon: (
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                    </svg>
                  ),
                },
                {
                  name: "LinkedIn",
                  href: "https://www.linkedin.com/company/aeri-snacks/",
                  icon: (
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                      <rect width="4" height="12" x="2" y="9" />
                      <circle cx="4" cy="4" r="2" />
                    </svg>
                  ),
                },
                {
                  name: "WhatsApp",
                  href: "https://wa.me/919499729424",
                  icon: (
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21" />
                      <path d="M9 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1a5 5 0 0 0 5 5h1a.5.5 0 0 0 0-1h-1a.5.5 0 0 0 0 1" />
                    </svg>
                  ),
                },
                {
                  name: "Call",
                  href: "tel:+918460058916",
                  icon: (
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                    </svg>
                  ),
                },
              ].map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target={social.href.startsWith("http") ? "_blank" : undefined}
                  rel={social.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="flex items-center gap-2 px-3.5 py-2 rounded-full bg-[#FFFFFF]/6 border border-[#FFFFFF]/10 text-[#FFFFFF]/70 transition-colors hover:bg-[#FFFFFF]/12 hover:text-[#FFFFFF]"
                >
                  {social.icon}
                  <span
                    className="text-xs font-medium"
                    style={{ fontFamily: "var(--font-montserrat)" }}
                  >
                    {social.name}
                  </span>
                </a>
              ))}
            </div>
          </div>

          {/* Static link columns */}
          {footerColumns.map((col) => (
            <div key={col.heading}>
              <h5
                className="text-xs font-semibold tracking-[0.25em] uppercase text-[#FFFFFF]/80 mb-4"
                style={{ fontFamily: "var(--font-montserrat)" }}
              >
                {col.heading}
              </h5>
              <ul className="space-y-2.5">
                {col.links.map((link) => (
                  <li key={link.label + link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-[#FFFFFF]/70 font-light transition-colors hover:text-[#FFFFFF]"
                      style={{ fontFamily: "var(--font-lora)" }}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-[#FFFFFF]/6">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-5 flex flex-col md:flex-row items-center justify-between gap-3">
          <div className="flex flex-col gap-1">
            <p
              className="text-xs text-[#FFFFFF]/75 font-light"
              style={{ fontFamily: "var(--font-lora)" }}
            >
              {s.copyright}
            </p>
            <p
              className="text-xs text-[#FFFFFF]/75 font-light"
              style={{ fontFamily: "var(--font-lora)" }}
            >
              1602/E GIDC HALOL-389350, Gujarat, India
            </p>
            <p
              className="text-xs text-[#FFFFFF]/75 font-light"
              style={{ fontFamily: "var(--font-lora)" }}
            >
              FSSAI Central License: 24724001000135
            </p>
          </div>
          <div className="flex items-center gap-4">
            <Link
              href="/legal/return-policy"
              className="text-xs text-[#FFFFFF]/75 font-light transition-colors hover:text-[#FFFFFF]"
              style={{ fontFamily: "var(--font-lora)" }}
            >
              {s.returnPolicy}
            </Link>
            <span className="text-[#FFFFFF]/40">·</span>
            <Link
              href="/legal/privacy"
              className="text-xs text-[#FFFFFF]/75 font-light transition-colors hover:text-[#FFFFFF]"
              style={{ fontFamily: "var(--font-lora)" }}
            >
              {s.privacy}
            </Link>
            <span className="text-[#FFFFFF]/40">·</span>
            <Link
              href="/legal/legal-notice"
              className="text-xs text-[#FFFFFF]/75 font-light transition-colors hover:text-[#FFFFFF]"
              style={{ fontFamily: "var(--font-lora)" }}
            >
              Grievance Officer
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
