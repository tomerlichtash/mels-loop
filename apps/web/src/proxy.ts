import './i18n-init';

import { getLocaleCookieName } from '@mels-loop/i18n/config';
import { resolveLocale } from '@mels-loop/i18n/middleware';
import { type NextRequest, NextResponse } from 'next/server';

const COOKIE_OPTS = {
	path: '/',
	maxAge: 31536000,
	sameSite: 'lax' as const,
	httpOnly: false,
};

function handleI18n(request: NextRequest): NextResponse | null {
	const cookieName = getLocaleCookieName();
	const result = resolveLocale({
		pathname: request.nextUrl.pathname,
		cookies: { [cookieName]: request.cookies.get(cookieName)?.value },
		acceptLanguage: request.headers.get('accept-language') ?? undefined,
	});

	if (result.action === 'skip') return null;

	if (result.action === 'redirect') {
		const url = request.nextUrl.clone();
		url.pathname = result.path;
		const response = NextResponse.redirect(url, 302);
		response.cookies.set(cookieName, result.locale, COOKIE_OPTS);
		return response;
	}

	// rewrite
	const url = request.nextUrl.clone();
	url.pathname = result.path;
	const response = NextResponse.rewrite(url);
	if (result.setCookie) {
		response.cookies.set(cookieName, result.locale, COOKIE_OPTS);
	}
	return response;
}

/*
 * Locale resolution, and nothing else.
 *
 * This used to be wrapped in Clerk's middleware, gated on a publishable key
 * that was never set — so the wrapper resolved to the bare function below on
 * every request. The archive has nothing to sign in to.
 */
export default function proxy(request: NextRequest) {
	return handleI18n(request) ?? NextResponse.next();
}

export const config = {
	matcher: [
		'/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
	],
};
