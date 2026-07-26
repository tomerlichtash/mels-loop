import remarkDirective from 'remark-directive';
import { describe, expect, it } from 'vitest';

import { remarkSmallprintDirective } from '../../src/remark/smallprint-directive';
import { applyPlugins, findElements, textContent } from '../test-helpers';

describe('remarkSmallprintDirective', () => {
	it('marks a :::smallprint container as smallprint', async () => {
		const md = ':::smallprint\nPosted to Usenet, May 21, 1983:\n:::';
		const hast = await applyPlugins(md, {
			remarkPlugins: [[remarkDirective], [remarkSmallprintDirective]],
		});
		const marked = findElements(hast, 'div').filter(
			(el) => el.properties?.['dataType'] === 'smallprint',
		);
		expect(marked).toHaveLength(1);
		expect(textContent(marked[0])).toContain('Posted to Usenet');
	});

	it('leaves other container directives alone', async () => {
		const md = ':::somethingelse\nText\n:::';
		const hast = await applyPlugins(md, {
			remarkPlugins: [[remarkDirective], [remarkSmallprintDirective]],
		});
		const marked = findElements(hast, 'div').filter(
			(el) => el.properties?.['dataType'] === 'smallprint',
		);
		expect(marked).toHaveLength(0);
	});
});
