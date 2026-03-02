import { loadStory, testComponent } from '@e2e/test-utils';
import { expect, test } from '@playwright/test';

import { BreadcrumbsDriver } from './Breadcrumbs.driver';

const STORY_ID = 'navigation-breadcrumbs--default';

testComponent({
	storyId: STORY_ID,
	extra: (theme, textDirection) => {
		test('default', async ({ page }) => {
			await loadStory(page, STORY_ID, theme, { textDirection });
			const breadcrumbs = new BreadcrumbsDriver(page);
			await expect(breadcrumbs.locator).toHaveScreenshot();
		});

		test('renders breadcrumb trail', async ({ page }) => {
			await loadStory(page, STORY_ID, theme, { textDirection });
			const breadcrumbs = new BreadcrumbsDriver(page);
			await expect(breadcrumbs.locator).toBeVisible();
			await expect(breadcrumbs.items).toHaveCount(3);
		});

		test('last item is marked as current page', async ({ page }) => {
			await loadStory(page, STORY_ID, theme, { textDirection });
			const breadcrumbs = new BreadcrumbsDriver(page);
			await expect(breadcrumbs.currentItem).toHaveText('Chapter 1');
		});

		test('non-current items are links', async ({ page }) => {
			await loadStory(page, STORY_ID, theme, { textDirection });
			const breadcrumbs = new BreadcrumbsDriver(page);
			await expect(breadcrumbs.links).toHaveCount(2);
		});
	},
});
