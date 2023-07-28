/** @type {import('next').NextConfig} */

const path = require("path");
const { withAxiom } = require("next-axiom");

const nextConfig = {
	reactStrictMode: true,
	optimizeFonts: true,
	sassOptions: {
		includePaths: [path.join(__dirname, "styles")],
		quietDeps: true,
	},
	i18n: {
		locales: ["en", "he"],
		defaultLocale: "en",
	},
	serverRuntimeConfig: {
		PROJECT_ROOT: __dirname,
	},
	async redirects() {
		return [
			{
				source: "/docs/preface",
				destination: "/docs/the-story-of-mel/pages/preface",
				permanent: true,
			},
			{
				source: "/docs/mels-hack-the-missing-bits",
				destination: "/docs/the-story-of-mel/pages/mels-hack-the-missing-bits",
				permanent: true,
			},
			{
				source: "/docs/resources",
				destination: "/docs/the-story-of-mel/pages/resources",
				permanent: true,
			},
			{
				source: "/docs/blackjack-writeup",
				destination: "/docs/the-story-of-mel/pages/blackjack-writeup",
				permanent: true,
			},
		];
	},
};

module.exports = withAxiom(nextConfig);
