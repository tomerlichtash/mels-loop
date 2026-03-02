import { testComponent } from '@e2e/test-utils';

import { TextFieldDriver } from './TextField.driver';

testComponent({
	name: 'TextField',
	storyId: 'input-textfield--default',
	cases: {
		size: ['sm', 'md', 'lg'],
		radius: ['none', 'sm', 'md', 'lg'],
		error: [true, false],
		disabled: [true, false],
		fullWidth: [true, false],
		readOnly: [true, false],
	},
	getTarget: (page) => new TextFieldDriver(page),
	interactions: {
		hover: {
			run: (field) => field.locator.hover({ force: true }),
		},
		focus: {
			run: (field) => field.focus(),
			skip: (prop, value) => prop === 'disabled' && value === true,
		},
	},
});
