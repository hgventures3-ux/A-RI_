"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Lock, Mail, ArrowRight, Loader2, User } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import toast from "react-hot-toast";

const translations = {
  fr: {
    heading: "Se Connecter",
    subtitle: "Accédez à votre espace client AÉRI",
    emailLabel: "Adresse e-mail",
    passLabel: "Mot de passe",
    remember: "Se souvenir de moi",
    btnLogin: "Se connecter",
    btnLoading: "Connexion en cours...",
    noAccount: "Nouveau chez AÉRI ?",
    createAccount: "Créer un compte",
    errorRequired: "Veuillez remplir tous les champs",
    successLogin: "Connexion réussie !",
  },
  en: {
    heading: "Sign In",
    subtitle: "Access your AÉRI customer space",
    emailLabel: "Email address",
    passLabel: "Password",
    remember: "Remember me",
    btnLogin: "Sign In",
    btnLoading: "Signing in...",
    noAccount: "New to AÉRI?",
    createAccount: "Create an account",
    errorRequired: "Please fill in all fields",
    successLogin: "Login successful!",
  },
};

function LoginContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/profile";
  const { lang } = useLanguage();
  const s = translations[lang as keyof typeof translations] || translations.fr;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError(s.errorRequired);
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, rememberMe }),
      });

      if (!res.ok) {
        let errorMessage = "Login failed";
        try {
          const data = await res.json();
          errorMessage = data.error || errorMessage;
        } catch (e) {
          errorMessage = `Server error (${res.status})`;
        }
        throw new Error(errorMessage);
      }

      const data = await res.json();

      toast.success(s.successLogin);
      router.push(callbackUrl);
      router.refresh();
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F5E6D3] text-[#1C1C1C]">
      <Navbar />

      <div className="flex-1 flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8 py-24 sm:py-32">
        <div className="w-full max-w-md bg-white/60 backdrop-blur-xl border border-white/40 p-8 sm:p-10 rounded-3xl shadow-xl">
          <div className="text-center mb-8">
            <span
              className="text-3xl font-bold tracking-widest uppercase text-[#1C1C1C] block mb-2"
              style={{ fontFamily: "var(--font-didot), serif" }}
            >
              AÉRI
            </span>
            <h2 className="text-xl font-semibold text-[#1C1C1C]" style={{ fontFamily: "var(--font-montserrat)" }}>
              {s.heading}
            </h2>
            <p className="text-xs text-[#1C1C1C]/60 mt-1">
              {s.subtitle}
            </p>
          </div>

          <form className="space-y-5" onSubmit={handleLogin}>
            {error && (
              <div className="bg-red-50/75 border border-red-200/50 text-red-600 px-4 py-2.5 rounded-xl text-xs font-medium text-center">
                {error}
              </div>
            )}

            <div>
              <label htmlFor="email" className="block text-xs font-bold uppercase tracking-wider text-[#1C1C1C]/75 mb-1.5">
                {s.emailLabel}
              </label>
              <div className="relative rounded-xl shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                  <Mail className="h-4 w-4 text-[#1C1C1C]/40" />
                </div>
                <input
                  id="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full pl-10 pr-3.5 py-3 border border-[#1C1C1C]/15 rounded-xl focus:ring-2 focus:ring-[#D4AF37]/50 focus:border-[#D4AF37] text-xs bg-white/70 text-[#1C1C1C] outline-none transition-all"
                  placeholder="name@example.com"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-xs font-bold uppercase tracking-wider text-[#1C1C1C]/75 mb-1.5">
                {s.passLabel}
              </label>
              <div className="relative rounded-xl shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                  <Lock className="h-4 w-4 text-[#1C1C1C]/40" />
                </div>
                <input
                  id="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full pl-10 pr-3.5 py-3 border border-[#1C1C1C]/15 rounded-xl focus:ring-2 focus:ring-[#D4AF37]/50 focus:border-[#D4AF37] text-xs bg-white/70 text-[#1C1C1C] outline-none transition-all"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="h-3.5 w-3.5 text-[#1C1C1C] focus:ring-[#D4AF37] border-white/40 rounded bg-white"
                />
                <span className="ml-2 text-xs text-[#1C1C1C]/70">
                  {s.remember}
                </span>
              </label>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center items-center gap-2 py-3 px-4 rounded-xl text-xs font-bold tracking-widest uppercase text-[#F5E6D3] bg-[#1C1C1C] hover:bg-[#333333] active:scale-[0.98] transition-all disabled:opacity-75 disabled:pointer-events-none cursor-pointer"
            >
              {loading ? (
                <>
                  <Loader2 className="animate-spin h-4 w-4 text-[#F5E6D3]" />
                  <span>{s.btnLoading}</span>
                </>
              ) : (
                <>
                  <span>{s.btnLogin}</span>
                  <ArrowRight className="h-4 w-4 text-[#F5E6D3]" />
                </>
              )}
            </button>
          </form>

          <div className="mt-6 border-t border-[#1C1C1C]/5 pt-6 text-center text-xs text-[#1C1C1C]/70">
            {s.noAccount}{" "}
            <Link
              href={`/signup?callbackUrl=${encodeURIComponent(callbackUrl)}`}
              className="font-bold text-[#D4AF37] hover:text-[#1C1C1C] transition-colors"
            >
              {s.createAccount}
            </Link>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-[#F5E6D3]">
          <Loader2 className="animate-spin h-8 w-8 text-[#1C1C1C]" />
        </div>
      }
    >
      <LoginContent />
    </Suspense>
  );
}
