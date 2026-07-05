"use client";

import { useEffect } from "react";
import { LanguageProvider, useLanguage } from "@/context/LanguageContext";
import { CurrencyProvider, useCurrency } from "@/context/CurrencyContext";
import { CartProvider } from "@/context/CartContext";
import CartDrawer from "@/components/CartDrawer";
import { Toaster } from "react-hot-toast";

/** 
 * Bridge: Listens to LanguageContext and syncs currency with language.
 * - FR language → EUR override
 * - EN language → remove override (timezone-based auto detection applies)
 */
function LanguageCurrencyBridge() {
  const { lang } = useLanguage();
  const { setCurrencyOverride } = useCurrency();

  useEffect(() => {
    if (lang === "fr") {
      setCurrencyOverride("EUR");
    } else {
      // EN/HI → let timezone detection decide (INR for India, USD for others)
      setCurrencyOverride(null);
    }
  }, [lang, setCurrencyOverride]);

  return null;
}

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <LanguageProvider>
      <CurrencyProvider>
        <LanguageCurrencyBridge />
        <CartProvider>
          {children}
          <CartDrawer />
          <Toaster position="bottom-right" toastOptions={{ style: { fontFamily: "var(--font-montserrat), sans-serif", borderRadius: '10px', background: '#333', color: '#fff' } }} />
        </CartProvider>
      </CurrencyProvider>
    </LanguageProvider>
  );
}
