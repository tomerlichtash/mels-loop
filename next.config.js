const path = require('path');
const nextTranslate = require('next-translate-plugin');
const legacyRedirects = require('./legacy.json');
const { withAxiom } = require('next-axiom');

/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	optimizeFonts: true,
	sassOptions: {
		includePaths: [path.join(__dirname, 'styles')],
	},
	publicRuntimeConfig: {
		basePath: process.env.BASE_PATH || '/public/',
	},
	serverRuntimeConfig: {
		PROJECT_ROOT: __dirname,
	},
	experimental: {
		serverActions: true,
	},
	async redirects() {
		return legacyRedirects;
	},
};

module.exports = withAxiom(nextTranslate(nextConfig));
