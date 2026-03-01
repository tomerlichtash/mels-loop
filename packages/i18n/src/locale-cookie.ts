'use client';

import { getLocaleCookieName } from './config';

export function setLocaleCookie(locale: string) {
	const cookieName = getLocaleCookieName();
	document.cookie = `${cookieName}=${locale}; path=/; max-age=31536000; samesite=lax`;
}
