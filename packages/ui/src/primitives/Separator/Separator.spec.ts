import { testComponent } from '@e2e/test-utils';

import { SeparatorDriver } from './Separator.driver';

testComponent({
	name: 'Separator',
	storyId: 'layout-separator--default',
	cases: {
		orientation: ['horizontal', 'vertical'],
	},
	getTarget: (page) => new SeparatorDriver(page),
});
