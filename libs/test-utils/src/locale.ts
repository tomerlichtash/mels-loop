export const locales = ['en', 'he'] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = 'en';

/**
 * Build a locale-prefixed path.
 * All routes have a locale prefix (middleware redirects bare paths).
 */
export function getLocalePath(locale: Locale, path = ''): string {
	const normalizedPath = path.startsWith('/') ? path : `/${path}`;
	return `/${locale}${normalizedPath}`;
}
