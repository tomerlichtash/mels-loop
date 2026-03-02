import { testComponent } from '@e2e/test-utils';

testComponent({
	name: 'Container',
	storyId: 'layout-container--default',
	cases: {
		paddingHorizontal: ['none', 'xs', 'sm', 'md', 'lg', 'xl'],
		paddingVertical: ['none', 'xs', 'sm', 'md', 'lg', 'xl'],
		direction: ['column', 'row'],
		gap: ['none', 'xs', 'sm', 'md', 'lg', 'xl'],
		align: ['start', 'center', 'end'],
		justify: ['start', 'center', 'end', 'between', 'evenly'],
		wrap: [true, false],
		shadow: ['none', 'xs', 'sm', 'md', 'lg'],
	},
	getTarget: (page) => ({ page }),
});
