import { loadStory, testComponent } from '@e2e/test-utils';
import { expect, test } from '@playwright/test';

import { TooltipDriver } from './Tooltip.driver';

const STORY_ID = 'overlay-tooltip--default';
const TRIGGER_SELECTOR = 'ml-button';

const sides = ['top', 'right', 'bottom', 'left'];

testComponent({
	storyId: STORY_ID,
	extra: (theme, textDirection) => {
		test.describe('side', () => {
			for (const side of sides) {
				test(`${side}`, async ({ page }) => {
					await loadStory(page, STORY_ID, theme, {
						args: { side },
						textDirection,
					});
					const driver = new TooltipDriver(page, TRIGGER_SELECTOR);
					await driver.open();
					await expect(page).toHaveScreenshot();
				});
			}
		});

		test('long text', async ({ page }) => {
			await loadStory(page, STORY_ID, theme, {
				args: {
					label:
						'This is a tooltip with a much longer text to test how it handles wrapping behavior when the content exceeds the available width of the tooltip container',
				},
				textDirection,
			});
			const driver = new TooltipDriver(page, TRIGGER_SELECTOR);
			await driver.open();
			await expect(page).toHaveScreenshot();
		});

		test('delay before and after', async ({ page }) => {
			await loadStory(page, STORY_ID, theme, {
				args: { delayDuration: 500 },
				textDirection,
			});
			const driver = new TooltipDriver(page, TRIGGER_SELECTOR);
			await driver.locator.hover();
			await expect(page).toHaveScreenshot();
			await page.waitForTimeout(600);
			await expect(page).toHaveScreenshot();
		});
	},
});
