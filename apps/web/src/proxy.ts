import './i18n-init';

import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import { getLocaleCookieName } from '@mels-loop/i18n/config';
import { resolveLocale } from '@mels-loop/i18n/middleware';
import { type NextRequest, NextResponse } from 'next/server';

const clerkEnabled = !!process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;
const requireAuth = process.env.REQUIRE_AUTH === 'true';

const isAuthRoute = createRouteMatcher([
	'/auth/sign-in(.*)',
	'/auth/sign-up(.*)',
]);

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

export default clerkEnabled
	? clerkMiddleware(async (auth, request) => {
			if (isAuthRoute(request)) return;

			if (requireAuth) {
				await auth.protect();
			}

			return handleI18n(request) ?? NextResponse.next();
		})
	: (request: NextRequest) => handleI18n(request) ?? NextResponse.next();

export const config = {
	matcher: [
		'/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
	],
};
