import { describe, expect, it } from 'vitest';

import { remarkSourceLinks } from '../../src/remark/source-links';
import { applyPlugins, findElements } from '../test-helpers';

describe('remarkSourceLinks', () => {
	it('adds source data attributes to sources/ links', async () => {
		const md = 'See [photo](sources/mel-kaye-photo-1952).';
		const hast = await applyPlugins(md, {
			remarkPlugins: [[remarkSourceLinks]],
		});
		const links = findElements(hast, 'a');
		const sourceLink = links.find(
			(el) => el.properties?.['dataLinkType'] === 'source',
		);
		expect(sourceLink).toBeDefined();
		expect(sourceLink!.properties?.['dataLinkTarget']).toBe(
			'mel-kaye-photo-1952',
		);
	});

	it('handles singular source/ prefix', async () => {
		const md = '[doc](source/some-doc)';
		const hast = await applyPlugins(md, {
			remarkPlugins: [[remarkSourceLinks]],
		});
		const links = findElements(hast, 'a');
		const sourceLink = links.find(
			(el) => el.properties?.['dataLinkType'] === 'source',
		);
		expect(sourceLink).toBeDefined();
		expect(sourceLink!.properties?.['dataLinkTarget']).toBe('some-doc');
	});

	it('ignores non-source links', async () => {
		const md = '[link](glossary/term)';
		const hast = await applyPlugins(md, {
			remarkPlugins: [[remarkSourceLinks]],
		});
		const links = findElements(hast, 'a');
		expect(
			links.every((el) => el.properties?.['dataLinkType'] !== 'source'),
		).toBe(true);
	});
});
