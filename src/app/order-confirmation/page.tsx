"use client";

import { Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useLanguage } from "@/context/LanguageContext";

const translations = {
  fr: {
    title: "Commande Confirmée",
    subtitle: "Merci pour votre commande !",
    body: "Votre paiement a été effectué avec succès et votre commande est en cours de traitement. Vous recevrez un e-mail de confirmation sous peu.",
    orderNo: "N° de commande",
    whatsNext: "Prochaines étapes",
    step1: "Email de confirmation envoyé",
    step1Desc: "Vérifiez votre boîte de réception pour les détails de votre commande.",
    step2: "Préparation en cours",
    step2Desc: "Votre commande est en cours de préparation avec soin.",
    step3: "Expédition",
    step3Desc: "Vous serez notifié dès que votre commande sera expédiée.",
    continueShopping: "Continuer vos achats",
    viewAccount: "Voir mes commandes",
  },
  en: {
    title: "Order Confirmed",
    subtitle: "Thank you for your order!",
    body: "Your payment was successful and your order is being processed. You will receive a confirmation email shortly.",
    orderNo: "Order Number",
    whatsNext: "What's Next",
    step1: "Confirmation Email Sent",
    step1Desc: "Check your inbox for your order details.",
    step2: "Preparation in Progress",
    step2Desc: "Your order is being carefully prepared.",
    step3: "Shipping",
    step3Desc: "You will be notified as soon as your order ships.",
    continueShopping: "Continue Shopping",
    viewAccount: "View My Orders",
  },
};

function OrderConfirmationContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { lang } = useLanguage();
  const s = translations[lang as keyof typeof translations] || translations.fr;

  const orderNumber = searchParams.get("orderNumber") || "";

  const steps = [
    { icon: "✉️", title: s.step1, desc: s.step1Desc },
    { icon: "📦", title: s.step2, desc: s.step2Desc },
    { icon: "🚚", title: s.step3, desc: s.step3Desc },
  ];

  return (
    <main className="min-h-screen flex flex-col bg-[#FAF8F5]">
      <Navbar />

      <div className="flex-1 pt-32 pb-20 px-6 flex flex-col items-center justify-center">
        <div className="max-w-2xl w-full mx-auto text-center">
          {/* Animated checkmark */}
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", damping: 15, stiffness: 200 }}
            className="w-24 h-24 rounded-full bg-green-100 border-4 border-green-500 flex items-center justify-center mx-auto mb-8"
          >
            <motion.svg
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              width="48"
              height="48"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#16a34a"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <motion.polyline points="20 6 9 17 4 12" />
            </motion.svg>
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-4xl md:text-5xl font-bold text-[#1C1C1C] mb-4"
            style={{ fontFamily: "var(--font-didot), serif" }}
          >
            {s.title}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-xl text-[#4c463e] mb-6"
            style={{ fontFamily: "var(--font-lora), serif" }}
          >
            {s.subtitle}
          </motion.p>

          {/* Order number badge */}
          {orderNumber && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 }}
              className="inline-block bg-white/80 border border-[#cec5bb] rounded-2xl px-8 py-4 mb-8 shadow-sm"
            >
              <p
                className="text-xs uppercase tracking-[0.25em] text-[#6c6257] mb-1"
                style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
              >
                {s.orderNo}
              </p>
              <p
                className="text-2xl font-bold text-[#1C1C1C]"
                style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
              >
                {orderNumber}
              </p>
            </motion.div>
          )}

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-sm text-[#4c463e]/80 mb-12 max-w-md mx-auto leading-relaxed"
            style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
          >
            {s.body}
          </motion.p>

          {/* Steps */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-white/60 border border-[#cec5bb] rounded-3xl p-8 mb-10 text-left"
          >
            <h2
              className="text-lg font-semibold text-[#1C1C1C] mb-6"
              style={{ fontFamily: "var(--font-didot), serif" }}
            >
              {s.whatsNext}
            </h2>
            <div className="space-y-5">
              {steps.map((step, i) => (
                <div key={i} className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-[#FAF8F5] border border-[#cec5bb] flex items-center justify-center text-xl shrink-0">
                    {step.icon}
                  </div>
                  <div>
                    <p
                      className="font-semibold text-[#1C1C1C] text-sm"
                      style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
                    >
                      {step.title}
                    </p>
                    <p
                      className="text-xs text-[#4c463e]/70 mt-0.5"
                      style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
                    >
                      {step.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link
              href="/profile"
              className="px-8 py-3 border-2 border-[#1C1C1C] text-[#1C1C1C] rounded-xl font-semibold text-sm tracking-wide hover:bg-[#1C1C1C] hover:text-white transition-all"
              style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
            >
              {s.viewAccount}
            </Link>
            <Link
              href="/products"
              className="px-8 py-3 bg-[#1C1C1C] text-white rounded-xl font-semibold text-sm tracking-wide hover:bg-[#333] transition-colors"
              style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
            >
              {s.continueShopping}
            </Link>
          </motion.div>
        </div>
      </div>

      <Footer />
    </main>
  );
}

export default function OrderConfirmationPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-[#FAF8F5]">
        <div className="animate-spin w-8 h-8 border-2 border-[#1C1C1C] border-t-transparent rounded-full" />
      </div>
    }>
      <OrderConfirmationContent />
    </Suspense>
  );
}
