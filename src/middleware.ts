import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

const JWT_SECRET = process.env.JWT_SECRET || "aerisnacks-super-secret-key-change-in-production";

export async function middleware(request: NextRequest) {
  // Current URL path check karte hain
  const path = request.nextUrl.pathname;

  // Sirf /admin or /api/admin routes ko protect karte hain
  if (path.startsWith('/admin') || path.startsWith('/api/admin')) {
    // Agar login page ya setup API pe hain, toh skip karte hain validation
    if (path === '/admin/login' || path === '/api/admin/auth/login' || path === '/api/admin/auth/setup') {
      return NextResponse.next();
    }

    const token = request.cookies.get('admin_token')?.value;

    if (!token) {
      if (path.startsWith('/api/admin')) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
      }
      const loginUrl = new URL('/admin/login', request.url);
      loginUrl.searchParams.set('callbackUrl', path);
      return NextResponse.redirect(loginUrl);
    }

    try {
      const secret = new TextEncoder().encode(JWT_SECRET);
      const { payload } = await jwtVerify(token, secret);
      
      const requestHeaders = new Headers(request.headers);
      requestHeaders.set('x-user-id', payload.sub as string);
      requestHeaders.set('x-user-role', payload.role as string);

      return NextResponse.next({
        request: {
          headers: requestHeaders,
        },
      });
    } catch (error) {
      console.error("JWT Verification failed:", error);
      if (path.startsWith('/api/admin')) {
        const response = NextResponse.json({ error: "Invalid token" }, { status: 401 });
        response.cookies.delete('admin_token');
        return response;
      }
      const loginUrl = new URL('/admin/login', request.url);
      loginUrl.searchParams.set('callbackUrl', path);
      const response = NextResponse.redirect(loginUrl);
      response.cookies.delete('admin_token');
      return response;
    }
  }

  // User profile and checkout routes ko protect karte hain
  if (path.startsWith('/profile') || path.startsWith('/checkout')) {
    const token = request.cookies.get('user_token')?.value;

    if (!token) {
      const loginUrl = new URL('/login', request.url);
      loginUrl.searchParams.set('callbackUrl', path);
      return NextResponse.redirect(loginUrl);
    }

    try {
      const secret = new TextEncoder().encode(JWT_SECRET);
      const { payload } = await jwtVerify(token, secret);
      
      const requestHeaders = new Headers(request.headers);
      requestHeaders.set('x-user-id', payload.sub as string);
      requestHeaders.set('x-user-role', 'User');

      return NextResponse.next({
        request: {
          headers: requestHeaders,
        },
      });
    } catch (error) {
      console.error("User JWT Verification failed:", error);
      const loginUrl = new URL('/login', request.url);
      loginUrl.searchParams.set('callbackUrl', path);
      const response = NextResponse.redirect(loginUrl);
      response.cookies.delete('user_token');
      return response;
    }
  }

  // Baki saare public routes aise hi pass hone do
  return NextResponse.next();
}

// Ensure middleware sirf specific paths pe chale for performance
export const config = {
  matcher: [
    '/admin/:path*',
    '/api/admin/:path*',
    '/profile/:path*',
    '/checkout/:path*',
  ],
};
