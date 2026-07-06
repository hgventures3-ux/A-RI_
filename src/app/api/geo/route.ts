import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import {
  GEO_COUNTRY_COOKIE,
  detectCountryFromHeaders,
  normalizeCountryCode,
} from "@/lib/pricing";

function getClientIp(headers: Headers): string | null {
  const forwardedFor = headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  const realIp = headers.get("x-real-ip")?.trim();
  const ip = forwardedFor || realIp;

  if (!ip || ip === "::1" || ip === "127.0.0.1") return null;
  return ip;
}

async function lookupCountryByIp(ip: string): Promise<string | null> {
  try {
    const response = await fetch(`https://ipapi.co/${ip}/country/`, {
      next: { revalidate: 60 * 60 * 24 },
    });
    if (!response.ok) return null;
    return normalizeCountryCode(await response.text());
  } catch {
    return null;
  }
}

export async function GET(req: Request) {
  const cookieStore = await cookies();
  const headerCountry = detectCountryFromHeaders(req.headers);
  const cookieCountry = normalizeCountryCode(cookieStore.get(GEO_COUNTRY_COOKIE)?.value);
  const ip = getClientIp(req.headers);
  const ipCountry = ip ? await lookupCountryByIp(ip) : null;
  const country = headerCountry || cookieCountry || ipCountry;

  const response = NextResponse.json({ country });
  if (country) {
    response.cookies.set(GEO_COUNTRY_COOKIE, country, {
      maxAge: 60 * 60 * 24 * 30,
      path: "/",
      sameSite: "lax",
    });
  }
  return response;
}
