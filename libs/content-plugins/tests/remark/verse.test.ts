import { describe, expect, it } from 'vitest';

import { remarkVerse } from '../../src/remark/verse';
import { applyPlugins, findElements } from '../test-helpers';

describe('remarkVerse', () => {
	it('converts newlines to <br> in verse mode', async () => {
		const md = 'line one\nline two\nline three';
		const hast = await applyPlugins(md, {
			remarkPlugins: [[remarkVerse, { parseMode: 'verse' }]],
		});
		const brs = findElements(hast, 'br');
		expect(brs.length).toBeGreaterThanOrEqual(2);
	});

	it('is a no-op when parseMode is not verse', async () => {
		const md = 'line one\nline two';
		const hast = await applyPlugins(md, {
			remarkPlugins: [[remarkVerse, { parseMode: 'normal' }]],
		});
		const brs = findElements(hast, 'br');
		expect(brs).toHaveLength(0);
	});

	it('is a no-op when no options provided', async () => {
		const md = 'line one\nline two';
		const hast = await applyPlugins(md, {
			remarkPlugins: [[remarkVerse]],
		});
		const brs = findElements(hast, 'br');
		expect(brs).toHaveLength(0);
	});

	it('preserves non-text children', async () => {
		const md = 'text with **bold** here\nnext line';
		const hast = await applyPlugins(md, {
			remarkPlugins: [[remarkVerse, { parseMode: 'verse' }]],
		});
		const strongs = findElements(hast, 'strong');
		expect(strongs).toHaveLength(1);
	});
});
