const {
	StylableWebpackPlugin,
	applyWebpackConfigStylableExcludes,
} = require("@stylable/webpack-plugin");

module.exports = {
	stories: ["../src/**/*.stories.mdx", "../src/**/*.stories.@(js|jsx|ts|tsx)"],
	addons: ["storybook-addon-next-router"],
	framework: "@storybook/react",
	core: {
		builder: "webpack5",
	},
	webpackFinal: (config) => {
		/* find all css loaders and add exclude .st.css files from them */
		applyWebpackConfigStylableExcludes(config);

		/* inject StylableWebpackPlugin */
		config.plugins.push(new StylableWebpackPlugin());
		return config;
	},
};
