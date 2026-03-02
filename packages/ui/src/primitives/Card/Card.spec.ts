import { loadStory, testComponent } from '@e2e/test-utils';
import { expect, test } from '@playwright/test';

import { CardDriver } from './Card.driver';

const STORY_ID = 'layout-card--default';
const CLIP_PADDING = 20;

const combinations: {
	name: string;
	args: Record<string, string | number | boolean>;
}[] = [
	{
		name: 'interactive + selected',
		args: { interactive: true, selected: true },
	},
	{
		name: 'interactive + disabled',
		args: { interactive: true, disabled: true },
	},
	{
		name: 'interactive + selected + disabled',
		args: { interactive: true, selected: true, disabled: true },
	},
	{ name: 'href + disabled', args: { href: '#', disabled: true } },
	{
		name: 'inset + interactive',
		args: { variant: 'inset', interactive: true },
	},
	{
		name: 'horizontal + withActions',
		args: { orientation: 'horizontal', withActions: true },
	},
];

testComponent({
	storyId: STORY_ID,
	cases: {
		variant: ['outlined', 'inset'],
		radius: ['none', 'sm', 'md', 'lg'],
		padding: ['none', 'sm', 'md', 'lg'],
		shadow: ['none', 'xs', 'sm', 'md', 'lg'],
		fullWidth: [true, false],
		interactive: [true, false],
		selected: [true, false],
		disabled: [true, false],
		orientation: ['horizontal'],
		headerText: ['Card Title'],
		bodyText: ['Card body content'],
		footerText: ['Footer actions'],
		withActions: [true, false],
		mediaSrc: ['', 'https://dummyimage.com/400x200/cccccc/999999&text=Test'],
		mediaOverlayText: ['Overlay text'],
		loading: [true, false],
		href: ['#'],
	},
	getTarget: (page) => new CardDriver(page),
	clipPadding: CLIP_PADDING,
	extra: (theme, textDirection) => {
		test.describe('interactive', () => {
			test('hover', async ({ page }) => {
				await loadStory(page, STORY_ID, theme, {
					args: { interactive: true },
					textDirection,
				});
				const card = new CardDriver(page);
				await card.locator.hover();
				await expect(page).toHaveScreenshot({
					clip: await card.clip(CLIP_PADDING),
				});
			});

			test('active', async ({ page }) => {
				await loadStory(page, STORY_ID, theme, {
					args: { interactive: true },
					textDirection,
				});
				const card = new CardDriver(page);
				await card.locator.dispatchEvent('mousedown');
				await expect(page).toHaveScreenshot({
					clip: await card.clip(CLIP_PADDING),
				});
			});
		});

		test.describe('combinations', () => {
			for (const { name, args } of combinations) {
				test(name, async ({ page }) => {
					await loadStory(page, STORY_ID, theme, { args, textDirection });
					const card = new CardDriver(page);
					await expect(page).toHaveScreenshot({
						clip: await card.clip(CLIP_PADDING),
					});
				});
			}
		});

		test('grid', async ({ page }) => {
			await loadStory(page, 'layout-card--grid', theme, { textDirection });
			await expect(page).toHaveScreenshot();
		});

		test('masonry', async ({ page }) => {
			await loadStory(page, 'layout-card--masonry', theme, { textDirection });
			await expect(page).toHaveScreenshot();
		});
	},
});
