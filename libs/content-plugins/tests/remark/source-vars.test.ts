import type { ResolvedSource } from '@mels-loop/content-loaders/types';
import { describe, expect, it } from 'vitest';

import {
	interpolateSourceVars,
	remarkSourceVars,
} from '../../src/remark/source-vars';
import { applyPlugins, findElements, textContent } from '../test-helpers';

const sources: Record<string, ResolvedSource> = {
	'mel-photo': {
		id: 'mel-photo',
		type: 'image',
		url: 'https://example.com/mel.jpg',
		title: 'Mel Kaye at work',
		author: 'Joe Haldeman',
		license: 'fair-use',
	},
};

describe('remarkSourceVars', () => {
	it('replaces {{sources/id:field}} in text nodes', async () => {
		const md = 'Photo by {{sources/mel-photo:author}}.';
		const hast = await applyPlugins(md, {
			remarkPlugins: [[remarkSourceVars, { sources }]],
		});
		const text = textContent(hast);
		expect(text).toContain('Photo by Joe Haldeman.');
	});

	it('replaces {{source/id:field}} (singular) in text nodes', async () => {
		const md = 'Title: {{source/mel-photo:title}}.';
		const hast = await applyPlugins(md, {
			remarkPlugins: [[remarkSourceVars, { sources }]],
		});
		const text = textContent(hast);
		expect(text).toContain('Title: Mel Kaye at work.');
	});

	it('replaces variables in html nodes', async () => {
		const md = '<figure>{{sources/mel-photo:url}}</figure>';
		const hast = await applyPlugins(md, {
			remarkPlugins: [[remarkSourceVars, { sources }]],
		});
		const text = textContent(hast);
		expect(text).toContain('https://example.com/mel.jpg');
	});

	it('returns empty string for unknown source id', async () => {
		const md = 'Value: {{sources/unknown:title}}.';
		const hast = await applyPlugins(md, {
			remarkPlugins: [[remarkSourceVars, { sources }]],
		});
		const text = textContent(hast);
		expect(text).toContain('Value: .');
	});

	it('returns empty string for non-string field value', async () => {
		const md = 'Tags: {{sources/mel-photo:tags}}.';
		const hast = await applyPlugins(md, {
			remarkPlugins: [[remarkSourceVars, { sources }]],
		});
		const text = textContent(hast);
		// tags is string[] not string, so should resolve to empty
		expect(text).toContain('Tags: .');
	});

	it('handles text node without any template expressions', async () => {
		const md = 'No templates here.';
		const hast = await applyPlugins(md, {
			remarkPlugins: [[remarkSourceVars, { sources }]],
		});
		const text = textContent(hast);
		expect(text).toContain('No templates here.');
	});

	/*
	 * A figure's caption is authored as the image's alt text, which is a
	 * property of the image node rather than a text node — so visiting text
	 * alone left the raw expression to be copied into the figcaption.
	 */
	it('replaces variables in an image alt and title', async () => {
		const md =
			'![{{sources/mel-photo:title}}](/i.png "{{sources/mel-photo:author}}")';
		const hast = await applyPlugins(md, {
			remarkPlugins: [[remarkSourceVars, { sources }]],
		});
		const img = findElements(hast, 'img')[0];
		expect(img.properties?.['alt']).toBe('Mel Kaye at work');
		expect(img.properties?.['title']).toBe('Joe Haldeman');
	});

	/*
	 * VAR_RE carries /g, and `test` advances lastIndex on a match. Guarding each
	 * call with it meant the next string was searched from wherever the last one
	 * stopped, so expressions were skipped depending on what preceded them.
	 */
	it('expands every expression regardless of how many preceded it', () => {
		const line = 'By {{sources/mel-photo:author}}';
		for (let i = 0; i < 5; i++) {
			expect(interpolateSourceVars(line, sources)).toBe('By Joe Haldeman');
		}
	});

	it('is a no-op when sources map is empty', async () => {
		const md = 'Keep {{sources/mel-photo:title}} as is.';
		const hast = await applyPlugins(md, {
			remarkPlugins: [[remarkSourceVars, { sources: {} }]],
		});
		const text = textContent(hast);
		expect(text).toContain('{{sources/mel-photo:title}}');
	});
});
