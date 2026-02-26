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
};

export default preview;
