import { NextResponse } from 'next/server';
import { NextRequestWithAuth } from 'next-auth/middleware';
import { i18n } from '@/app/../../i18n.config';
import { match as matchLocale } from '@formatjs/intl-localematcher';
import Negotiator from 'negotiator';

// Middleware for NextAuth
import nextAuthMiddleware from 'next-auth/middleware';

function getLocale(request: NextRequestWithAuth): string | undefined {
  const negotiatorHeaders: Record<string, string> = {}
  request.headers.forEach((value, key) => (negotiatorHeaders[key] = value))

  // @ts-ignore locales are readonly
  const locales: string[] = i18n.locales
  const languages = new Negotiator({ headers: negotiatorHeaders }).languages()

  const locale = matchLocale(languages, locales, i18n.defaultLocale)
  return locale
}

async function i18n_middleware(request: NextRequestWithAuth) {
  const pathname = request.nextUrl.pathname;
  const pathnameIsMissingLocale = i18n.locales.every(
    locale => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  );

  // Redirect if there is no locale
  if (pathnameIsMissingLocale) {
    const locale = getLocale(request);
    return NextResponse.redirect(
      new URL(
        `/${locale}${pathname.startsWith('/') ? '' : '/'}${pathname}`,
        request.url
      )
    );
  }
}

export async function middleware(request: NextRequestWithAuth) {
  // Check if the request is for an admin path with any locale
  const isAdminPath = i18n.locales.some(locale => request.nextUrl.pathname.startsWith(`/${locale}/admin`));
  
  if (isAdminPath) {
    return await nextAuthMiddleware(request);
  }

  // If not, apply the i18n middleware
  return await i18n_middleware(request);
}

export const config = {
  // Matcher handling all paths except specified ones
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)']
};