"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

export type Currency = "EUR" | "INR" | "USD";

interface CurrencyContextProps {
  currency: Currency;
  isIndia: boolean;
  isEU: boolean;
  formatPrice: () => string;          // Always $2.99 base, converted
  formatAmount: (amount: number) => string;
}

const CurrencyContext = createContext<CurrencyContextProps | undefined>(undefined);

// EU/France timezones
const EU_TIMEZONES = [
  "Europe/Paris", "Europe/Berlin", "Europe/Madrid", "Europe/Rome",
  "Europe/Amsterdam", "Europe/Brussels", "Europe/Vienna", "Europe/Warsaw",
  "Europe/Prague", "Europe/Budapest", "Europe/Bucharest", "Europe/Athens",
  "Europe/Helsinki", "Europe/Stockholm", "Europe/Copenhagen", "Europe/Oslo",
  "Europe/Lisbon", "Europe/Dublin", "Europe/Luxembourg", "Europe/Zurich",
];

// Fixed conversion rates (base: $2.99 USD)
const USD_BASE = 2.99;
const USD_TO_INR = 84;   // 1 USD ≈ ₹84
const USD_TO_EUR = 0.92; // 1 USD ≈ €0.92

function detectCurrency(): Currency {
  try {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
    if (tz === "Asia/Calcutta" || tz === "Asia/Kolkata") return "INR";
    if (EU_TIMEZONES.includes(tz)) return "EUR";
  } catch {
    // fallback
  }
  return "USD"; // Rest of world (US, etc.) → USD
}

export function CurrencyProvider({ children }: { children: React.ReactNode }) {
  const [currency, setCurrency] = useState<Currency>("USD"); // SSR safe

  useEffect(() => {
    setCurrency(detectCurrency());
  }, []);

  const isIndia = currency === "INR";
  const isEU = currency === "EUR";

  // Base price = $2.99, converted to local currency
  const formatPrice = (): string => {
    if (currency === "INR") {
      const inrPrice = Math.round(USD_BASE * USD_TO_INR);
      return `₹${inrPrice}`;
    }
    if (currency === "EUR") {
      const eurPrice = (USD_BASE * USD_TO_EUR).toFixed(2);
      return `€${eurPrice}`;
    }
    // USD (default for US, rest of world)
    return `$${USD_BASE.toFixed(2)}`;
  };

  const formatAmount = (amount: number): string => {
    if (currency === "INR") {
      return `₹${(amount * USD_TO_INR).toFixed(0)}`;
    }
    if (currency === "EUR") {
      return `€${(amount * USD_TO_EUR).toFixed(2)}`;
    }
    return `$${amount.toFixed(2)}`;
  };

  return (
    <CurrencyContext.Provider value={{ currency, isIndia, isEU, formatPrice, formatAmount }}>
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency() {
  const context = useContext(CurrencyContext);
  if (context === undefined) {
    throw new Error("useCurrency must be used within a CurrencyProvider");
  }
  return context;
}
