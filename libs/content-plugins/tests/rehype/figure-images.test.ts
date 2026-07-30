import { describe, expect, it } from 'vitest';

import { rehypeFigureImages } from '../../src/rehype/figure-images';
import { remarkFigures } from '../../src/remark/figures';
import { applyPlugins, findElements } from '../test-helpers';

describe('rehypeFigureImages', () => {
	it('converts markdown image syntax inside <figure> to <img>', async () => {
		const md = '<figure>![alt text](/photo.jpg)</figure>';
		const hast = await applyPlugins(md, {
			rehypePlugins: [[rehypeFigureImages]],
		});
		const imgs = findElements(hast, 'img');
		expect(imgs).toHaveLength(1);
		expect(imgs[0].properties?.src).toBe('/photo.jpg');
		expect(imgs[0].properties?.alt).toBe('alt text');
	});

	it('handles multiple images inside a figure', async () => {
		const md = '<figure>![one](/a.jpg) ![two](/b.jpg)</figure>';
		const hast = await applyPlugins(md, {
			rehypePlugins: [[rehypeFigureImages]],
		});
		const imgs = findElements(hast, 'img');
		expect(imgs).toHaveLength(2);
	});

	it('leaves non-figure content untouched', async () => {
		const md = '<div>![not in figure](/photo.jpg)</div>';
		const hast = await applyPlugins(md, {
			rehypePlugins: [[rehypeFigureImages]],
		});
		// The image syntax should remain as text, not converted to <img>
		const imgs = findElements(hast, 'img');
		expect(imgs).toHaveLength(0);
	});

	it('preserves text surrounding images inside figure', async () => {
		const md = '<figure>Before ![img](/a.jpg) After</figure>';
		const hast = await applyPlugins(md, {
			rehypePlugins: [[rehypeFigureImages]],
		});
		const imgs = findElements(hast, 'img');
		expect(imgs).toHaveLength(1);
	});

	it('preserves existing non-text children in figure', async () => {
		const md = '<figure><figcaption>Caption</figcaption></figure>';
		const hast = await applyPlugins(md, {
			rehypePlugins: [[rehypeFigureImages]],
		});
		const captions = findElements(hast, 'figcaption');
		expect(captions).toHaveLength(1);
	});

	it('works with figures produced by remarkFigures', async () => {
		const md = '![A caption](/image.png)';
		const hast = await applyPlugins(md, {
			remarkPlugins: [[remarkFigures]],
			rehypePlugins: [[rehypeFigureImages]],
		});
		const figures = findElements(hast, 'figure');
		expect(figures).toHaveLength(1);
		const imgs = findElements(hast, 'img');
		expect(imgs.length).toBeGreaterThanOrEqual(1);
	});
});
