"use client";

import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { useCart } from "@/context/CartContext";
import { useContactModal } from "@/context/ContactModalContext";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { event } from "@/lib/gtag";

// Menu items in exact required order
const navLinks = [
  { href: "/raw-phool-makhana", label: "Raw Phool Makhana" },
  { href: "/private-label", label: "Private Label" },
  { href: "/about-us", label: "About Us" },
  { href: "/brand", label: "AÉRI Brand" },
  { href: "/journal", label: "Journal" },
];

export default function Navbar() {
  const { lang, setLang } = useLanguage();
  const { cartCount, setIsCartOpen } = useCart();
  const { openModal } = useContactModal();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [user, setUser] = useState<{ name: string } | null>(null);
  const pathname = usePathname();

  // Show Sign In and FR|EN ONLY on /brand and /products
  const isRetailPage = pathname.startsWith("/brand") || pathname.startsWith("/products");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!isRetailPage) return;
    const checkAuth = async () => {
      try {
        const res = await fetch("/api/auth/me");
        if (res.ok) {
          const data = await res.json();
          setUser(data.user);
        } else {
          setUser(null);
        }
      } catch {
        setUser(null);
      }
    };
    checkAuth();
  }, [pathname, isRetailPage]);

  const toggleLang = () => setLang(lang === "fr" ? "en" : "fr");

  const handleContactClick = () => {
    setMobileOpen(false);
    openModal();
  };

  const navBg = scrolled
    ? "rgba(250, 248, 245, 0.98)"
    : "rgba(250, 248, 245, 0.94)";

  return (
    <header className="fixed top-0 left-0 right-0 z-40 w-full transition-all duration-300">
      {/* ── Desktop Thin Top Bar ── */}
      <div className="hidden lg:flex items-center justify-between px-6 xl:px-12 py-1.5 bg-[#1C1C1C] text-[#FAF8F5] text-[11px] font-montserrat tracking-wide">
        <div className="flex items-center gap-6">
          <span className="font-semibold text-[#D4AF37] uppercase tracking-wider">
            Part of KHT Group
          </span>
          <span className="text-white/40">|</span>
          <span>
            Export inquiries:{' '}
            <a
              href="mailto:kriya@aerisnacks.com"
              onClick={() => event('email_click', { recipient: 'kriya' })}
              className="hover:underline text-white/90"
            >
              kriya@aerisnacks.com
            </a>
          </span>
          <span className="text-white/40">|</span>
          <span>
            Distributors:{' '}
            <a
              href="mailto:info@aerisnacks.com"
              onClick={() => event('email_click', { recipient: 'info' })}
              className="hover:underline text-white/90"
            >
              info@aerisnacks.com
            </a>
          </span>
        </div>

        <div>
          WhatsApp:{' '}
          <a
            href="https://wa.me/919499729424?text=Hello%20A%C3%89RI%20Team%2C%20I%27m%20interested%20in%20your%20products%20and%20would%20like%20to%20know%20more.%20Could%20you%20please%20assist%20me%3F"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => event('whatsapp_click', { location: 'top_bar' })}
            className="hover:underline font-semibold text-[#25D366]"
          >
            +91 94997 29424
          </a>
        </div>
      </div>

      {/* ── Main Navigation Bar ── */}
      <div
        className="w-full flex justify-between items-center px-4 sm:px-6 md:px-12 py-3 border-b border-[#111111]/8 transition-all duration-300"
        style={{
          background: navBg,
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
          boxShadow: scrolled ? "0 1px 12px rgba(28,28,28,0.08)" : "none",
        }}
      >
        {/* ── Logo ── */}
        <Link href="/">
          <h2
            className="text-xl tracking-widest uppercase text-[#1C1C1C] font-semibold cursor-pointer select-none"
            style={{ fontFamily: "var(--font-didot)" }}
          >
            AÉRI
          </h2>
        </Link>

        {/* ── Desktop Nav Links ── */}
        <nav
          className="hidden xl:flex items-center gap-7 text-[13px] tracking-[0.05em] font-medium text-[#1C1C1C]/80"
          style={{ fontFamily: "var(--font-montserrat)" }}
        >
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`transition-colors duration-200 whitespace-nowrap ${
                  isActive ? "text-[#1C1C1C] font-semibold" : "hover:text-[#1C1C1C]"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* ── Right Action Controls ── */}
        <div className="hidden xl:flex items-center gap-4">
          {/* Retail-only: Sign In */}
          {isRetailPage && (
            <>
              {user ? (
                <Link
                  href="/profile"
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#1C1C1C]/25 text-[#1C1C1C] hover:bg-[#1C1C1C] hover:text-[#FAF8F5] transition-all whitespace-nowrap text-[11px] font-semibold"
                >
                  <span>{user.name.split(" ")[0]}</span>
                </Link>
              ) : (
                <Link
                  href="/login"
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#1C1C1C]/25 text-[#1C1C1C] hover:bg-[#1C1C1C] hover:text-[#FAF8F5] transition-all whitespace-nowrap text-[11px] font-semibold"
                >
                  <span>Sign In</span>
                </Link>
              )}

              {/* Retail-only: Language Toggle */}
              <button
                onClick={toggleLang}
                className="flex items-center gap-1.5 px-2 py-1 text-[#1C1C1C] text-[12px] font-medium cursor-pointer"
              >
                <span className={lang === "fr" ? "font-bold" : "opacity-60"}>FR</span>
                <span className="opacity-30">|</span>
                <span className={lang === "en" ? "font-bold" : "opacity-60"}>EN</span>
              </button>

              {/* Cart Drawer Icon */}
              {user && (
                <button
                  onClick={() => setIsCartOpen(true)}
                  aria-label="Open Cart"
                  className="relative p-2 text-[#1C1C1C] hover:bg-[#1C1C1C]/5 rounded-full transition-colors"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="9" cy="21" r="1"></circle>
                    <circle cx="20" cy="21" r="1"></circle>
                    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                  </svg>
                  {cartCount > 0 && (
                    <span className="absolute top-0 right-0 w-4 h-4 bg-[#D4AF37] text-white text-[10px] font-bold flex items-center justify-center rounded-full">
                      {cartCount}
                    </span>
                  )}
                </button>
              )}
            </>
          )}

          {/* Solid Black Button: Contact Us */}
          <button
            onClick={() => openModal()}
            type="button"
            className="px-6 py-2.5 rounded-lg bg-[#1C1C1C] text-[#FAF8F5] hover:bg-black transition-all whitespace-nowrap text-[13px] font-semibold tracking-[0.05em] shadow-sm active:scale-95"
          >
            Contact Us
          </button>
        </div>

        {/* ── Mobile Hamburger ── */}
        <div className="xl:hidden flex items-center gap-2">
          {isRetailPage && (
            <button
              onClick={toggleLang}
              className="px-2 py-1 text-[#1C1C1C] text-[12px] font-medium"
            >
              <span className={lang === "fr" ? "font-bold" : "opacity-60"}>FR</span>
              <span className="opacity-30 mx-0.5">|</span>
              <span className={lang === "en" ? "font-bold" : "opacity-60"}>EN</span>
            </button>
          )}

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="p-2.5 text-[#1C1C1C] cursor-pointer min-h-[44px] min-w-[44px] flex items-center justify-center rounded-md hover:bg-black/5"
            aria-label="Toggle menu"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              {mobileOpen ? (
                <>
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </>
              ) : (
                <>
                  <line x1="3" y1="12" x2="21" y2="12" />
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <line x1="3" y1="18" x2="21" y2="18" />
                </>
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* ── Mobile Menu Dropdown ── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-0 right-0 max-h-[calc(100vh-64px)] overflow-y-auto border-b border-[#1C1C1C]/10 py-5 px-6 flex flex-col gap-4 xl:hidden shadow-xl"
            style={{
              background: "rgba(250, 248, 245, 0.99)",
              backdropFilter: "blur(20px)",
              fontFamily: "var(--font-montserrat)",
            }}
          >
            {/* Top info in mobile drawer */}
            <div className="pb-3 border-b border-gray-200 text-xs text-gray-600 space-y-1">
              <p className="font-semibold text-[#1C1C1C] uppercase tracking-wider text-[11px]">
                Part of KHT Group
              </p>
              <p>Export inquiries: kriya@aerisnacks.com</p>
              <p>Distributors: info@aerisnacks.com</p>
              <p>WhatsApp: +91 94997 29424</p>
            </div>

            {/* Menu Links */}
            <div className="flex flex-col gap-3 py-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="text-[15px] font-medium text-[#1C1C1C] hover:text-black py-1"
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Retail-only: Sign in on mobile */}
            {isRetailPage && (
              <div className="pt-2 border-t border-gray-200">
                {user ? (
                  <Link
                    href="/profile"
                    onClick={() => setMobileOpen(false)}
                    className="block text-sm font-semibold text-[#1C1C1C] py-1"
                  >
                    Account ({user.name.split(" ")[0]})
                  </Link>
                ) : (
                  <Link
                    href="/login"
                    onClick={() => setMobileOpen(false)}
                    className="block text-sm font-semibold text-[#1C1C1C] py-1"
                  >
                    Sign In
                  </Link>
                )}
              </div>
            )}

            {/* Contact Us button inside mobile drawer */}
            <button
              onClick={handleContactClick}
              type="button"
              className="mt-2 w-full min-h-[44px] flex items-center justify-center rounded-lg bg-[#1C1C1C] text-white text-[15px] font-semibold active:scale-95 transition-transform"
            >
              Contact Us
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
