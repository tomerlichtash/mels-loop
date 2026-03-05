import { loadStory, testComponent } from '@e2e/test-utils';
import { expect, test } from '@playwright/test';

import { IndexMarkerDriver } from './IndexMarker.driver';

testComponent({
	storyId: 'data-display-indexmarker--default',
	cases: {
		index: [1, 5, 42],
		padLength: [1, 2, 3],
	},
	getTarget: (page) => new IndexMarkerDriver(page),
	extra: (theme, textDirection) => {
		test('in-context rendering', async ({ page }) => {
			await loadStory(page, 'data-display-indexmarker--in-context', theme, {
				textDirection,
			});
			await expect(page.locator('#storybook-root')).toHaveScreenshot();
		});
	},
});
