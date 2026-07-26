import { describe, expect, it } from 'vitest';

import { remarkFigures } from '../../src/remark/figures';
import { applyPlugins, findElements, textContent } from '../test-helpers';

describe('remarkFigures', () => {
	it('promotes a standalone image to a <figure>', async () => {
		const md = '![A caption](/image.png)';
		const hast = await applyPlugins(md, {
			remarkPlugins: [[remarkFigures]],
		});
		const figures = findElements(hast, 'figure');
		expect(figures).toHaveLength(1);
	});

	it('includes a <figcaption> when alt text is present', async () => {
		const md = '![My caption](/image.png)';
		const hast = await applyPlugins(md, {
			remarkPlugins: [[remarkFigures]],
		});
		const captions = findElements(hast, 'figcaption');
		expect(captions).toHaveLength(1);
		expect(textContent(captions[0])).toBe('My caption');
	});

	it('omits <figcaption> when alt text is empty', async () => {
		const md = '![](/image.png)';
		const hast = await applyPlugins(md, {
			remarkPlugins: [[remarkFigures]],
		});
		const captions = findElements(hast, 'figcaption');
		expect(captions).toHaveLength(0);
	});

	it('does not promote images inline with other content', async () => {
		const md = 'Some text ![img](/image.png) more text';
		const hast = await applyPlugins(md, {
			remarkPlugins: [[remarkFigures]],
		});
		const figures = findElements(hast, 'figure');
		expect(figures).toHaveLength(0);
	});

	it('parses dimension attributes from title', async () => {
		const md = '![caption](/image.png "width=300 max-width=500")';
		const hast = await applyPlugins(md, {
			remarkPlugins: [[remarkFigures]],
		});
		const figures = findElements(hast, 'figure');
		expect(figures).toHaveLength(1);
		const imgs = findElements(hast, 'img');
		expect(imgs.length).toBeGreaterThanOrEqual(1);
	});

	it('ignores invalid attribute keys in title', async () => {
		const md = '![caption](/image.png "invalid=300 color=red")';
		const hast = await applyPlugins(md, {
			remarkPlugins: [[remarkFigures]],
		});
		const figures = findElements(hast, 'figure');
		expect(figures).toHaveLength(1);
	});

	/*
	 * Hebrew writes gershayim as a double quote — ארה"ב — and uses it around
	 * nicknames where English uses inverted commas, so captions carrying one
	 * are ordinary prose here, not an edge case.
	 */
	it('keeps a caption intact when the alt text contains a double quote', async () => {
		const md =
			'![שמותיהם של מל והרמן קיי בבחירות לנשיאות ארה"ב, 1952](/image.png)';
		const hast = await applyPlugins(md, {
			remarkPlugins: [[remarkFigures]],
		});
		const imgs = findElements(hast, 'img');
		expect(imgs).toHaveLength(1);
		expect(imgs[0].properties?.['alt']).toBe(
			'שמותיהם של מל והרמן קיי בבחירות לנשיאות ארה"ב, 1952',
		);
		/* The words after the quote used to be parsed as attribute names. */
		expect(Object.keys(imgs[0].properties ?? {})).toEqual(['src', 'alt']);
		expect(textContent(findElements(hast, 'figcaption')[0])).toBe(
			'שמותיהם של מל והרמן קיי בבחירות לנשיאות ארה"ב, 1952',
		);
	});

	it('handles title with no equals sign', async () => {
		const md = '![caption](/image.png "just-a-string")';
		const hast = await applyPlugins(md, {
			remarkPlugins: [[remarkFigures]],
		});
		const figures = findElements(hast, 'figure');
		expect(figures).toHaveLength(1);
	});
});
