"use client";

import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Mail, ArrowRight, Loader2, User, ShieldCheck } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import toast from "react-hot-toast";

const t = {
  fr: {
    heading: "Créer un compte",
    subtitle: "Rejoignez le club AÉRI",
    nameLabel: "Nom complet",
    emailLabel: "Adresse e-mail",
    otpLabel: "Code de vérification",
    btnSendOtp: "Recevoir le code",
    btnVerifyOtp: "Vérifier et créer le compte",
    btnLoading: "Patientez...",
    hasAccount: "Déjà inscrit ?",
    loginLink: "Se connecter",
    errRequired: "Veuillez remplir tous les champs",
    otpSent: "Code envoyé à votre adresse e-mail !",
    backToEmail: "Changer d'e-mail",
  },
  en: {
    heading: "Create an Account",
    subtitle: "Join the AÉRI club",
    nameLabel: "Full name",
    emailLabel: "Email address",
    otpLabel: "Verification Code",
    btnSendOtp: "Get Verification Code",
    btnVerifyOtp: "Verify & Create Account",
    btnLoading: "Please wait...",
    hasAccount: "Already have an account?",
    loginLink: "Sign In",
    errRequired: "Please fill in all fields",
    otpSent: "Code sent to your email address!",
    backToEmail: "Change Email",
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
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState<"DETAILS" | "OTP">("DETAILS");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) {
      setError(s.errRequired);
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, purpose: "Signup" }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to send OTP");

      toast.success(s.otpSent);
      setStep("OTP");
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!otp || otp.length !== 6) {
      setError("Please enter a valid 6-digit OTP");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, otp, purpose: "Signup" }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Verification failed");

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

          <form className="space-y-4" onSubmit={step === "DETAILS" ? handleSendOtp : handleVerifyOtp} noValidate>
            {error && (
              <div className="bg-red-50/75 border border-red-200/50 text-red-600 px-4 py-2.5 rounded-xl text-xs font-medium text-center">
                {error}
              </div>
            )}

            {step === "DETAILS" && (
              <>
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
                      className="block w-full pl-10 pr-3.5 py-3 border border-[#1C1C1C]/15 rounded-xl focus:ring-2 focus:ring-[#D4AF37]/50 focus:border-[#D4AF37] text-xs bg-white/70 text-[#1C1C1C] outline-none transition-all"
                      placeholder="Jean Dupont"
                    />
                  </div>
                </div>

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
                      className="block w-full pl-10 pr-3.5 py-3 border border-[#1C1C1C]/15 rounded-xl focus:ring-2 focus:ring-[#D4AF37]/50 focus:border-[#D4AF37] text-xs bg-white/70 text-[#1C1C1C] outline-none transition-all"
                      placeholder="name@example.com"
                    />
                  </div>
                </div>
              </>
            )}

            {step === "OTP" && (
              <div>
                <label htmlFor="otp" className="block text-xs font-bold uppercase tracking-wider text-[#1C1C1C]/75 mb-1.5">
                  {s.otpLabel}
                </label>
                <div className="relative rounded-xl shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                    <ShieldCheck className="h-4 w-4 text-[#1C1C1C]/40" />
                  </div>
                  <input
                    id="otp"
                    type="text"
                    maxLength={6}
                    required
                    value={otp}
                    onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
                    className="block w-full pl-10 pr-3.5 py-3 border border-[#1C1C1C]/15 rounded-xl focus:ring-2 focus:ring-[#D4AF37]/50 focus:border-[#D4AF37] text-sm tracking-[0.5em] font-bold text-center bg-white/70 text-[#1C1C1C] outline-none transition-all"
                    placeholder="------"
                  />
                </div>
                <div className="mt-2 text-right">
                  <button
                    type="button"
                    onClick={() => setStep("DETAILS")}
                    className="text-[10px] uppercase font-bold text-[#D4AF37] hover:text-[#1C1C1C] transition-colors"
                  >
                    {s.backToEmail}
                  </button>
                </div>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center items-center gap-2 py-3 px-4 rounded-xl text-xs font-bold tracking-widest uppercase text-[#FAF8F5] bg-[#1C1C1C] hover:bg-[#333333] active:scale-[0.98] transition-all disabled:opacity-75 disabled:pointer-events-none cursor-pointer mt-2"
            >
              {loading ? (
                <><Loader2 className="animate-spin h-4 w-4" /><span>{s.btnLoading}</span></>
              ) : (
                <><span>{step === "DETAILS" ? s.btnSendOtp : s.btnVerifyOtp}</span><ArrowRight className="h-4 w-4" /></>
              )}
            </button>
          </form>

          {step === "DETAILS" && (
            <div className="mt-5 border-t border-[#1C1C1C]/5 pt-5 text-center text-xs text-[#1C1C1C]/70">
              {s.hasAccount}{" "}
              <Link
                href={`/login?callbackUrl=${encodeURIComponent(callbackUrl)}`}
                className="font-bold text-[#D4AF37] hover:text-[#1C1C1C] transition-colors"
              >
                {s.loginLink}
              </Link>
            </div>
          )}
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
