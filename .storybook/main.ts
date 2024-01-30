import type { StorybookConfig } from "@storybook/nextjs";

const config: StorybookConfig = {
	stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
	addons: [
		"@storybook/addon-links",
		"@storybook/addon-essentials",
		"@storybook/addon-onboarding",
		"@storybook/addon-interactions",
	],
	staticDirs: [{ from: "", to: "../../../public" }],
	framework: {
		name: "@storybook/nextjs",
		options: {
			nextConfigPath: "./next.config.js",
		},
	},
	docs: {
		autodocs: "tag",
	},
};
export default config;
