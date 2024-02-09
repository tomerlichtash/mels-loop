import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import { withAxiom } from 'next-axiom';
import { default as legacyRedirects } from './legacy.json' assert { type: 'json' };

const __dirname = dirname(fileURLToPath(import.meta.url));

const nextConfig = {
	reactStrictMode: true,
	optimizeFonts: true,
	sassOptions: {
		includePaths: [path.join(__dirname, 'styles')],
	},
	i18n: {
		locales: ['en', 'he'],
		defaultLocale: 'en',
	},
	publicRuntimeConfig: {
		basePath: process.env.BASE_PATH || '/public/',
	},
	serverRuntimeConfig: {
		PROJECT_ROOT: __dirname,
	},
	async redirects() {
		return legacyRedirects;
	},
};

export default withAxiom(nextConfig);
