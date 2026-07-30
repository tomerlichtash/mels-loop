import './fonts.css';
import '../src/styles/globals.css';

import type { Preview } from '@storybook/react';
import React from 'react';

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
		direction: {
			description: 'Text direction',
			toolbar: {
				title: 'Direction',
				icon: 'transfer',
				items: [
					{ value: 'ltr', title: 'LTR' },
					{ value: 'rtl', title: 'RTL' },
				],
				dynamicTitle: true,
			},
		},
	},
	initialGlobals: {
		colorScheme: 'light',
		direction: 'ltr',
	},
	decorators: [
		(Story, context) => {
			const colorScheme = context.globals.colorScheme || 'light';
			const direction = context.globals.direction || 'ltr';
			React.useEffect(() => {
				document.documentElement.dataset.colorScheme = colorScheme;
				document.documentElement.dir = direction;
			}, [colorScheme, direction]);
			return Story();
		},
	],
};

export default preview;
