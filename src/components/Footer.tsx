"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import t from "@/translations";
import { useState, useEffect } from "react";

export default function Footer() {
  const { lang } = useLanguage();
  const s = t.pro[lang];
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [dynamicProducts, setDynamicProducts] = useState<any[]>([]);

  useEffect(() => {
    fetch("/api/products")
      .then(res => res.json())
      .then(data => {
        if (data.success && data.data) {
          setDynamicProducts(data.data.slice(0, 6)); // Display up to 6 products
        }
      })
      .catch(console.error);
  }, []);

  const handleSubscribe = async () => {
    if (!email) return;
    setLoading(true);
    try {
      const res = await fetch("/api/subscribers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, source: "Footer Newsletter" }),
      });
      const data = await res.json();
      if (data.success) {
        setSuccess(true);
        setEmail("");
        setTimeout(() => setSuccess(false), 4000);
      } else {
        console.error("Failed to subscribe");
      }
    } catch (error) {
      console.error("Error subscribing", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <footer className="relative w-full bg-[#1C1C1C] text-[#FFFFFF] overflow-hidden">
      {/* Waitlist banner */}
      <div className="border-b border-[#FFFFFF]/8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 md:py-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <span
              className="inline-flex items-center gap-2 text-[11px] font-semibold tracking-[0.3em] uppercase text-[#8E8E93] mb-2"
              style={{ fontFamily: "var(--font-montserrat)" }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#8E8E93] animate-pulse" />
              {s.waitlistLabel}
            </span>
            <h4
              className="text-lg md:text-xl font-bold text-[#FFFFFF]"
              style={{ fontFamily: "var(--font-montserrat)" }}
            >
              {s.waitlistTitle}
            </h4>
            <p
              className="text-sm text-[#FFFFFF]/45 mt-1"
              style={{ fontFamily: "var(--font-lora)" }}
            >
              {s.waitlistSub}
            </p>
          </div>

          <div className="flex gap-2 w-full md:w-auto">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={s.waitlistPh}
              className="flex-1 md:w-64 px-4 py-3 rounded-xl bg-[#FFFFFF]/8 border border-[#FFFFFF]/12 text-sm text-[#FFFFFF] placeholder:text-[#FFFFFF]/30 focus:outline-none focus:border-[#FFFFFF]/25 transition-all"
              style={{ fontFamily: "var(--font-lora)" }}
            />
            <motion.button
              onClick={handleSubscribe}
              disabled={loading}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="px-5 py-3 rounded-xl bg-[#8E8E93] text-[#111111] text-sm font-semibold tracking-wide transition-colors hover:bg-[#8E8E93]/90 cursor-pointer shrink-0 disabled:opacity-70"
              style={{ fontFamily: "var(--font-montserrat)" }}
            >
              {loading ? "..." : success ? "✓" : s.waitlistBtn}
            </motion.button>
          </div>
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
              className="text-sm text-[#FFFFFF]/70 font-light leading-relaxed mb-5"
              style={{ fontFamily: "var(--font-lora)" }}
            >
              {s.brandTagline1}
              <br />
              {s.brandTagline2}
            </p>
            {/* Social icons */}
            <div className="flex flex-wrap gap-3">
              {[
                { 
                  name: "Instagram", 
                  href: "https://www.instagram.com/aeri.makhana", 
                  icon: <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
                },
                { 
                  name: "LinkedIn", 
                  href: "https://www.linkedin.com/company/aeri-snacks/", 
                  icon: <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
                },
                { 
                  name: "WhatsApp", 
                  href: "https://wa.me/919499729424", 
                  icon: <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21" /><path d="M9 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1a5 5 0 0 0 5 5h1a.5.5 0 0 0 0-1h-1a.5.5 0 0 0 0 1" /></svg>
                },
              ].map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#FFFFFF]/6 border border-[#FFFFFF]/10 text-[#FFFFFF]/70 transition-colors hover:bg-[#FFFFFF]/12 hover:text-[#FFFFFF]"
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

          {/* Links — एक्सप्लिसिट रूट मैपिंग (Explicit route mapping to prevent broken links) */}
          {(() => {
            // हर लिंक के लिए सही href मैपिंग
            const getRoutes = (currentLang: string): Record<string, string[]> => {
              if (currentLang === 'en') {
                return {
                  products: [
                    "/products",
                    "/products/signature",
                    "/products/gourmet",
                    "/espace-pro"
                  ],
                  company: [
                    "/company/our-story",
                    "/mission",
                    "/company/transparency",
                    "/company/certifications",
                    "/company/pro-portal"
                  ],
                  legal: [
                    "/legal/legal-notice",
                    "/legal/t-c",
                    "/legal/return-policy",
                    "/legal/retractation"
                  ]
                };
              }
              return {
                products: [
                  "/products",
                  "/products/signature",
                  "/products/gourmet",
                  "/espace-pro"
                ],
                company: [
                  "/company/notre-histoire",
                  "/mission",
                  "/company/transparence",
                  "/company/certifications",
                  "/company/espace-pro"
                ],
                legal: [
                  "/legal/mentions-legales",
                  "/legal/cgv",
                  "/legal/politique-de-retour",
                  "/legal/retractation"
                ]
              };
            };

            const linkRoutes = getRoutes(lang);

            const categories = Object.keys(s.footerLinks) as string[];
            return categories.map((category, i) => (
              <div key={category}>
                <h5
                  className="text-xs font-semibold tracking-[0.25em] uppercase text-[#FFFFFF]/80 mb-4"
                  style={{ fontFamily: "var(--font-montserrat)" }}
                >
                  {s.footerCats[i]}
                </h5>
                <ul className="space-y-2.5">
                  {category === "products" && dynamicProducts.length > 0 ? (
                    dynamicProducts.map((prod) => (
                      <li key={prod._id || prod.slug}>
                        <Link
                          href={`/products/${prod.slug}`}
                          className="text-sm text-[#FFFFFF]/70 font-light transition-colors hover:text-[#FFFFFF]"
                          style={{ fontFamily: "var(--font-lora)" }}
                        >
                          {prod.name}
                        </Link>
                      </li>
                    ))
                  ) : (
                    (s.footerLinks[category as keyof typeof s.footerLinks] as string[]).map((link: string, j: number) => {
                      const routeKey = category === "products" ? "products" : category === "company" || category === "entreprise" ? "company" : "legal";
                      const href = linkRoutes[routeKey]?.[j] || "#";
                      return (
                        <li key={link}>
                          <Link
                            href={href}
                            className="text-sm text-[#FFFFFF]/70 font-light transition-colors hover:text-[#FFFFFF]"
                            style={{ fontFamily: "var(--font-lora)" }}
                          >
                            {link}
                          </Link>
                        </li>
                      );
                    })
                  )}
                </ul>
              </div>
            ));
          })()}
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
              FSSAI: [TO BE PROVIDED]
            </p>
          </div>
          <div className="flex items-center gap-4">
            <Link
              href={lang === 'en' ? "/legal/return-policy" : "/legal/politique-de-retour"}
              className="text-xs text-[#FFFFFF]/75 font-light transition-colors hover:text-[#FFFFFF]"
              style={{ fontFamily: "var(--font-lora)" }}
            >
              {s.returnPolicy}
            </Link>
            <span className="text-[#FFFFFF]/40">·</span>
            <Link
              href={lang === 'en' ? "/legal/privacy" : "/legal/confidentialite"}
              className="text-xs text-[#FFFFFF]/75 font-light transition-colors hover:text-[#FFFFFF]"
              style={{ fontFamily: "var(--font-lora)" }}
            >
              {s.privacy}
            </Link>
            <span className="text-[#FFFFFF]/40">·</span>
            <Link
              href={lang === 'en' ? "/legal/legal-notice" : "/legal/mentions-legales"}
              className="text-xs text-[#FFFFFF]/75 font-light transition-colors hover:text-[#FFFFFF]"
              style={{ fontFamily: "var(--font-lora)" }}
            >
              {lang === 'en' ? "Grievance Officer" : "Agent de Griefs"}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
