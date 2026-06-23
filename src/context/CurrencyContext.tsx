"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

export type Currency = "EUR" | "INR" | "USD";

interface CurrencyContextProps {
  currency: Currency;
  isIndia: boolean;
  formatPrice: (price: number, priceINR?: number) => string;
  formatAmount: (amount: number) => string;
}

const CurrencyContext = createContext<CurrencyContextProps | undefined>(undefined);

export function CurrencyProvider({ children }: { children: React.ReactNode }) {
  const [currency, setCurrency] = useState<Currency>("EUR"); // Default to EUR for Europe

  useEffect(() => {
    // Detect India timezone
    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    if (timeZone === "Asia/Calcutta" || timeZone === "Asia/Kolkata") {
      setCurrency("INR");
    }
  }, []);

  const isIndia = currency === "INR";

  const formatPrice = (price: number, priceINR?: number) => {
    if (isIndia) {
      const finalPrice = priceINR !== undefined ? priceINR : 65; // Default to 65 for INR if not explicitly set
      return `₹ ${finalPrice.toFixed(2)}`;
    }
    // Assume standard pricing is in EUR
    return `€ ${price.toFixed(2)}`;
  };

  const formatAmount = (amount: number) => {
    if (isIndia) {
      return `₹ ${amount.toFixed(2)}`;
    }
    return `€ ${amount.toFixed(2)}`;
  };

  return (
    <CurrencyContext.Provider value={{ currency, isIndia, formatPrice, formatAmount }}>
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
