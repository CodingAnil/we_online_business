import { NextResponse } from 'next/server';
import { auth } from '@/lib/auth.config';

export default auth((req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;
  const userRole = req.auth?.user?.role;

  const isAdminRoute = nextUrl.pathname.startsWith('/admin');
  const isDashboardRoute = nextUrl.pathname.startsWith('/dashboard');
  const isAuthRoute = nextUrl.pathname.startsWith('/login') || nextUrl.pathname.startsWith('/register');

  // If accessing auth routes (login/register) and already logged in, redirect
  if (isAuthRoute) {
    if (isLoggedIn) {
      if (userRole === 'admin') {
        return NextResponse.redirect(new URL('/admin', nextUrl));
      }
      return NextResponse.redirect(new URL('/dashboard', nextUrl));
    }
    return NextResponse.next();
  }

  // If accessing admin route and not logged in or not admin, redirect
  if (isAdminRoute) {
    if (!isLoggedIn) {
      const callbackUrl = nextUrl.pathname + nextUrl.search;
      return NextResponse.redirect(
        new URL(`/login?callbackUrl=${encodeURIComponent(callbackUrl)}`, nextUrl)
      );
    }
    if (userRole !== 'admin') {
      return NextResponse.redirect(new URL('/', nextUrl));
    }
    return NextResponse.next();
  }

  // If accessing dashboard route and not logged in, redirect
  if (isDashboardRoute) {
    if (!isLoggedIn) {
      const callbackUrl = nextUrl.pathname + nextUrl.search;
      return NextResponse.redirect(
        new URL(`/login?callbackUrl=${encodeURIComponent(callbackUrl)}`, nextUrl)
      );
    }
    return NextResponse.next();
  }

  return NextResponse.next();
});

export const config = {
  matcher: ['/admin/:path*', '/dashboard/:path*', '/login', '/register'],
};
