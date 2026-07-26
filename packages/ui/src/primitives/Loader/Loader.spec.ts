import { testComponent } from '@e2e/test-utils';

import { LoaderDriver } from './Loader.driver';

testComponent({
	storyId: 'feedback-loader--default',
	cases: {
		variant: ['spinner', 'dots', 'pulse'],
		size: ['xs', 'sm', 'md', 'lg', 'xl'],
		color: ['primary', 'secondary', 'surface'],
	},
	getTarget: (page) => new LoaderDriver(page),
});
