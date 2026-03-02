import { loadStory, testComponent } from '@e2e/test-utils';
import { expect, test } from '@playwright/test';

const STORY_ID = 'layout-container--default';

const directions = ['column', 'row'];
const aligns = ['start', 'center', 'end'];
const justifies = ['start', 'center', 'end', 'between', 'evenly'];

type Combo = { name: string; args: Record<string, string | number | boolean> };

const combinations: Combo[] = [
	...directions.flatMap((direction) =>
		aligns.flatMap((align) =>
			justifies.map((justify) => ({
				name: `${direction} + ${align} + ${justify}`,
				args: { direction, align, justify, gap: 'md' },
			})),
		),
	),
	...justifies.map((justify) => ({
		name: `row + wrap + ${justify}`,
		args: {
			direction: 'row',
			wrap: true,
			justify,
			gap: 'sm',
			items: 8,
		} as Combo['args'],
	})),
	...directions.map((direction) => ({
		name: `${direction} + padding`,
		args: {
			direction,
			paddingHorizontal: 'lg',
			paddingVertical: 'md',
			gap: 'sm',
		},
	})),
];

testComponent({
	storyId: STORY_ID,
	cases: {
		paddingHorizontal: ['none', 'xs', 'sm', 'md', 'lg', 'xl'],
		paddingVertical: ['none', 'xs', 'sm', 'md', 'lg', 'xl'],
		direction: ['column', 'row'],
		gap: ['none', 'xs', 'sm', 'md', 'lg', 'xl'],
		align: ['start', 'center', 'end'],
		justify: ['start', 'center', 'end', 'between', 'evenly'],
		wrap: [true, false],
		shadow: ['none', 'xs', 'sm', 'md', 'lg'],
	},
	getTarget: (page) => ({ page }),
	extra: (theme, textDirection) => {
		test.describe('combinations', () => {
			for (const { name, args } of combinations) {
				test(name, async ({ page }) => {
					await loadStory(page, STORY_ID, theme, {
						args,
						textDirection,
					});
					await expect(page).toHaveScreenshot();
				});
			}
		});
	},
});
