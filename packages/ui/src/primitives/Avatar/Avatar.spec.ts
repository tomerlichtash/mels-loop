import { loadStory, testComponent } from '@e2e/test-utils';
import { expect, test } from '@playwright/test';

import { AvatarDriver } from './Avatar.driver';

testComponent({
	storyId: 'content-avatar--default',
	cases: {
		size: ['sm', 'md', 'lg', 'xl'],
	},
	getTarget: (page) => new AvatarDriver(page),
	extra: (theme, textDirection) => {
		test('fallback initials', async ({ page }) => {
			await loadStory(page, 'content-avatar--fallback', theme, {
				textDirection,
			});
			const avatar = new AvatarDriver(page);
			await expect(avatar.locator).toHaveScreenshot();
		});
	},
});
