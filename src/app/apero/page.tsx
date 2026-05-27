"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export default function AperoPage() {
  const [feedback, setFeedback] = useState("");
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);
  const [email, setEmail] = useState("");
  const [emailSubmitted, setEmailSubmitted] = useState(false);

  const handleFeedbackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!feedback.trim()) return;
    // TODO: send to backend
    setFeedbackSubmitted(true);
  };

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    // TODO: send to backend
    setEmailSubmitted(true);
  };

  return (
    <main
      className="min-h-screen w-full flex flex-col items-center px-5 py-10 md:py-16"
      style={{ background: "#F5E6D3" }}
    >
      {/* 1. Hero Headline */}
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="text-3xl md:text-5xl text-center text-[#1C1C1C] leading-tight max-w-lg mb-10"
        style={{
          fontFamily: "'Didot', 'Playfair Display', serif",
        }}
      >
        Vous venez de goûter l&apos;apéro du futur.
      </motion.h1>

      {/* 2. Feedback textarea */}
      <motion.form
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.15 }}
        onSubmit={handleFeedbackSubmit}
        className="w-full max-w-md mb-10"
      >
        {!feedbackSubmitted ? (
          <>
            <textarea
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              placeholder="Dites-nous ce que vous en avez pensé"
              rows={4}
              className="w-full rounded-xl border border-[#E0D5C8] bg-white px-4 py-3 text-sm text-[#1C1C1C] placeholder-[#9E9689] resize-none focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/40"
              style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
            />
            <button
              type="submit"
              className="w-full mt-3 rounded-xl py-3 text-sm font-semibold tracking-wide text-white transition-colors"
              style={{
                background: "#1C1C1C",
                fontFamily: "var(--font-montserrat), sans-serif",
              }}
            >
              Envoyer
            </button>
          </>
        ) : (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center text-sm text-[#6E6E73]"
            style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
          >
            Merci pour votre retour ! 🙏
          </motion.p>
        )}
      </motion.form>

      {/* 3. Badge Icons */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.3 }}
        className="flex items-center justify-center gap-4 md:gap-6 mb-10"
      >
        {[
          { icon: "🌱", label: "Vegan" },
          { icon: "🌾", label: "Sans Gluten" },
          { icon: "💪", label: "9,5g Protéines" },
        ].map((badge, i) => (
          <div
            key={i}
            className="flex flex-col items-center gap-1.5"
          >
            <div className="w-14 h-14 rounded-full bg-white border border-[#E0D5C8] flex items-center justify-center text-2xl shadow-sm">
              {badge.icon}
            </div>
            <span
              className="text-[10px] md:text-xs font-medium text-[#1C1C1C] tracking-wide"
              style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
            >
              {badge.label}
            </span>
          </div>
        ))}
      </motion.div>

      {/* 4. Email Capture */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.45 }}
        className="w-full max-w-md"
      >
        <p
          className="text-center text-sm text-[#4A4A4A] mb-4 leading-relaxed"
          style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
        >
          Soyez le premier servi quand nous arrivons en France
        </p>

        {!emailSubmitted ? (
          <form onSubmit={handleEmailSubmit} className="flex gap-2">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="votre@email.com"
              required
              className="flex-1 rounded-xl border border-[#E0D5C8] bg-white px-4 py-3 text-sm text-[#1C1C1C] placeholder-[#9E9689] focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/40"
              style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
            />
            <button
              type="submit"
              className="rounded-xl px-5 py-3 text-sm font-semibold tracking-wide text-white shrink-0 transition-colors"
              style={{
                background: "#1C1C1C",
                fontFamily: "var(--font-montserrat), sans-serif",
              }}
            >
              S&apos;inscrire
            </button>
          </form>
        ) : (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center text-sm text-[#6E6E73]"
            style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
          >
            Inscription confirmée ! Vous serez alerté. ✉️
          </motion.p>
        )}
      </motion.div>

      {/* Minimal branding */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="mt-auto pt-12"
      >
        <span
          className="text-[10px] tracking-[0.3em] uppercase text-[#9E9689] font-semibold"
          style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
        >
          AÉRI
        </span>
      </motion.div>
    </main>
  );
}
