import {
	getDefaultLocale,
	getLocaleCookieName,
	getLocales,
	isValidLocale,
} from './config';

export interface LocaleRequest {
	pathname: string;
	cookies: Record<string, string | undefined>;
	acceptLanguage?: string;
}

export type LocaleResult =
	| { action: 'skip' }
	| { action: 'redirect'; path: string; locale: string }
	| { action: 'rewrite'; path: string; locale: string; setCookie: boolean };

/**
 * Framework-agnostic locale resolution.
 * Returns a result describing what the framework adapter should do.
 */
export function resolveLocale(request: LocaleRequest): LocaleResult {
	const { pathname } = request;
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
		return { action: 'skip' };
	}

	// Check if the pathname has a locale prefix
	const matchedLocale = locales.find(
		(locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`,
	);

	if (matchedLocale) {
		// Locale-prefixed URL: redirect to clean URL and set cookie
		const cleanPath = pathname.replace(`/${matchedLocale}`, '') || '/';
		return { action: 'redirect', path: cleanPath, locale: matchedLocale };
	}

	// Clean URL: read locale from cookie or detect from headers
	let locale = request.cookies[cookieName];

	if (!locale || !isValidLocale(locale)) {
		const acceptLanguage = request.acceptLanguage ?? '';
		locale = locales.find((l) => acceptLanguage.includes(l)) ?? defaultLocale;
	}

	// Rewrite to the locale-prefixed path internally
	const setCookie = !request.cookies[cookieName];
	return {
		action: 'rewrite',
		path: `/${locale}${pathname}`,
		locale,
		setCookie,
	};
}

export const localeMatcherConfig = {
	matcher: ['/((?!_next|api|favicon|.*\\..*).*)'],
};
