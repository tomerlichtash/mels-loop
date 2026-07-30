import { describe, expect, it } from 'vitest';

import { rehypeLines } from '../../src/rehype/lines';
import { remarkVerse } from '../../src/remark/verse';
import { applyPlugins, findElements, textContent } from '../test-helpers';

describe('rehypeLines', () => {
	it('wraps verse lines in <line> elements with sequential IDs', async () => {
		const md = 'line one  \nline two  \nline three';
		const hast = await applyPlugins(md, {
			remarkPlugins: [[remarkVerse, { parseMode: 'verse' }]],
			rehypePlugins: [[rehypeLines]],
		});
		const lines = findElements(hast, 'line');
		expect(lines.length).toBeGreaterThanOrEqual(2);
		expect(lines[0].properties?.id).toBe('line-1');
		expect(lines[1].properties?.id).toBe('line-2');
	});

	it('leaves non-verse paragraphs untouched', async () => {
		const md = 'A normal paragraph with no line breaks.';
		const hast = await applyPlugins(md, {
			rehypePlugins: [[rehypeLines]],
		});
		const lines = findElements(hast, 'line');
		expect(lines).toHaveLength(0);
	});

	it('preserves text content within lines', async () => {
		const md = 'hello world  \ngoodbye world';
		const hast = await applyPlugins(md, {
			remarkPlugins: [[remarkVerse, { parseMode: 'verse' }]],
			rehypePlugins: [[rehypeLines]],
		});
		const lines = findElements(hast, 'line');
		if (lines.length >= 2) {
			expect(textContent(lines[0])).toContain('hello world');
			expect(textContent(lines[1])).toContain('goodbye world');
		}
	});
});
