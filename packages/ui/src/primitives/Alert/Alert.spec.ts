import { testComponent } from '@e2e/test-utils';

import { AlertDriver } from './Alert.driver';

testComponent({
	name: 'Alert',
	storyId: 'feedback-alert--default',
	cases: {
		status: ['success', 'error', 'warning', 'info'],
		radius: ['none', 'sm', 'md', 'lg', 'pill'],
		align: ['start', 'center', 'end'],
	},
	getTarget: (page) => new AlertDriver(page),
});
