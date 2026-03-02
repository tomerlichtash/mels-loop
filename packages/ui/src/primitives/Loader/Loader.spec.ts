import { testComponent } from '@e2e/test-utils';

testComponent({
	storyId: 'feedback-loader--default',
	cases: {
		variant: ['spinner', 'dots', 'pulse'],
		size: ['xs', 'sm', 'md', 'lg', 'xl'],
		color: ['primary', 'secondary', 'surface'],
	},
	getTarget: (page) => ({ page }),
});
