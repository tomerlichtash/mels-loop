import type { ResolvedSource } from '@mels-loop/content-loaders/types';
import { describe, expect, it } from 'vitest';

import { rehypeFigureImages } from '../../src/rehype/figure-images';
import { rehypeSourceImages } from '../../src/rehype/source-images';
import { applyPlugins, findElements } from '../test-helpers';

const sources: Record<string, ResolvedSource> = {
	'mel-photo': {
		id: 'mel-photo',
		type: 'image',
		url: 'https://cdn.example.com/mel.jpg',
		title: 'Mel Kaye photo',
		author: 'Joe Haldeman',
		credit: 'MIT Archives',
		license: 'fair-use',
	},
};

describe('rehypeSourceImages', () => {
	it('resolves sources/id in img src to the actual URL', async () => {
		const md = '<figure>![photo](sources/mel-photo)</figure>';
		const hast = await applyPlugins(md, {
			rehypePlugins: [[rehypeFigureImages], [rehypeSourceImages, { sources }]],
		});
		const imgs = findElements(hast, 'img');
		expect(imgs).toHaveLength(1);
		expect(imgs[0].properties?.src).toBe('https://cdn.example.com/mel.jpg');
	});

	it('adds source metadata as data-* attributes', async () => {
		const md = '<figure>![photo](sources/mel-photo)</figure>';
		const hast = await applyPlugins(md, {
			rehypePlugins: [[rehypeFigureImages], [rehypeSourceImages, { sources }]],
		});
		const imgs = findElements(hast, 'img');
		expect(imgs[0].properties?.['data-source-id']).toBe('mel-photo');
		expect(imgs[0].properties?.['data-source-author']).toBe('Joe Haldeman');
		expect(imgs[0].properties?.['data-source-credit']).toBe('MIT Archives');
		expect(imgs[0].properties?.['data-source-license']).toBe('fair-use');
	});

	it('handles singular source/ prefix', async () => {
		const md = '<figure>![photo](source/mel-photo)</figure>';
		const hast = await applyPlugins(md, {
			rehypePlugins: [[rehypeFigureImages], [rehypeSourceImages, { sources }]],
		});
		const imgs = findElements(hast, 'img');
		expect(imgs).toHaveLength(1);
		expect(imgs[0].properties?.src).toBe('https://cdn.example.com/mel.jpg');
	});

	it('ignores images with non-source src', async () => {
		const md = '<figure>![photo](/regular-image.jpg)</figure>';
		const hast = await applyPlugins(md, {
			rehypePlugins: [[rehypeFigureImages], [rehypeSourceImages, { sources }]],
		});
		const imgs = findElements(hast, 'img');
		expect(imgs).toHaveLength(1);
		expect(imgs[0].properties?.src).toBe('/regular-image.jpg');
	});

	it('omits data-* attributes when source has no optional fields', async () => {
		const minimalSources: Record<string, ResolvedSource> = {
			'bare-source': {
				id: 'bare-source',
				type: 'link',
				url: 'https://example.com',
				title: 'Bare',
			},
		};
		const md = '<figure>![photo](sources/bare-source)</figure>';
		const hast = await applyPlugins(md, {
			rehypePlugins: [
				[rehypeFigureImages],
				[rehypeSourceImages, { sources: minimalSources }],
			],
		});
		const imgs = findElements(hast, 'img');
		expect(imgs[0].properties?.src).toBe('https://example.com');
		expect(imgs[0].properties?.['data-source-id']).toBe('bare-source');
		expect(imgs[0].properties?.['data-source-author']).toBeUndefined();
		expect(imgs[0].properties?.['data-source-credit']).toBeUndefined();
		expect(imgs[0].properties?.['data-source-license']).toBeUndefined();
	});

	it('skips source images with unknown source id', async () => {
		const md = '<figure>![photo](sources/unknown-id)</figure>';
		const hast = await applyPlugins(md, {
			rehypePlugins: [[rehypeFigureImages], [rehypeSourceImages, { sources }]],
		});
		const imgs = findElements(hast, 'img');
		expect(imgs).toHaveLength(1);
		expect(imgs[0].properties?.src).toBe('sources/unknown-id');
	});

	it('is a no-op when sources map is empty', async () => {
		const md = '<figure>![photo](sources/mel-photo)</figure>';
		const hast = await applyPlugins(md, {
			rehypePlugins: [
				[rehypeFigureImages],
				[rehypeSourceImages, { sources: {} }],
			],
		});
		const imgs = findElements(hast, 'img');
		expect(imgs).toHaveLength(1);
		expect(imgs[0].properties?.src).toBe('sources/mel-photo');
	});
});
