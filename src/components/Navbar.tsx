"use client";

import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { useCart } from "@/context/CartContext";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

// नेवबार के सभी भाषा-टेक्स्ट
const navText = {
  fr: {
    brand: "La Marque AÉRI",
    products: "Produits",
    mission: "Notre Raison d'Être",
    contact: "Nous Contacter",
    findUs: "Où nous trouver",
    pro: "Espace Professionnel",
    admin: "Administrateur",
    account: "Mon Compte",
    login: "Se connecter",
  },
  en: {
    brand: "The Brand",
    products: "Products",
    mission: "Our Mission",
    contact: "Contact Us",
    findUs: "Where to Find Us",
    pro: "Espace Professionnel",
    admin: "Admin",
    account: "Account",
    login: "Sign In",
  },
};

// भाषा लेबल — साफ़ दिखने वाला
const langLabel: Record<string, string> = {
  fr: "FR",
  en: "EN",
};

// भाषा चक्र: FR → EN → FR
const langCycle: Record<string, "fr" | "en"> = {
  fr: "en",
  en: "fr",
};

export default function Navbar() {
  const { lang, setLang } = useLanguage();
  const { cartCount, setIsCartOpen } = useCart();
  const s = navText[lang as keyof typeof navText] || navText.fr;
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [user, setUser] = useState<{ name: string } | null>(null);
  const pathname = usePathname();

  // स्क्रॉल पर बैकग्राउंड को ज़्यादा opaque करना
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Check customer auth state on mount/pathname change
  useEffect(() => {
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
  }, [pathname]);

  const toggleLang = () => setLang(langCycle[lang] ?? "fr");

  // टॉप पोजीशन: अब कोई टिकर नहीं है, इसलिए हमेशा 0
  const topPos = "top-0";

  // बैकग्राउंड: स्क्रॉल होने पर ज़्यादा solid ताकि text साफ़ दिखे
  const navBg = scrolled
    ? "rgba(250, 248, 245, 0.98)"
    : "rgba(250, 248, 245, 0.94)";

  const navLinks = [
    { href: "/brand", label: s.brand },
    { href: "/products", label: s.products },
    { href: "/ou-nous-trouver", label: s.findUs },
    { href: "/mission", label: s.mission },
    { href: "/admin", label: s.admin },
  ];

  return (
    <header
      className={`fixed ${topPos} left-0 right-0 z-[40] w-full flex justify-between items-center px-6 md:px-12 py-3 border-b border-[#111111]/8 transition-all duration-300`}
      style={{
        background: navBg,
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        boxShadow: scrolled ? "0 1px 12px rgba(28,28,28,0.08)" : "none",
      }}
    >
      {/* ── Logo ── */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.1 }}
      >
        <Link href="/">
          <h2
            className="text-xl tracking-widest uppercase text-[#1C1C1C] font-semibold cursor-pointer select-none"
            style={{ fontFamily: "var(--font-didot)" }}
          >
            AÉRI
          </h2>
        </Link>
      </motion.div>

      {/* ── Desktop Nav ── */}
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="hidden md:flex items-center gap-6 text-[13px] tracking-[0.05em] font-normal text-[#1C1C1C]/80"
        style={{ fontFamily: "var(--font-montserrat)" }}
      >
        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="hover:text-[#1C1C1C] transition-colors duration-200 whitespace-nowrap"
          >
            {link.label}
          </Link>
        ))}

        {/* ── Espace Professionnel — styled CTA ── */}
        <Link
          href="/espace-pro"
          className="px-5 py-2 rounded-lg bg-[#1C1C1C] text-[#FAF8F5] hover:bg-[#333] transition-all duration-200 whitespace-nowrap text-[12px] font-semibold tracking-[0.05em]"
        >
          {s.pro}
        </Link>

        {/* ── User Auth Link ── */}
        {user ? (
          <Link
            href="/profile"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#1C1C1C]/25 text-[#1C1C1C] hover:bg-[#1C1C1C] hover:text-[#FAF8F5] transition-all duration-200 whitespace-nowrap text-[10px] font-semibold tracking-[0.2em]"
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
            <span className="truncate max-w-[80px]">{user.name.split(" ")[0]}</span>
          </Link>
        ) : (
          <Link
            href="/login"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#1C1C1C]/25 text-[#1C1C1C] hover:bg-[#1C1C1C] hover:text-[#FAF8F5] transition-all duration-200 whitespace-nowrap text-[10px] font-semibold tracking-[0.2em]"
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
            <span>{s.login}</span>
          </Link>
        )}

        {/* ── Language Toggle — toujours visible ── */}
        <button
          onClick={toggleLang}
          aria-label={`Changer la langue — actuellement ${langLabel[lang]}`}
          className="flex items-center gap-2 px-2 py-1 transition-all duration-200 cursor-pointer select-none text-[#1C1C1C] text-[12px] font-normal"
          style={{ fontFamily: "var(--font-montserrat)" }}
        >
          <span className={lang === "fr" ? "font-bold" : "opacity-60 hover:opacity-100 transition-opacity"}>FR</span>
          <span className="opacity-30 text-[10px]">|</span>
          <span className={lang === "en" ? "font-bold" : "opacity-60 hover:opacity-100 transition-opacity"}>EN</span>
        </button>

        {/* ── Cart Toggle ── */}
        {user && (
          <button
            onClick={() => setIsCartOpen(true)}
            aria-label="Ouvrir le panier"
            className="relative p-2 text-[#1C1C1C] hover:bg-[#1C1C1C]/5 rounded-full transition-colors"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="9" cy="21" r="1"></circle>
              <circle cx="20" cy="21" r="1"></circle>
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
            </svg>
            {cartCount > 0 && (
              <span className="absolute top-0 right-0 w-4 h-4 bg-[#D4AF37] text-white text-[10px] font-bold flex items-center justify-center rounded-full transform translate-x-1/4 -translate-y-1/4">
                {cartCount}
              </span>
            )}
          </button>
        )}
      </motion.nav>

      {/* ── Mobile: User + Lang toggle + Hamburger ── */}
      <div className="md:hidden flex items-center gap-2">
        {/* User Auth Mobile */}
        {user ? (
          <Link
            href="/profile"
            className="p-2 text-[#1C1C1C] cursor-pointer"
            aria-label="Mon Compte"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
          </Link>
        ) : (
          <Link
            href="/login"
            className="p-2 text-[#1C1C1C] cursor-pointer"
            aria-label="Connexion"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
          </Link>
        )}

        {/* Langue — toujours visible sur mobile aussi */}
        <button
          onClick={toggleLang}
          aria-label={`Langue : ${langLabel[lang]}`}
          className="flex items-center gap-1.5 px-2 py-1 cursor-pointer select-none text-[#1C1C1C] text-[12px] font-normal"
          style={{ fontFamily: "var(--font-montserrat)" }}
        >
          <span className={lang === "fr" ? "font-bold" : "opacity-60"}>FR</span>
          <span className="opacity-30 text-[10px]">|</span>
          <span className={lang === "en" ? "font-bold" : "opacity-60"}>EN</span>
        </button>

        {/* Cart Mobile */}
        {user && (
          <button
            onClick={() => setIsCartOpen(true)}
            className="relative p-2 text-[#1C1C1C] cursor-pointer"
            aria-label="Panier"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="9" cy="21" r="1"></circle>
              <circle cx="20" cy="21" r="1"></circle>
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
            </svg>
            {cartCount > 0 && (
              <span className="absolute top-0 right-0 w-4 h-4 bg-[#D4AF37] text-white text-[10px] font-bold flex items-center justify-center rounded-full transform translate-x-1/4 -translate-y-1/4">
                {cartCount}
              </span>
            )}
          </button>
        )}

        {/* Hamburger */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="p-2 text-[#1C1C1C] cursor-pointer"
          aria-label="Menu"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
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

      {/* ── Mobile Menu Dropdown ── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-0 right-0 border-b border-[#1C1C1C]/10 py-5 px-6 flex flex-col gap-3.5 md:hidden"
            style={{
              background: "rgba(250, 248, 245, 0.99)",
              backdropFilter: "blur(20px)",
              fontFamily: "var(--font-montserrat)",
            }}
          >
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="text-[13px] tracking-[0.05em] font-normal text-[#1C1C1C]/80 hover:text-[#1C1C1C] transition-colors"
              >
                {link.label}
              </Link>
            ))}

            {/* Profile/Login in Mobile Menu */}
            {user ? (
              <Link
                href="/profile"
                onClick={() => setMobileOpen(false)}
                className="text-[11px] tracking-[0.2em] uppercase font-bold text-[#D4AF37] hover:text-[#1C1C1C] transition-colors"
              >
                {s.account} ({user.name.split(" ")[0]})
              </Link>
            ) : (
              <Link
                href="/login"
                onClick={() => setMobileOpen(false)}
                className="text-[11px] tracking-[0.2em] uppercase font-bold text-[#D4AF37] hover:text-[#1C1C1C] transition-colors"
              >
                {s.login}
              </Link>
            )}

            {/* Espace Pro comme CTA dans le menu mobile */}
            <Link
              href="/espace-pro"
              onClick={() => setMobileOpen(false)}
              className="mt-1 inline-flex items-center justify-center px-4 py-2.5 rounded-lg bg-[#1C1C1C] text-[#FAF8F5] text-[12px] font-semibold tracking-[0.05em] transition-all hover:bg-[#333]"
            >
              {s.pro}
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
