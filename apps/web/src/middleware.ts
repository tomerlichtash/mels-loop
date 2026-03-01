import './i18n-init';

import { getLocaleCookieName } from '@mels-loop/i18n/config';
import { resolveLocale } from '@mels-loop/i18n/middleware';
import { NextRequest, NextResponse } from 'next/server';

const COOKIE_OPTS = {
	path: '/',
	maxAge: 31536000,
	sameSite: 'lax' as const,
	httpOnly: false,
};

export function middleware(request: NextRequest) {
	const cookieName = getLocaleCookieName();
	const result = resolveLocale({
		pathname: request.nextUrl.pathname,
		cookies: { [cookieName]: request.cookies.get(cookieName)?.value },
		acceptLanguage: request.headers.get('accept-language') ?? undefined,
	});

	if (result.action === 'skip') {
		return NextResponse.next();
	}

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

export const config = {
	matcher: ['/((?!_next|api|favicon|.*\\..*).*)'],
};
