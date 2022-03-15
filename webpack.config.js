const webpack = require("webpack");
const NodePolyfillPlugin = require("node-polyfill-webpack-plugin");
const { StylableWebpackPlugin } = require("@stylable/webpack-plugin");

module.exports = {
	mode: "development",
	devtool: "inline-source-map",
	resolve: {
		extensions: [".ts", ".tsx", ".js", ".json"],
		fallback: {
			path: require.resolve("path"),
		},
	},
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				exclude: /\.d\.ts$/,
				loader: "@ts-tools/webpack-loader",
				options: {
					configFilePath: require.resolve("./tsconfig.mocha.json"),
					compilerOptions: {
						target: "es5",
						downlevelIteration: true,
					},
				},
			},
		],
	},
	plugins: [
		new webpack.ContextReplacementPlugin(/mocha$/),
		new NodePolyfillPlugin(),
		new StylableWebpackPlugin({
			filename: "stylable.css",
			cssInjection: "js",
			runtimeStylesheetId: "module",
			diagnosticsMode: "auto",
			optimize: {
				removeUnusedComponents: true,
				removeStylableDirectives: true,
				removeComments: false,
				classNameOptimizations: false,
				shortNamespaces: false,
				removeEmptyNodes: false,
				minify: false,
			},
		}),
	],
};
