import React, { useState } from 'react';
import type { Preview } from '@storybook/react';
// import { mockPagePropsContentData } from './mocks/mockPageProps';
import '!style-loader!css-loader!sass-loader!./../src/styles/app.scss';

const mockDocumentPath = 'docs/the-story-of-mel/codex/index.en.md';

// const mockNextRouter = {
// 	pathname: '/',
// 	route: '/',
// 	query: {},
// 	asPath: '/',
// 	components: {
// 		'/': {
// 			initial: true,
// 			props: {
// 				pageProps: {
// 					content: JSON.stringify(mockPagePropsContentData),
// 					documentPath: mockDocumentPath,
// 				},
// 			},
// 		},
// 		'/_app': {
// 			styleSheets: [],
// 		},
// 	},
// 	isFallback: false,
// 	basePath: '',
// 	locale: 'en',
// 	locales: ['en', 'he'],
// 	defaultLocale: 'en',
// 	isReady: true,
// 	isPreview: false,
// 	isLocaleDomain: false,
// 	events: {},
// 	push: (...args) => {
// 		console.log('route pushed in story', args);
// 	},
// };

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
