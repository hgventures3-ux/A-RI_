"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export default function OuNousTrouverPage() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    // TODO: send to backend
    setSubmitted(true);
  };

  return (
    <main
      className="min-h-screen w-full flex flex-col items-center justify-center px-6 py-20"
      style={{ background: "#FFFFFF" }}
    >
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="text-3xl md:text-5xl text-center text-[#1C1C1C] mb-6"
        style={{
          fontFamily: "'Didot', 'Playfair Display', serif",
        }}
      >
        Où nous trouver
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.15 }}
        className="text-base md:text-lg text-[#6E6E73] text-center max-w-md mb-10 leading-relaxed"
        style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
      >
        Notre carte de distribution arrive bientôt. Inscrivez-vous pour être
        alerté.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.3 }}
        className="w-full max-w-sm"
      >
        {!submitted ? (
          <form onSubmit={handleSubmit} className="flex gap-2">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="votre@email.com"
              required
              className="flex-1 rounded-xl border border-[#E0E0E0] bg-white px-4 py-3 text-sm text-[#1C1C1C] placeholder-[#A0A0A0] focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/40"
              style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
            />
            <button
              type="submit"
              className="rounded-xl px-5 py-3 text-sm font-semibold tracking-wide text-white shrink-0 transition-opacity hover:opacity-90"
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
            Merci ! Vous serez alerté dès que notre carte sera disponible. ✉️
          </motion.p>
        )}
      </motion.div>
    </main>
  );
}
