import { describe, expect, it } from 'vitest';

import { remarkAnnotationLinks } from '../../src/remark/annotation-links';
import { applyPlugins, findElements, textContent } from '../test-helpers';

describe('remarkAnnotationLinks', () => {
	it('adds annotation data attributes to annotation links', async () => {
		const md = 'About [Mel Kaye](annotations/mel-kaye-bio).';
		const hast = await applyPlugins(md, {
			remarkPlugins: [[remarkAnnotationLinks]],
		});
		const links = findElements(hast, 'a');
		const annoLink = links.find(
			(el) => el.properties?.['dataLinkType'] === 'annotation',
		);
		expect(annoLink).toBeDefined();
		expect(annoLink!.properties?.['dataLinkTarget']).toBe('mel-kaye-bio');
		expect(annoLink!.properties?.['dataSequence']).toBe('1');
	});

	it('replaces ^ text with padded sequence number', async () => {
		const md = 'Some text [^](annotations/note-1) and [^](annotations/note-2).';
		const hast = await applyPlugins(md, {
			remarkPlugins: [[remarkAnnotationLinks]],
		});
		const links = findElements(hast, 'a');
		const annoLinks = links.filter(
			(el) => el.properties?.['dataLinkType'] === 'annotation',
		);
		expect(annoLinks).toHaveLength(2);
		expect(textContent(annoLinks[0])).toBe('01');
		expect(textContent(annoLinks[1])).toBe('02');
		expect(annoLinks[0].properties?.['dataSequence']).toBe('1');
		expect(annoLinks[1].properties?.['dataSequence']).toBe('2');
	});

	it('ignores non-annotation links', async () => {
		const md = '[link](https://example.com)';
		const hast = await applyPlugins(md, {
			remarkPlugins: [[remarkAnnotationLinks]],
		});
		const links = findElements(hast, 'a');
		expect(links.every((el) => !el.properties?.['dataLinkType'])).toBe(true);
	});
});
