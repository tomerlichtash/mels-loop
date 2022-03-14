const { StylableWebpackPlugin } = require("@stylable/webpack-plugin");

module.exports = {
	// context: __dirname,
	mode: "development",
	devtool: false,
	entry: "./src/index.ts",
	resolve: {
		extensions: [".ts", ".tsx", ".js", ".json"],
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
		new StylableWebpackPlugin({
			// outputCSS: true,
			// includeCSSInJS: false,
			// bootstrap: {
			// 	autoInit: true,
			// },
			// optimize: {
			// 	removeUnusedComponents: true,
			// 	removeComments: true,
			// 	removeStylableDirectives: true,
			// 	classNameOptimizations: false,
			// 	shortNamespaces: false,
			// },
		}),
	],
	// externals: {
	// 	react: {
	// 		commonjs: "react",
	// 		commonjs2: "react",
	// 		amd: "react",
	// 		root: "React",
	// 	},
	// 	"react-dom": {
	// 		commonjs: "react-dom",
	// 		commonjs2: "react-dom",
	// 		amd: "react-dom",
	// 		root: "ReactDOM",
	// 	},
	// },
};
