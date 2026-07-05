"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

export type Currency = "EUR" | "INR" | "USD";

interface CurrencyContextProps {
  currency: Currency;
  isIndia: boolean;
  isEU: boolean;
  formatPrice: (baseUSD?: number) => string;
  formatAmount: (amount: number) => string;
  setCurrencyOverride: (c: Currency | null) => void;
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

function detectCurrencyFromTimezone(): Currency {
  try {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
    if (tz === "Asia/Calcutta" || tz === "Asia/Kolkata") return "INR";
    if (EU_TIMEZONES.includes(tz)) return "EUR";
  } catch {
    // fallback
  }
  return "USD"; // Rest of world → USD
}

export function CurrencyProvider({ children }: { children: React.ReactNode }) {
  // Timezone-based currency (auto-detected)
  const [timezoneCurrency, setTimezoneCurrency] = useState<Currency>("USD");
  // Manual override (set when language is switched)
  const [override, setOverride] = useState<Currency | null>(null);

  useEffect(() => {
    setTimezoneCurrency(detectCurrencyFromTimezone());
  }, []);

  // Final currency = override (from language) OR timezone detection
  const currency: Currency = override ?? timezoneCurrency;

  const isIndia = currency === "INR";
  const isEU = currency === "EUR";

  const formatPrice = (baseUSD: number = USD_BASE): string => {
    if (currency === "INR") {
      const inrPrice = Math.round(baseUSD * USD_TO_INR);
      return `₹${inrPrice}`;
    }
    if (currency === "EUR") {
      const eurPrice = (baseUSD * USD_TO_EUR).toFixed(2);
      return `€${eurPrice}`;
    }
    // USD (default for US, rest of world)
    return `$${baseUSD.toFixed(2)}`;
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

  const setCurrencyOverride = (c: Currency | null) => {
    setOverride(c);
  };

  return (
    <CurrencyContext.Provider value={{ currency, isIndia, isEU, formatPrice, formatAmount, setCurrencyOverride }}>
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
