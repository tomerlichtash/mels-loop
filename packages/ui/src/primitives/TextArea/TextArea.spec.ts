import { testComponent } from '@e2e/test-utils';

import { TextAreaDriver } from './TextArea.driver';

testComponent({
	name: 'TextArea',
	storyId: 'input-textarea--default',
	cases: {
		size: ['sm', 'md', 'lg'],
		radius: ['none', 'sm', 'md', 'lg'],
		error: [true, false],
		disabled: [true, false],
		fullWidth: [true, false],
		readOnly: [true, false],
	},
	getTarget: (page) => new TextAreaDriver(page),
	interactions: {
		hover: (field) => field.locator.hover({ force: true }),
		focus: (field) => field.focus(),
	},
});
