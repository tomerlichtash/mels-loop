/** @type {import('next').NextConfig} */

const { withAxiom } = require("next-axiom");

const {
	StylableWebpackPlugin,
	applyWebpackConfigStylableExcludes,
} = require("@stylable/webpack-plugin");

const StylableOptimizer = require("@stylable/optimizer").StylableOptimizer;
const stylableOptimizer = new StylableOptimizer();

const nextConfig = {
	reactStrictMode: true,
	optimizeFonts: true,
	webpack: (config, { webpack }) => {
		const mockEnv = {
			// mock public recaptcha site key
			// https://developers.google.com/recaptcha/docs/faq#id-like-to-run-automated-tests-with-recaptcha.-what-should-i-do
			NEXT_PUBLIC_RECAPTCHA_KEY: "6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI",
		};
		if (process.env.CI || process.env.ML_DEBUG) {
			config.plugins.push(
				new webpack.DefinePlugin({
					"process.env": JSON.stringify(mockEnv),
				})
			);
		}
		// config.module.rules.push({
		// 	test: /\.svg$/,
		// 	use: ["@svgr/webpack"],
		// });

		/* exclude Stylable files from all other loaders */
		applyWebpackConfigStylableExcludes(config);

		/* add the Stylable plugin to the webpack configuration */
		config.plugins.push(
			new StylableWebpackPlugin({
				optimizer: stylableOptimizer,
				/* let NextJS handle assets */
				filterAssets: () => false,
				/* output CSS to the correct location */
				filename: "static/css/stylable.[contenthash].css",
			})
		);
		return config;
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
