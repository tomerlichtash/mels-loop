import { testComponent } from '@e2e/test-utils';

import { ButtonDriver } from './Button.driver';

testComponent({
	storyId: 'action-button--default',
	cases: {
		size: ['xs', 'sm', 'md', 'lg', 'xl'],
		variant: ['contained', 'outlined', 'text'],
		radius: ['none', 'sm', 'md', 'lg', 'pill'],
		loading: [true, false],
		disabled: [true, false],
		fullWidth: [true, false],
		asChild: [true, false],
	},
	getTarget: (page) => new ButtonDriver(page),
	interactions: {
		hover: (button) => button.hover(),
		active: async (button) => {
			await button.locator.dispatchEvent('mousedown');
		},
	},
});
