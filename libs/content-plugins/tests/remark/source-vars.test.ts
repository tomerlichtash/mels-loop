import type { ResolvedSource } from '@mels-loop/content-loaders/types';
import { describe, expect, it } from 'vitest';

import { remarkSourceVars } from '../../src/remark/source-vars';
import { applyPlugins, textContent } from '../test-helpers';

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

	it('is a no-op when sources map is empty', async () => {
		const md = 'Keep {{sources/mel-photo:title}} as is.';
		const hast = await applyPlugins(md, {
			remarkPlugins: [[remarkSourceVars, { sources: {} }]],
		});
		const text = textContent(hast);
		expect(text).toContain('{{sources/mel-photo:title}}');
	});
});
