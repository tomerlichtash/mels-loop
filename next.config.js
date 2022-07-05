/** @type {import('next').NextConfig} */

const {
	StylableWebpackPlugin,
	applyWebpackConfigStylableExcludes,
} = require("@stylable/webpack-plugin");

const StylableOptimizer = require("@stylable/optimizer");
const stylableOptimizer = new StylableOptimizer();

const nextConfig = {
	reactStrictMode: true,
	optimizeFonts: true,
	future: {
		webpack5: true,
	},
	webpack: (config) => {
		config.module.rules.push({
			test: /\.svg$/,
			use: ["@svgr/webpack"],
		});

		/* exclude Stylable files from all other loaders */
		applyWebpackConfigStylableExcludes(config);

		/* add the Stylable plugin to the webpack configuration */
		config.plugins.push(
			new StylableWebpackPlugin({
				optimizer: stylableOptimizer,
				// optimize: {
				// 	shortNamespaces: false,
				// 	classNameOptimizations: false,
				// },
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
	images: {
		domains: ["res.cloudinary.com"],
	},
	serverRuntimeConfig: {
		PROJECT_ROOT: __dirname,
	},
};

module.exports = nextConfig;
