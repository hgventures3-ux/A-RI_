export type Currency = "EUR" | "INR" | "USD";

export const GEO_COUNTRY_COOKIE = "aeri_country";
export const INDIA_COUNTRY_CODE = "IN";
export const INDIA_UNIT_PRICE = 65;
export const DEFAULT_PRODUCT_BASE_PRICE = 2.99;
export const USD_TO_EUR = 0.92;

const EU_COUNTRIES = new Set([
  "AT", "BE", "BG", "HR", "CY", "CZ", "DK", "EE", "FI", "FR", "DE", "GR",
  "HU", "IE", "IT", "LV", "LT", "LU", "MT", "NL", "PL", "PT", "RO", "SK",
  "SI", "ES", "SE",
]);

const EU_TIMEZONES = new Set([
  "Europe/Paris", "Europe/Berlin", "Europe/Madrid", "Europe/Rome",
  "Europe/Amsterdam", "Europe/Brussels", "Europe/Vienna", "Europe/Warsaw",
  "Europe/Prague", "Europe/Budapest", "Europe/Bucharest", "Europe/Athens",
  "Europe/Helsinki", "Europe/Stockholm", "Europe/Copenhagen", "Europe/Oslo",
  "Europe/Lisbon", "Europe/Dublin", "Europe/Luxembourg", "Europe/Zurich",
]);

export const PRODUCT_ID_TO_SLUG: Record<string, string> = {
  salt: "himalayan-salt",
  truffle: "black-truffle",
  herb: "mediterranean-herb-fusion",
  "himalayan-salt": "himalayan-salt",
  "black-truffle": "black-truffle",
  "mediterranean-herb-fusion": "mediterranean-herb-fusion",
  "caramel-salt": "caramel-salt",
  "dark-chocolate": "dark-chocolate",
  "lemon-mint": "lemon-mint",
  "peanut-butter": "peanut-butter",
  "peri-peri": "peri-peri",
  "smokey-bbq": "smokey-bbq",
  "tangy-tomato": "tangy-tomato",
};

export type PriceableProduct = {
  basePrice?: number | string | null;
  basePriceINR?: number | string | null;
  price?: number | string | null;
  discountPrice?: number | string | null;
};

export function normalizeCountryCode(country?: string | null): string | null {
  const normalized = country?.trim().toUpperCase();
  if (
    !normalized ||
    normalized === "XX" ||
    normalized === "UNKNOWN" ||
    normalized === "UNDEFINED"
  ) {
    return null;
  }
  return normalized;
}

export function detectCountryFromHeaders(headers: Headers): string | null {
  return normalizeCountryCode(
    headers.get("x-aeri-country") ||
      headers.get("x-vercel-ip-country") ||
      headers.get("cf-ipcountry") ||
      headers.get("cloudfront-viewer-country") ||
      headers.get("x-country-code") ||
      headers.get("x-geo-country")
  );
}

export function currencyForCountry(country?: string | null, fallback: Currency = "USD"): Currency {
  const normalized = normalizeCountryCode(country);
  if (normalized === INDIA_COUNTRY_CODE) return "INR";
  if (normalized && EU_COUNTRIES.has(normalized)) return "EUR";
  return fallback;
}

export function currencyForTimezone(timeZone?: string | null): Currency {
  if (timeZone === "Asia/Calcutta" || timeZone === "Asia/Kolkata") return "INR";
  if (timeZone && EU_TIMEZONES.has(timeZone)) return "EUR";
  return "USD";
}

export function isIndiaCurrency(currency: Currency): boolean {
  return currency === "INR";
}

function numberOrUndefined(value: number | string | null | undefined): number | undefined {
  if (value === null || value === undefined || value === "") return undefined;
  const parsed = typeof value === "number" ? value : Number(value);
  return Number.isFinite(parsed) ? parsed : undefined;
}

export function getProductUnitPrice(product: PriceableProduct | undefined, currency: Currency): number {
  if (currency === "INR") {
    const inrPrice = numberOrUndefined(product?.basePriceINR);
    return inrPrice !== undefined ? inrPrice : INDIA_UNIT_PRICE;
  }

  const basePrice =
    numberOrUndefined(product?.discountPrice) ??
    numberOrUndefined(product?.price) ??
    numberOrUndefined(product?.basePrice) ??
    DEFAULT_PRODUCT_BASE_PRICE;

  if (currency === "EUR") {
    return Number((basePrice * USD_TO_EUR).toFixed(2));
  }

  return Number(basePrice.toFixed(2));
}

export function formatMoney(amount: number, currency: Currency): string {
  if (currency === "INR") return `₹${amount.toFixed(2)}`;
  if (currency === "EUR") return `€${amount.toFixed(2)}`;
  return `$${amount.toFixed(2)}`;
}

export function resolveCartProductSlug(id?: string | null): string {
  if (!id) return "";
  return PRODUCT_ID_TO_SLUG[id] || id;
}
