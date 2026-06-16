"use client";

import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Lock, Mail, ArrowRight, Loader2, User, MapPin, ChevronDown } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import toast from "react-hot-toast";

// Common country codes
const COUNTRY_CODES = [
  { code: "+33", flag: "🇫🇷", name: "France" },
  { code: "+1", flag: "🇺🇸", name: "USA" },
  { code: "+44", flag: "🇬🇧", name: "UK" },
  { code: "+49", flag: "🇩🇪", name: "Germany" },
  { code: "+91", flag: "🇮🇳", name: "India" },
  { code: "+34", flag: "🇪🇸", name: "Spain" },
  { code: "+39", flag: "🇮🇹", name: "Italy" },
  { code: "+32", flag: "🇧🇪", name: "Belgium" },
  { code: "+41", flag: "🇨🇭", name: "Switzerland" },
  { code: "+31", flag: "🇳🇱", name: "Netherlands" },
  { code: "+1", flag: "🇨🇦", name: "Canada" },
  { code: "+61", flag: "🇦🇺", name: "Australia" },
  { code: "+971", flag: "🇦🇪", name: "UAE" },
  { code: "+65", flag: "🇸🇬", name: "Singapore" },
  { code: "+81", flag: "🇯🇵", name: "Japan" },
];

const t = {
  fr: {
    heading: "Créer un compte",
    subtitle: "Rejoignez le club AÉRI et profitez d'avantages exclusifs",
    nameLabel: "Nom complet",
    emailLabel: "Adresse e-mail",
    phoneLabel: "Téléphone",
    cityLabel: "Ville",
    passLabel: "Mot de passe",
    btnSignup: "Créer mon compte",
    btnLoading: "Création du compte...",
    hasAccount: "Déjà inscrit ?",
    loginLink: "Se connecter",
    errRequired: "Nom, e-mail et mot de passe sont requis",
    errShortPass: "Le mot de passe doit contenir au moins 6 caractères",
  },
  en: {
    heading: "Create an Account",
    subtitle: "Join the AÉRI club and enjoy exclusive benefits",
    nameLabel: "Full name",
    emailLabel: "Email address",
    phoneLabel: "Phone",
    cityLabel: "City",
    passLabel: "Password",
    btnSignup: "Create Account",
    btnLoading: "Creating account...",
    hasAccount: "Already have an account?",
    loginLink: "Sign In",
    errRequired: "Name, email and password are required",
    errShortPass: "Password must be at least 6 characters",
  },
};

function SignupContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/profile";
  const { lang } = useLanguage();
  const s = t[lang as keyof typeof t] || t.fr;

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [countryCode, setCountryCode] = useState("+33");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !password) {
      setError(s.errRequired);
      return;
    }
    if (password.length < 6) {
      setError(s.errShortPass);
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password, phone, countryCode, city }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Sign-up failed");
      }

      toast.success(lang === "fr" ? "Inscription réussie !" : "Sign-up successful!");
      router.push(callbackUrl);
      router.refresh();
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F5] text-[#1C1C1C]">
      <Navbar />
      <div className="flex-1 flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8 py-24 sm:py-32">
        <div className="w-full max-w-md bg-white/60 backdrop-blur-xl border border-white/40 p-8 sm:p-10 rounded-3xl shadow-xl">
          <div className="text-center mb-8">
            <span className="text-3xl font-bold tracking-widest uppercase text-[#1C1C1C] block mb-2" style={{ fontFamily: "var(--font-didot), serif" }}>
              AÉRI
            </span>
            <h2 className="text-xl font-semibold text-[#1C1C1C]" style={{ fontFamily: "var(--font-montserrat)" }}>
              {s.heading}
            </h2>
            <p className="text-xs text-[#1C1C1C]/60 mt-1">{s.subtitle}</p>
          </div>

          <form className="space-y-4" onSubmit={handleSignup} noValidate>
            {error && (
              <div className="bg-red-50/75 border border-red-200/50 text-red-600 px-4 py-2.5 rounded-xl text-xs font-medium text-center">
                {error}
              </div>
            )}

            {/* Full Name */}
            <div>
              <label htmlFor="name" className="block text-xs font-bold uppercase tracking-wider text-[#1C1C1C]/75 mb-1">
                {s.nameLabel} *
              </label>
              <div className="relative rounded-xl">
                <User className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#1C1C1C]/40 pointer-events-none" />
                <input
                  id="name"
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="block w-full pl-10 pr-3.5 py-2.5 border border-[#1C1C1C]/15 rounded-xl focus:ring-2 focus:ring-[#D4AF37]/50 focus:border-[#D4AF37] text-xs bg-white/70 text-[#1C1C1C] outline-none transition-all"
                  placeholder="Jean Dupont"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-xs font-bold uppercase tracking-wider text-[#1C1C1C]/75 mb-1">
                {s.emailLabel} *
              </label>
              <div className="relative rounded-xl">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#1C1C1C]/40 pointer-events-none" />
                <input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full pl-10 pr-3.5 py-2.5 border border-[#1C1C1C]/15 rounded-xl focus:ring-2 focus:ring-[#D4AF37]/50 focus:border-[#D4AF37] text-xs bg-white/70 text-[#1C1C1C] outline-none transition-all"
                  placeholder="name@example.com"
                />
              </div>
            </div>

            {/* Phone with Country Code */}
            <div>
              <label htmlFor="phone" className="block text-xs font-bold uppercase tracking-wider text-[#1C1C1C]/75 mb-1">
                {s.phoneLabel}
              </label>
              <div className="flex gap-2">
                {/* Country Code Selector */}
                <div className="relative">
                  <select
                    value={countryCode}
                    onChange={(e) => setCountryCode(e.target.value)}
                    className="appearance-none pl-3 pr-7 py-2.5 border border-[#1C1C1C]/15 rounded-xl text-xs bg-white/70 text-[#1C1C1C] outline-none focus:ring-2 focus:ring-[#D4AF37]/50 focus:border-[#D4AF37] transition-all cursor-pointer min-w-[90px]"
                    aria-label="Country code"
                  >
                    {COUNTRY_CODES.map((c, i) => (
                      <option key={i} value={c.code}>
                        {c.flag} {c.code}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 h-3 w-3 text-[#1C1C1C]/40 pointer-events-none" />
                </div>
                {/* Phone number input */}
                <input
                  id="phone"
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="flex-1 px-3.5 py-2.5 border border-[#1C1C1C]/15 rounded-xl focus:ring-2 focus:ring-[#D4AF37]/50 focus:border-[#D4AF37] text-xs bg-white/70 text-[#1C1C1C] outline-none transition-all"
                  placeholder="06 12 34 56 78"
                />
              </div>
            </div>

            {/* City */}
            <div>
              <label htmlFor="city" className="block text-xs font-bold uppercase tracking-wider text-[#1C1C1C]/75 mb-1">
                {s.cityLabel}
              </label>
              <div className="relative rounded-xl">
                <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#1C1C1C]/40 pointer-events-none" />
                <input
                  id="city"
                  type="text"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="block w-full pl-10 pr-3.5 py-2.5 border border-[#1C1C1C]/15 rounded-xl focus:ring-2 focus:ring-[#D4AF37]/50 focus:border-[#D4AF37] text-xs bg-white/70 text-[#1C1C1C] outline-none transition-all"
                  placeholder="Paris"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-xs font-bold uppercase tracking-wider text-[#1C1C1C]/75 mb-1">
                {s.passLabel} *
              </label>
              <div className="relative rounded-xl">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#1C1C1C]/40 pointer-events-none" />
                <input
                  id="password"
                  type={showPass ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full pl-10 pr-10 py-2.5 border border-[#1C1C1C]/15 rounded-xl focus:ring-2 focus:ring-[#D4AF37]/50 focus:border-[#D4AF37] text-xs bg-white/70 text-[#1C1C1C] outline-none transition-all"
                  placeholder="Min. 6 characters"
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#1C1C1C]/40 hover:text-[#1C1C1C] text-[10px] font-bold uppercase tracking-wider"
                >
                  {showPass ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center items-center gap-2 py-3 px-4 rounded-xl text-xs font-bold tracking-widest uppercase text-[#FAF8F5] bg-[#1C1C1C] hover:bg-[#333333] active:scale-[0.98] transition-all disabled:opacity-75 disabled:pointer-events-none cursor-pointer mt-2"
            >
              {loading ? (
                <><Loader2 className="animate-spin h-4 w-4" /><span>{s.btnLoading}</span></>
              ) : (
                <><span>{s.btnSignup}</span><ArrowRight className="h-4 w-4" /></>
              )}
            </button>
          </form>

          <div className="mt-5 border-t border-[#1C1C1C]/5 pt-5 text-center text-xs text-[#1C1C1C]/70">
            {s.hasAccount}{" "}
            <Link
              href={`/login?callbackUrl=${encodeURIComponent(callbackUrl)}`}
              className="font-bold text-[#D4AF37] hover:text-[#1C1C1C] transition-colors"
            >
              {s.loginLink}
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default function SignupPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-[#FAF8F5]">
        <Loader2 className="animate-spin h-8 w-8 text-[#1C1C1C]" />
      </div>
    }>
      <SignupContent />
    </Suspense>
  );
}
