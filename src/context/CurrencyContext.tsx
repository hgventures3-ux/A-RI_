"use client";

import React, { createContext, useCallback, useContext, useEffect, useState } from "react";
import {
  Currency,
  DEFAULT_PRODUCT_BASE_PRICE,
  PriceableProduct,
  currencyForCountry,
  currencyForTimezone,
  formatMoney,
  getProductUnitPrice,
  normalizeCountryCode,
} from "@/lib/pricing";

export type { Currency };

interface CurrencyContextProps {
  currency: Currency;
  country: string | null;
  isIndia: boolean;
  isEU: boolean;
  getPrice: (product?: PriceableProduct) => number;
  formatPrice: (baseUSD?: number) => string;
  formatAmount: (amount: number) => string;
  setCurrencyOverride: (c: Currency | null) => void;
}

const CurrencyContext = createContext<CurrencyContextProps | undefined>(undefined);

function detectCurrencyFromTimezone(): Currency {
  try {
    return currencyForTimezone(Intl.DateTimeFormat().resolvedOptions().timeZone);
  } catch {
    return "USD";
  }
}

export function CurrencyProvider({
  children,
  initialCountry,
}: {
  children: React.ReactNode;
  initialCountry?: string | null;
}) {
  const [country, setCountry] = useState<string | null>(() => normalizeCountryCode(initialCountry));
  const [timezoneCurrency, setTimezoneCurrency] = useState<Currency>(() =>
    currencyForCountry(country, "USD")
  );
  const [override, setOverride] = useState<Currency | null>(null);

  useEffect(() => {
    if (!country) {
      setTimezoneCurrency(detectCurrencyFromTimezone());
    }
  }, [country]);

  useEffect(() => {
    if (country) return;

    let active = true;
    fetch("/api/geo")
      .then((response) => (response.ok ? response.json() : null))
      .then((data: { country?: string } | null) => {
        const resolvedCountry = normalizeCountryCode(data?.country);
        if (active && resolvedCountry) {
          setCountry(resolvedCountry);
          setTimezoneCurrency(currencyForCountry(resolvedCountry, detectCurrencyFromTimezone()));
        }
      })
      .catch(() => {});

    return () => {
      active = false;
    };
  }, [country]);

  const currency: Currency = override ?? (country === "IN" ? "INR" : timezoneCurrency);

  const getPrice = useCallback(
    (product?: PriceableProduct) => getProductUnitPrice(product, currency),
    [currency]
  );

  const formatPrice = useCallback(
    (baseUSD: number = DEFAULT_PRODUCT_BASE_PRICE): string =>
      formatMoney(getProductUnitPrice({ basePrice: baseUSD }, currency), currency),
    [currency]
  );

  const formatAmount = useCallback(
    (amount: number): string => formatMoney(amount, currency),
    [currency]
  );

  const setCurrencyOverride = useCallback(
    (c: Currency | null) => {
      setOverride(c);
    },
    []
  );

  return (
    <CurrencyContext.Provider
      value={{
        currency,
        country,
        isIndia: currency === "INR",
        isEU: currency === "EUR",
        getPrice,
        formatPrice,
        formatAmount,
        setCurrencyOverride,
      }}
    >
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
