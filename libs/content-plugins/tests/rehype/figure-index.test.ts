import { describe, expect, it } from 'vitest';

import { rehypeFigureIndex } from '../../src/rehype/figure-index';
import { remarkFigures } from '../../src/remark/figures';
import { applyPlugins, findElements, textContent } from '../test-helpers';

describe('rehypeFigureIndex', () => {
	it('assigns sequential data-figure-index to figures', async () => {
		const md = '![first](/a.png)\n\n![second](/b.png)';
		const hast = await applyPlugins(md, {
			remarkPlugins: [[remarkFigures]],
			rehypePlugins: [[rehypeFigureIndex]],
		});
		const figures = findElements(hast, 'figure');
		expect(figures).toHaveLength(2);
		expect(figures[0].properties?.['dataFigureIndex']).toBe('1');
		expect(figures[1].properties?.['dataFigureIndex']).toBe('2');
	});

	it('respects baseIndex option', async () => {
		const md = '![fig](/a.png)';
		const hast = await applyPlugins(md, {
			remarkPlugins: [[remarkFigures]],
			rehypePlugins: [[rehypeFigureIndex, { baseIndex: 5 }]],
		});
		const figures = findElements(hast, 'figure');
		expect(figures[0].properties?.['dataFigureIndex']).toBe('6');
	});

	it('auto-generates figcaption with template when auto=true', async () => {
		const md = '![](/a.png)';
		const hast = await applyPlugins(md, {
			remarkPlugins: [[remarkFigures]],
			rehypePlugins: [[rehypeFigureIndex, { auto: true }]],
		});
		const captions = findElements(hast, 'figcaption');
		expect(captions).toHaveLength(1);
		expect(textContent(captions[0])).toBe('Fig. 1');
	});

	it('prepends template to existing caption when auto=true', async () => {
		const md = '![My caption](/a.png)';
		const hast = await applyPlugins(md, {
			remarkPlugins: [[remarkFigures]],
			rehypePlugins: [[rehypeFigureIndex, { auto: true }]],
		});
		const captions = findElements(hast, 'figcaption');
		expect(captions).toHaveLength(1);
		expect(textContent(captions[0])).toContain('Fig. 1');
		expect(textContent(captions[0])).toContain('My caption');
	});

	it('uses custom template', async () => {
		const md = '![](/a.png)';
		const hast = await applyPlugins(md, {
			remarkPlugins: [[remarkFigures]],
			rehypePlugins: [
				[rehypeFigureIndex, { auto: true, template: 'Figure %index%' }],
			],
		});
		const captions = findElements(hast, 'figcaption');
		expect(textContent(captions[0])).toBe('Figure 1');
	});

	it('does not add caption when auto=false (default)', async () => {
		const md = '![](/a.png)';
		const hast = await applyPlugins(md, {
			remarkPlugins: [[remarkFigures]],
			rehypePlugins: [[rehypeFigureIndex]],
		});
		const captions = findElements(hast, 'figcaption');
		expect(captions).toHaveLength(0);
	});

	it('resolves manual %index% in existing figcaption text', async () => {
		const md =
			'<figure><img src="/a.png" alt="" /><figcaption>See figure %index%</figcaption></figure>';
		const hast = await applyPlugins(md, {
			rehypePlugins: [[rehypeFigureIndex]],
		});
		const captions = findElements(hast, 'figcaption');
		expect(captions).toHaveLength(1);
		expect(textContent(captions[0])).toBe('See figure 1');
	});

	it('skips figures with data-figure-index=none', async () => {
		const md =
			'<figure data-figure-index="none"><img src="/a.png" alt="" /></figure>\n\n![counted](/b.png)';
		const hast = await applyPlugins(md, {
			remarkPlugins: [[remarkFigures]],
			rehypePlugins: [[rehypeFigureIndex]],
		});
		const figures = findElements(hast, 'figure');
		const indexed = figures.filter(
			(f) =>
				f.properties?.['dataFigureIndex'] &&
				f.properties?.['dataFigureIndex'] !== 'none',
		);
		expect(indexed).toHaveLength(1);
		expect(indexed[0].properties?.['dataFigureIndex']).toBe('1');
	});
});
