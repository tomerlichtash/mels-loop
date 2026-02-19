'use client';

import { LOCALE_COOKIE } from './config';

export function setLocaleCookie(locale: string) {
	document.cookie = `${LOCALE_COOKIE}=${locale}; path=/; max-age=31536000; samesite=lax`;
}
