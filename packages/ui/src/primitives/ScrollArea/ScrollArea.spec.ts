import { testComponent } from '@e2e/test-utils';

import { ScrollAreaDriver } from './ScrollArea.driver';

testComponent({
	storyId: 'content-scrollarea--default',
	cases: {
		type: ['auto', 'always'],
		orientation: ['vertical', 'horizontal'],
	},
	getTarget: (page) => new ScrollAreaDriver(page),
});
