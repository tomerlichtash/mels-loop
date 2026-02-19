import { createLocaleMiddleware } from '@mels-loop/i18n/middleware';

export const middleware = createLocaleMiddleware();

export const config = {
	matcher: ['/((?!_next|api|favicon|.*\\..*).*)'],
};
