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

	it('handles title with no equals sign', async () => {
		const md = '![caption](/image.png "just-a-string")';
		const hast = await applyPlugins(md, {
			remarkPlugins: [[remarkFigures]],
		});
		const figures = findElements(hast, 'figure');
		expect(figures).toHaveLength(1);
	});
});
