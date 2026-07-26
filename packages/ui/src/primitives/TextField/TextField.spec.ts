import { testComponent } from '@e2e/test-utils';

import { TextFieldDriver } from './TextField.driver';

testComponent({
	storyId: 'input-textfield--default',
	cases: {
		size: ['sm', 'md', 'lg'],
		radius: ['none', 'sm', 'md', 'lg'],
		error: [true],
		disabled: [true],
		fullWidth: [true],
		readOnly: [true],
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
