/** @type {import('next').NextConfig} */

const {
	StylableWebpackPlugin,
	applyWebpackConfigStylableExcludes,
} = require("@stylable/webpack-plugin");

const nextConfig = {
	reactStrictMode: true,
	future: {
		webpack5: true,
	},
	webpack: (config) => {
		/* exclude Stylable files from all other loaders */
		applyWebpackConfigStylableExcludes(config);

		/* add the Stylable plugin to the webpack configuration */
		config.plugins.push(
			new StylableWebpackPlugin({
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
};

module.exports = nextConfig;
