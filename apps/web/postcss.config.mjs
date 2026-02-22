import { join } from 'path';
import postcssGlobalData from '@csstools/postcss-global-data';
import postcssCustomMedia from 'postcss-custom-media';

/** @type {import('postcss').Config} */
const config = {
	plugins: [
		postcssGlobalData({
			files: [
				join(process.cwd(), '../../packages/ui/src/styles/tokens/media.css'),
			],
		}),
		postcssCustomMedia(),
	],
};

export default config;
