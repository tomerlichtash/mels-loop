import { loadStory, THEMES } from '@e2e/test-utils';
import { expect, test } from '@playwright/test';

import { LabelDriver } from './Label.driver';

const STORY_ID = 'primitives-label--default';

const cases = {
	required: [true],
};

for (const theme of THEMES) {
	test.describe(theme, () => {
		for (const [prop, values] of Object.entries(cases)) {
			test.describe(prop, () => {
				for (const value of values) {
					test(`${value}`, async ({ page }) => {
						await loadStory(page, STORY_ID, theme, {
							args: { [prop]: value },
						});
						const label = new LabelDriver(page);
						await expect(label.locator).toHaveScreenshot();
					});
				}
			});
		}
	});
}
