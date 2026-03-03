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

function checkBasicAuth(request: NextRequest): NextResponse | null {
	const password = process.env.SITE_PASSWORD;
	if (!password) return null;

	const auth = request.headers.get('authorization');
	if (auth) {
		const [, encoded] = auth.split(' ');
		const [, pwd] = atob(encoded).split(':');
		if (pwd === password) return null;
	}

	return new NextResponse('Authentication required', {
		status: 401,
		headers: { 'WWW-Authenticate': 'Basic realm="Protected"' },
	});
}

export function middleware(request: NextRequest) {
	const authResponse = checkBasicAuth(request);
	if (authResponse) return authResponse;

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
