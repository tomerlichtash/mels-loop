import { describe, expect, it } from 'vitest';

import { remarkStripComments } from '../../src/remark/strip-comments';
import { applyPlugins, textContent } from '../test-helpers';

describe('remarkStripComments', () => {
	it('removes HTML comments', async () => {
		const md = '<!-- this is a comment -->\n\nHello world';
		const hast = await applyPlugins(md, {
			remarkPlugins: [[remarkStripComments]],
		});
		const text = textContent(hast);
		expect(text).not.toContain('this is a comment');
		expect(text).toContain('Hello world');
	});

	it('removes multi-line HTML comments', async () => {
		const md = '<!--\nmulti\nline\n-->\n\nKeep this';
		const hast = await applyPlugins(md, {
			remarkPlugins: [[remarkStripComments]],
		});
		const text = textContent(hast);
		expect(text).not.toContain('multi');
		expect(text).toContain('Keep this');
	});

	it('removes triple-slash editorial comments', async () => {
		const md = '/// editorial note\n\nVisible text';
		const hast = await applyPlugins(md, {
			remarkPlugins: [[remarkStripComments]],
		});
		const text = textContent(hast);
		expect(text).not.toContain('editorial note');
		expect(text).toContain('Visible text');
	});

	it('preserves non-comment content', async () => {
		const md = 'First paragraph\n\nSecond paragraph';
		const hast = await applyPlugins(md, {
			remarkPlugins: [[remarkStripComments]],
		});
		const text = textContent(hast);
		expect(text).toContain('First paragraph');
		expect(text).toContain('Second paragraph');
	});
});
