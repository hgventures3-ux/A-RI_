import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';
import {
  detectCountryFromHeaders,
  GEO_COUNTRY_COOKIE,
  normalizeCountryCode,
} from './lib/pricing';

const JWT_SECRET = process.env.JWT_SECRET || "aerisnacks-super-secret-key-change-in-production";

function resolveCountry(request: NextRequest) {
  return (
    detectCountryFromHeaders(request.headers) ||
    normalizeCountryCode(request.cookies.get(GEO_COUNTRY_COOKIE)?.value)
  );
}

function applyCountryCookie(response: NextResponse, country: string | null) {
  if (country) {
    response.cookies.set(GEO_COUNTRY_COOKIE, country, {
      maxAge: 60 * 60 * 24 * 30,
      path: '/',
      sameSite: 'lax',
    });
  }
  return response;
}

function requestHeadersWithCountry(request: NextRequest, country: string | null) {
  const requestHeaders = new Headers(request.headers);
  if (country) requestHeaders.set('x-aeri-country', country);
  return requestHeaders;
}

export async function middleware(request: NextRequest) {
  // Current URL path check karte hain
  const path = request.nextUrl.pathname;
  const country = resolveCountry(request);

  // Sirf /admin or /api/admin routes ko protect karte hain
  if (path.startsWith('/admin') || path.startsWith('/api/admin')) {
    // Agar login page ya setup API pe hain, toh skip karte hain validation
    if (path === '/admin/login' || path === '/api/admin/auth/login' || path === '/api/admin/auth/setup') {
      const response = NextResponse.next({
        request: { headers: requestHeadersWithCountry(request, country) },
      });
      return applyCountryCookie(response, country);
    }

    const token = request.cookies.get('admin_token')?.value;

    if (!token) {
      if (path.startsWith('/api/admin')) {
        return applyCountryCookie(
          NextResponse.json({ error: "Unauthorized" }, { status: 401 }),
          country
        );
      }
      const loginUrl = new URL('/admin/login', request.url);
      loginUrl.searchParams.set('callbackUrl', path);
      return applyCountryCookie(NextResponse.redirect(loginUrl), country);
    }

    try {
      const secret = new TextEncoder().encode(JWT_SECRET);
      const { payload } = await jwtVerify(token, secret);
      
      const requestHeaders = requestHeadersWithCountry(request, country);
      requestHeaders.set('x-user-id', payload.sub as string);
      requestHeaders.set('x-user-role', payload.role as string);

      const response = NextResponse.next({
        request: {
          headers: requestHeaders,
        },
      });
      return applyCountryCookie(response, country);
    } catch (error) {
      console.error("JWT Verification failed:", error);
      if (path.startsWith('/api/admin')) {
        const response = NextResponse.json({ error: "Invalid token" }, { status: 401 });
        response.cookies.delete('admin_token');
        return applyCountryCookie(response, country);
      }
      const loginUrl = new URL('/admin/login', request.url);
      loginUrl.searchParams.set('callbackUrl', path);
      const response = NextResponse.redirect(loginUrl);
      response.cookies.delete('admin_token');
      return applyCountryCookie(response, country);
    }
  }

  // User profile and checkout routes ko protect karte hain
  if (path.startsWith('/profile') || path.startsWith('/checkout')) {
    const token = request.cookies.get('user_token')?.value;

    if (!token) {
      const loginUrl = new URL('/login', request.url);
      loginUrl.searchParams.set('callbackUrl', path);
      return applyCountryCookie(NextResponse.redirect(loginUrl), country);
    }

    try {
      const secret = new TextEncoder().encode(JWT_SECRET);
      const { payload } = await jwtVerify(token, secret);
      
      const requestHeaders = requestHeadersWithCountry(request, country);
      requestHeaders.set('x-user-id', payload.sub as string);
      requestHeaders.set('x-user-role', 'User');

      const response = NextResponse.next({
        request: {
          headers: requestHeaders,
        },
      });
      return applyCountryCookie(response, country);
    } catch (error) {
      console.error("User JWT Verification failed:", error);
      const loginUrl = new URL('/login', request.url);
      loginUrl.searchParams.set('callbackUrl', path);
      const response = NextResponse.redirect(loginUrl);
      response.cookies.delete('user_token');
      return applyCountryCookie(response, country);
    }
  }

  // Baki saare public routes aise hi pass hone do
  const response = NextResponse.next({
    request: { headers: requestHeadersWithCountry(request, country) },
  });
  return applyCountryCookie(response, country);
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\..*).*)',
  ],
};
