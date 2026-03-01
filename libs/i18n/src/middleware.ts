import { NextRequest, NextResponse } from 'next/server';

import {
	getDefaultLocale,
	getLocaleCookieName,
	getLocales,
	isValidLocale,
} from './config';

export function createLocaleMiddleware() {
	return function middleware(request: NextRequest) {
		const { pathname } = request.nextUrl;
		const locales = getLocales();
		const defaultLocale = getDefaultLocale();
		const cookieName = getLocaleCookieName();

		// Skip non-page requests (API, _next, favicon, files with dots)
		if (
			pathname.startsWith('/api/') ||
			pathname.startsWith('/_next/') ||
			pathname.startsWith('/favicon') ||
			pathname.includes('.')
		) {
			return NextResponse.next();
		}

		// Check if the pathname has a locale prefix
		const matchedLocale = locales.find(
			(locale) =>
				pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`,
		);

		if (matchedLocale) {
			// Locale-prefixed URL: set cookie and redirect to clean URL
			const cleanPath = pathname.replace(`/${matchedLocale}`, '') || '/';
			const url = request.nextUrl.clone();
			url.pathname = cleanPath;

			const response = NextResponse.redirect(url, 302);
			response.cookies.set(cookieName, matchedLocale, {
				path: '/',
				maxAge: 31536000,
				sameSite: 'lax',
				httpOnly: false,
			});
			return response;
		}

		// Clean URL: read locale from cookie or detect from headers
		let locale = request.cookies.get(cookieName)?.value;

		if (!locale || !isValidLocale(locale)) {
			const acceptLanguage = request.headers.get('accept-language') || '';
			locale = locales.find((l) => acceptLanguage.includes(l)) ?? defaultLocale;
		}

		// Rewrite to the locale-prefixed path internally
		const url = request.nextUrl.clone();
		url.pathname = `/${locale}${pathname}`;

		const response = NextResponse.rewrite(url);

		// Set cookie for first visit (when no cookie was present)
		if (!request.cookies.get(cookieName)?.value) {
			response.cookies.set(cookieName, locale, {
				path: '/',
				maxAge: 31536000,
				sameSite: 'lax',
				httpOnly: false,
			});
		}

		return response;
	};
}

export const localeMatcherConfig = {
	matcher: ['/((?!_next|api|favicon|.*\\..*).*)'],
};
