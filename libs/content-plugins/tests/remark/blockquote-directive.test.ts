import remarkDirective from 'remark-directive';
import { describe, expect, it } from 'vitest';

import { remarkBlockquoteDirective } from '../../src/remark/blockquote-directive';
import { applyPlugins, findElements, textContent } from '../test-helpers';

describe('remarkBlockquoteDirective', () => {
	it('converts :::blockquote to <blockquote>', async () => {
		const md = ':::blockquote\nSome quoted text\n:::';
		const hast = await applyPlugins(md, {
			remarkPlugins: [[remarkDirective], [remarkBlockquoteDirective]],
		});
		const bqs = findElements(hast, 'blockquote');
		expect(bqs).toHaveLength(1);
		expect(bqs[0].properties?.['dataType']).toBe('quote');
	});

	it('adds data-parse-mode=verse when verse attribute is present', async () => {
		const md = ':::blockquote{verse}\nVerse line one\nVerse line two\n:::';
		const hast = await applyPlugins(md, {
			remarkPlugins: [[remarkDirective], [remarkBlockquoteDirective]],
		});
		const bqs = findElements(hast, 'blockquote');
		expect(bqs).toHaveLength(1);
		expect(bqs[0].properties?.['dataParseMode']).toBe('verse');
	});

	it('converts ::cite to <cite>', async () => {
		const md = ':::blockquote\nSome text\n::cite[Lines 1-5]\n:::';
		const hast = await applyPlugins(md, {
			remarkPlugins: [[remarkDirective], [remarkBlockquoteDirective]],
		});
		const cites = findElements(hast, 'cite');
		expect(cites).toHaveLength(1);
		expect(textContent(cites[0])).toBe('Lines 1-5');
	});

	it('converts newlines to <br> in verse mode', async () => {
		const md = ':::blockquote{verse}\nline one\nline two\n:::';
		const hast = await applyPlugins(md, {
			remarkPlugins: [[remarkDirective], [remarkBlockquoteDirective]],
		});
		const brs = findElements(hast, 'br');
		expect(brs.length).toBeGreaterThanOrEqual(1);
	});

	it('preserves non-text children in verse mode', async () => {
		const md = ':::blockquote{verse}\ntext with **bold** here\n:::';
		const hast = await applyPlugins(md, {
			remarkPlugins: [[remarkDirective], [remarkBlockquoteDirective]],
		});
		const strongs = findElements(hast, 'strong');
		expect(strongs).toHaveLength(1);
	});

	it('handles verse mode with non-paragraph children like cite', async () => {
		const md =
			':::blockquote{verse}\nVerse line one\nVerse line two\n::cite[Source]\n:::';
		const hast = await applyPlugins(md, {
			remarkPlugins: [[remarkDirective], [remarkBlockquoteDirective]],
		});
		const cites = findElements(hast, 'cite');
		expect(cites).toHaveLength(1);
		expect(textContent(cites[0])).toBe('Source');
		const brs = findElements(hast, 'br');
		expect(brs.length).toBeGreaterThanOrEqual(1);
	});

	it('ignores non-blockquote directives', async () => {
		const md = ':::cols\nNot a blockquote\n:::';
		const hast = await applyPlugins(md, {
			remarkPlugins: [[remarkDirective], [remarkBlockquoteDirective]],
		});
		const bqs = findElements(hast, 'blockquote');
		expect(bqs).toHaveLength(0);
	});
});
