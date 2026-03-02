import { loadStory, testComponent } from '@e2e/test-utils';
import { expect, test } from '@playwright/test';

import { FigureDriver } from './Figure.driver';

const STORY_ID = 'content-figure--default';

testComponent({
	name: 'Figure',
	storyId: STORY_ID,
	extra: (theme, textDirection) => {
		test('default', async ({ page }) => {
			await loadStory(page, STORY_ID, theme, { textDirection });
			const figure = new FigureDriver(page);
			await expect(figure.locator).toBeVisible();
			await expect(figure.caption).toHaveText(
				'Fig. 1. A sample figure with caption',
			);
			await expect(figure.image).toBeVisible();
			await expect(figure.locator).toHaveScreenshot();
		});
	},
});
