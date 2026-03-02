import { testComponent } from '@e2e/test-utils';

import { GridDriver } from './Grid.driver';

testComponent({
	name: 'Grid',
	storyId: 'layout-grid--default',
	cases: {
		columns: [1, 2, 3, 4, 5, 6],
		gap: ['xs', 'sm', 'md', 'lg', 'xl'],
		layout: ['grid', 'masonry'],
	},
	getTarget: (page) => new GridDriver(page),
});
