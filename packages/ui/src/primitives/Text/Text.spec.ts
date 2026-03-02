import { testComponent } from '@e2e/test-utils';

import { TextDriver } from './Text.driver';

const STORY_ID = 'content-text--default';

testComponent({
	storyId: STORY_ID,
	cases: {
		variant: [
			'h1',
			'h2',
			'h3',
			'h4',
			'subtitle1',
			'subtitle2',
			'body1',
			'body2',
			'caption',
			'label',
		],
		color: [
			'primary',
			'secondary',
			'success',
			'error',
			'warning',
			'info',
			'muted',
		],
		weight: [400, 500, 600, 700],
		align: ['start', 'center', 'end'],
		italic: [true],
		uppercase: [true],
		capitalize: [true],
		truncate: [true],
		lineClamp: [2],
	},
	getTarget: (page) => new TextDriver(page),
});
