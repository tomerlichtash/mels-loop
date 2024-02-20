import React from 'react';
import type { Preview } from '@storybook/react';
import '!style-loader!css-loader!sass-loader!./../src/styles/app.scss';

const preview: Preview = {
	decorators: [
		(Story) => {
			return (
				<div data-ml-theme="light" data-locale="en">
					<Story />
				</div>
			);
		},
	],
	parameters: {
		router: {
			basePath: '/',
		},
	},
};

export default preview;
