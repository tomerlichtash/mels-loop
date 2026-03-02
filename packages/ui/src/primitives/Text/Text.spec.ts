import { testComponent } from '@e2e/test-utils';

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
		italic: [true, false],
		uppercase: [true, false],
		capitalize: [true, false],
		truncate: [true, false],
		lineClamp: [2],
		fullWidth: [true, false],
	},
	getTarget: (page) => ({ page }),
});
