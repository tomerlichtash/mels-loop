const webpack = require("webpack");
const NodePolyfillPlugin = require("node-polyfill-webpack-plugin");
const { StylableWebpackPlugin } = require("@stylable/webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

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
			{
				test: /\.(jpe?g|png|gif|woff|woff2|eot|ttf|svg)(\?[a-z0-9=.]+)?$/,
				loader: "url-loader?limit=100000",
			},
		],
	},
	plugins: [
		new webpack.ContextReplacementPlugin(/mocha$/),
		new NodePolyfillPlugin(),
		new HtmlWebpackPlugin(),
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
