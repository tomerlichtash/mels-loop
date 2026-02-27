import './fonts.css';
import '../src/styles/globals.css';

import type { Preview } from '@storybook/react';

const preview: Preview = {
	tags: ['!autodocs'],
	parameters: {
		controls: {
			expanded: true,
			matchers: {
				color: /(background|color)$/i,
				date: /Date$/i,
			},
		},
	},
	globalTypes: {
		colorScheme: {
			description: 'Color scheme',
			toolbar: {
				title: 'Theme',
				icon: 'mirror',
				items: [
					{ value: 'light', title: 'Light', icon: 'sun' },
					{ value: 'dark', title: 'Dark', icon: 'moon' },
				],
				dynamicTitle: true,
			},
		},
	},
	initialGlobals: {
		colorScheme: 'light',
	},
	decorators: [
		(Story, context) => {
			const colorScheme = context.globals.colorScheme || 'light';
			document.documentElement.dataset.colorScheme = colorScheme;
			return Story();
		},
	],
};

export default preview;
