export const locales = ['en', 'he'] as const;
export const LOCALE_COOKIE = 'NEXT_LOCALE';
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = 'en';

export function isValidLocale(value: string): value is Locale {
	return locales.includes(value as Locale);
}

export function getDirection(locale: Locale): 'ltr' | 'rtl' {
	return locale === 'he' ? 'rtl' : 'ltr';
}

export function getFontFamily(locale: Locale): string {
	return locale === 'he' ? 'var(--font-assistant)' : 'var(--font-roboto-slab)';
}
