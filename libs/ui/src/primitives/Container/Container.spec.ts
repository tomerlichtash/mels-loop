import { loadStory, THEMES } from '@e2e/test-utils';
import { expect, test } from '@playwright/test';

const STORY_ID = 'layout-container--default';

const cases = {
	paddingHorizontal: ['none', 'xs', 'sm', 'md', 'lg', 'xl'],
	paddingVertical: ['none', 'xs', 'sm', 'md', 'lg', 'xl'],
	direction: ['column', 'row'],
	gap: ['none', 'xs', 'sm', 'md', 'lg', 'xl'],
	align: ['start', 'center', 'end'],
	justify: ['start', 'center', 'end', 'between', 'evenly'],
	wrap: [true],
	shadow: ['none', 'xs', 'sm', 'md', 'lg'],
};

const directions = ['column', 'row'] as const;
const aligns = ['start', 'center', 'end'] as const;
const justifies = ['start', 'center', 'end', 'between', 'evenly'] as const;

type Combo = { name: string; args: Record<string, string | number | boolean> };

const combinations: Combo[] = [
	// direction × align × justify cross-product
	...directions.flatMap((direction) =>
		aligns.flatMap((align) =>
			justifies.map((justify) => ({
				name: `${direction} + ${align} + ${justify}`,
				args: { direction, align, justify, gap: 'md' },
			})),
		),
	),
	// wrap × justify (row only)
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
	// direction × padding
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

for (const theme of THEMES) {
	test.describe(theme, () => {
		for (const [prop, values] of Object.entries(cases)) {
			test.describe(prop, () => {
				for (const value of values) {
					test(`${value}`, async ({ page }) => {
						await loadStory(page, STORY_ID, theme, {
							args: { [prop]: value, showBorder: true },
						});
						await expect(page).toHaveScreenshot();
					});
				}
			});
		}

		test.describe('combinations', () => {
			for (const { name, args } of combinations) {
				test(name, async ({ page }) => {
					await loadStory(page, STORY_ID, theme, {
						args: { ...args, showBorder: true },
					});
					await expect(page).toHaveScreenshot();
				});
			}
		});
	});
}
