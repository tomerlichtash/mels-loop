import { loadStory } from '@e2e/test-utils';
import { expect, test } from '@playwright/test';

import { TimelineNavDriver } from './TimelineNav.driver';

const STORY_ID = 'navigation-timelinenav--default';
const CLIP_PADDING = 20;

for (const theme of ['light', 'dark'] as const) {
	test.describe(theme, () => {
		for (const dir of ['ltr', 'rtl'] as const) {
			test.describe(dir, () => {
				test('default', async ({ page }) => {
					await loadStory(page, STORY_ID, theme, { textDirection: dir });
					const driver = new TimelineNavDriver(page);
					await expect(driver.locator).toBeVisible();
					await expect(page).toHaveScreenshot({
						clip: await driver.clip(CLIP_PADDING),
					});
				});

				test('has sections', async ({ page }) => {
					await loadStory(page, STORY_ID, theme, { textDirection: dir });
					const driver = new TimelineNavDriver(page);
					await expect(driver.sections).toHaveCount(4);
				});

				test('has active item', async ({ page }) => {
					await loadStory(page, STORY_ID, theme, { textDirection: dir });
					const driver = new TimelineNavDriver(page);
					await expect(driver.activeItems).toHaveCount(1);
				});

				test('has section headers', async ({ page }) => {
					await loadStory(page, STORY_ID, theme, { textDirection: dir });
					const driver = new TimelineNavDriver(page);
					await expect(driver.sectionHeaders).toHaveCount(3);
				});

				test('hover item', async ({ page }) => {
					await loadStory(page, STORY_ID, theme, { textDirection: dir });
					const driver = new TimelineNavDriver(page);
					const secondItem = driver.items.nth(1);
					await secondItem.hover();
					await expect(page).toHaveScreenshot({
						clip: await driver.clip(CLIP_PADDING),
					});
				});
			});
		}
	});
}
