import remarkDirective from 'remark-directive';
import { describe, expect, it } from 'vitest';

import { remarkFigureDirective } from '../../src/remark/figure-directive';
import { applyPlugins, findElements } from '../test-helpers';

describe('remarkFigureDirective', () => {
	it('converts :::figure to a <figure> element', async () => {
		const md = ':::figure\n```\npreformatted content\n```\n:::';
		const hast = await applyPlugins(md, {
			remarkPlugins: [[remarkDirective], [remarkFigureDirective]],
		});
		const figures = findElements(hast, 'figure');
		expect(figures).toHaveLength(1);
	});

	it('preserves child content inside the figure', async () => {
		const md = ':::figure\nSome paragraph inside\n:::';
		const hast = await applyPlugins(md, {
			remarkPlugins: [[remarkDirective], [remarkFigureDirective]],
		});
		const figures = findElements(hast, 'figure');
		expect(figures).toHaveLength(1);
		const ps = findElements(figures[0], 'p');
		expect(ps.length).toBeGreaterThanOrEqual(1);
	});

	it('ignores non-figure directives', async () => {
		const md = ':::blockquote\nNot a figure\n:::';
		const hast = await applyPlugins(md, {
			remarkPlugins: [[remarkDirective], [remarkFigureDirective]],
		});
		const figures = findElements(hast, 'figure');
		expect(figures).toHaveLength(0);
	});
});
