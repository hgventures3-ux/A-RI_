"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useContactModal } from "@/context/ContactModalContext";
import { event } from "@/lib/gtag";

export default function Footer() {
  const pathname = usePathname();
  const { openModal } = useContactModal();

  const isHomePage = pathname === "/";

  return (
    <footer className="relative w-full bg-[#1C1C1C] text-[#FFFFFF] overflow-hidden">
      {/* ── Bottom band (all pages except Home) ── */}
      {!isHomePage && (
        <div className="border-b border-[#FFFFFF]/10 bg-[#141414]">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 md:py-10 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
            <p className="text-lg md:text-xl font-semibold text-[#FFFFFF]">
              Ready to place an order or request samples?
            </p>
            <button
              onClick={() => openModal()}
              type="button"
              className="inline-flex items-center justify-center min-h-[44px] px-7 py-3 rounded-xl bg-[#FAF8F5] text-[#1C1C1C] text-sm font-semibold tracking-wide transition-all hover:bg-white active:scale-95 cursor-pointer shrink-0 whitespace-nowrap shadow-md"
            >
              Contact Us
            </button>
          </div>
        </div>
      )}

      {/* ── Main Footer ── */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 md:gap-8">
          {/* Brand Info Block */}
          <div className="md:col-span-1">
            <h3
              className="text-2xl font-bold uppercase tracking-widest text-[#FFFFFF] mb-3"
              style={{ fontFamily: "var(--font-didot)" }}
            >
              AÉRI
            </h3>
            <p className="text-sm font-semibold text-[#D4AF37] mb-1">
              H&amp;G Ventures Private Limited.
            </p>
            <p className="text-xs text-[#FFFFFF]/80 uppercase tracking-wider mb-4">
              Part of KHT Group.
            </p>

            <div className="text-xs text-[#FFFFFF]/75 font-light space-y-2 mb-6">
              <div>
                <span className="text-[#FFFFFF]/50">Export inquiries:</span><br />
                <a
                  href="mailto:kriya@aerisnacks.com"
                  onClick={() => event('email_click', { recipient: 'kriya' })}
                  className="hover:text-white transition-colors underline underline-offset-2"
                >
                  kriya@aerisnacks.com
                </a>
              </div>
              <div>
                <span className="text-[#FFFFFF]/50">Distributor inquiries:</span><br />
                <a
                  href="mailto:info@aerisnacks.com"
                  onClick={() => event('email_click', { recipient: 'info' })}
                  className="hover:text-white transition-colors underline underline-offset-2"
                >
                  info@aerisnacks.com
                </a>
              </div>
              <div>
                <span className="text-[#FFFFFF]/50">WhatsApp:</span>{" "}
                <a
                  href="https://wa.me/919499729424?text=Hello%20A%C3%89RI%20Team%2C%20I%27m%20interested%20in%20your%20products%20and%20would%20like%20to%20know%20more.%20Could%20you%20please%20assist%20me%3F"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => event('whatsapp_click', { location: 'footer' })}
                  className="hover:text-white transition-colors underline underline-offset-2 font-medium"
                >
                  +91 94997 29424
                </a>
              </div>
              <div>
                <span className="text-[#FFFFFF]/50">Phone:</span>{" "}
                <a
                  href="tel:+918460058916"
                  onClick={() => event('phone_click', { location: 'footer' })}
                  className="hover:text-white transition-colors underline underline-offset-2"
                >
                  +91 84600 58916
                </a>
              </div>
            </div>

            {/* Social Icons */}
            <div className="flex flex-wrap gap-2.5">
              <a
                href="https://www.instagram.com/aeri.makhana"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#FFFFFF]/6 border border-[#FFFFFF]/10 text-xs text-[#FFFFFF]/80 hover:bg-[#FFFFFF]/12 hover:text-[#FFFFFF] transition-colors"
              >
                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                </svg>
                Instagram
              </a>
              <a
                href="https://www.linkedin.com/company/aeri-snacks/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#FFFFFF]/6 border border-[#FFFFFF]/10 text-xs text-[#FFFFFF]/80 hover:bg-[#FFFFFF]/12 hover:text-[#FFFFFF] transition-colors"
              >
                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                  <rect width="4" height="12" x="2" y="9" />
                  <circle cx="4" cy="4" r="2" />
                </svg>
                LinkedIn
              </a>
            </div>
          </div>

          {/* Column 1: Services */}
          <div>
            <h5 className="text-xs font-semibold tracking-[0.2em] uppercase text-[#FFFFFF]/80 mb-4">
              Services
            </h5>
            <ul className="space-y-2.5 text-sm font-light text-[#FFFFFF]/70">
              <li>
                <Link href="/raw-phool-makhana" className="hover:text-white transition-colors">
                  Raw Phool Makhana
                </Link>
              </li>
              <li>
                <Link href="/private-label" className="hover:text-white transition-colors">
                  Private Label
                </Link>
              </li>
              <li>
                <Link href="/about-us" className="hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 2: Brand */}
          <div>
            <h5 className="text-xs font-semibold tracking-[0.2em] uppercase text-[#FFFFFF]/80 mb-4">
              Brand
            </h5>
            <ul className="space-y-2.5 text-sm font-light text-[#FFFFFF]/70">
              <li>
                <Link href="/brand" className="hover:text-white transition-colors">
                  AÉRI Brand
                </Link>
              </li>
              <li>
                <Link href="/products" className="hover:text-white transition-colors">
                  Products
                </Link>
              </li>
              <li>
                <Link href="/journal" className="hover:text-white transition-colors">
                  Journal
                </Link>
              </li>
              <li>
                <button
                  onClick={() => openModal()}
                  className="hover:text-white transition-colors text-left"
                >
                  Contact Us
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Legal */}
          <div>
            <h5 className="text-xs font-semibold tracking-[0.2em] uppercase text-[#FFFFFF]/80 mb-4">
              Legal
            </h5>
            <ul className="space-y-2.5 text-sm font-light text-[#FFFFFF]/70">
              <li>
                <Link href="/legal/legal-notice" className="hover:text-white transition-colors">
                  Legal Notice
                </Link>
              </li>
              <li>
                <Link href="/legal/t-c" className="hover:text-white transition-colors">
                  Terms &amp; Conditions
                </Link>
              </li>
              <li>
                <Link href="/legal/return-policy" className="hover:text-white transition-colors">
                  Return Policy
                </Link>
              </li>
              <li>
                <Link href="/legal/privacy" className="hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/legal/legal-notice" className="hover:text-white transition-colors">
                  Grievance Officer
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* ── Single Bottom Bar (Cleaned up, no duplicate lines) ── */}
      <div className="border-t border-[#FFFFFF]/10 bg-[#121212]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left text-xs text-[#FFFFFF]/60">
          <div>
            <p>© {new Date().getFullYear()} AÉRI Makhana. H&amp;G Ventures Private Limited.</p>
            <p className="mt-0.5">1602/E GIDC Halol-389350, Gujarat, India</p>
            <p className="mt-1 font-mono text-[11px] text-[#FFFFFF]/80">
              FSSAI Lic. No. 10726997000565
            </p>
          </div>

          <div className="flex items-center gap-4 text-[11px]">
            <Link href="/legal/return-policy" className="hover:text-white transition-colors">
              Return Policy
            </Link>
            <span>·</span>
            <Link href="/legal/privacy" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <span>·</span>
            <Link href="/legal/legal-notice" className="hover:text-white transition-colors">
              Grievance Officer
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
