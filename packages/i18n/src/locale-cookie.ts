'use client';

const COOKIE_NAME = 'NEXT_LOCALE';

export function setLocaleCookie(locale: string) {
	document.cookie = `${COOKIE_NAME}=${locale}; path=/; max-age=31536000; samesite=lax`;
}
