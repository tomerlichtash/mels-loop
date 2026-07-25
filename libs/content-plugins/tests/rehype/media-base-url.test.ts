import { describe, expect, it } from 'vitest';

import { rehypeMediaBaseUrl } from '../../src/rehype/media-base-url';
import { applyPlugins, findElements } from '../test-helpers';

const BASE = 'https://mels-loop-media.s3.eu-north-1.amazonaws.com/';

describe('rehypeMediaBaseUrl', () => {
	it('rewrites img[src] starting with /media/', async () => {
		const hast = await applyPlugins('![a photo](/media/images/mel.jpg)', {
			rehypePlugins: [[rehypeMediaBaseUrl, { baseUrl: BASE }]],
		});
		const [img] = findElements(hast, 'img');
		expect(img.properties?.src).toBe(`${BASE}images/mel.jpg`);
	});

	it('rewrites a[href] starting with /media/', async () => {
		const hast = await applyPlugins('[the paper](/media/documents/paper.pdf)', {
			rehypePlugins: [[rehypeMediaBaseUrl, { baseUrl: BASE }]],
		});
		const [anchor] = findElements(hast, 'a');
		expect(anchor.properties?.href).toBe(`${BASE}documents/paper.pdf`);
	});

	it('rewrites source[src] starting with /media/', async () => {
		const md = '<picture><source src="/media/images/mel.webp" /></picture>';
		const hast = await applyPlugins(md, {
			rehypePlugins: [[rehypeMediaBaseUrl, { baseUrl: BASE }]],
		});
		const [source] = findElements(hast, 'source');
		expect(source.properties?.src).toBe(`${BASE}images/mel.webp`);
	});

	it('leaves URLs that do not start with /media/ untouched', async () => {
		const md =
			'![external](https://example.com/photo.jpg)\n\n[local](/about)\n\n![asset](/assets/logo.svg)';
		const hast = await applyPlugins(md, {
			rehypePlugins: [[rehypeMediaBaseUrl, { baseUrl: BASE }]],
		});
		const srcs = findElements(hast, 'img').map((n) => n.properties?.src);
		expect(srcs).toEqual(['https://example.com/photo.jpg', '/assets/logo.svg']);
		const [anchor] = findElements(hast, 'a');
		expect(anchor.properties?.href).toBe('/about');
	});

	it('leaves paths relative when baseUrl is empty', async () => {
		const hast = await applyPlugins('![a photo](/media/images/mel.jpg)', {
			rehypePlugins: [[rehypeMediaBaseUrl, { baseUrl: '' }]],
		});
		const [img] = findElements(hast, 'img');
		expect(img.properties?.src).toBe('/media/images/mel.jpg');
	});

	it('ignores elements that carry no matching attribute', async () => {
		const hast = await applyPlugins('# A heading\n\nSome prose.', {
			rehypePlugins: [[rehypeMediaBaseUrl, { baseUrl: BASE }]],
		});
		expect(findElements(hast, 'img')).toHaveLength(0);
		expect(findElements(hast, 'h1')).toHaveLength(1);
	});
});
