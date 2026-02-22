import { resolve } from 'path';
import type { StorybookConfig } from '@storybook/react-vite';

const config: StorybookConfig = {
	stories: ['../src/**/*.stories.@(ts|tsx)'],
	addons: ['@storybook/addon-essentials'],
	framework: {
		name: '@storybook/react-vite',
		options: {},
	},
	viteFinal: async (config) => {
		const { default: postcssGlobalData } =
			await import('@csstools/postcss-global-data');
		const { default: postcssCustomMedia } =
			await import('postcss-custom-media');

		config.css ??= {};
		config.css.postcss = {
			plugins: [
				postcssGlobalData({
					files: [resolve(__dirname, '../src/styles/tokens/media.css')],
				}),
				postcssCustomMedia(),
			],
		};
		return config;
	},
};

export default config;
