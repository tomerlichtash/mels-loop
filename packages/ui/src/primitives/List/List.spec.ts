import { testComponent } from '@e2e/test-utils';

import { ListDriver } from './List.driver';

testComponent({
	storyId: 'content-list--default',
	cases: {
		ordered: [true, false],
	},
	getTarget: (page) => new ListDriver(page),
});
