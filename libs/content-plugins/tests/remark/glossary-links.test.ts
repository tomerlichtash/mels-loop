import { describe, expect, it } from 'vitest';

import { remarkGlossaryLinks } from '../../src/remark/glossary-links';
import { applyPlugins, findElements } from '../test-helpers';

describe('remarkGlossaryLinks', () => {
	it('adds glossary data attributes to glossary/ links', async () => {
		const md = 'Read about [drum memory](glossary/drum-memory) here.';
		const hast = await applyPlugins(md, {
			remarkPlugins: [[remarkGlossaryLinks]],
		});
		const links = findElements(hast, 'a');
		const glossaryLink = links.find(
			(el) => el.properties?.['dataLinkType'] === 'glossary',
		);
		expect(glossaryLink).toBeDefined();
		expect(glossaryLink!.properties?.['dataLinkTarget']).toBe('drum-memory');
	});

	it('ignores non-glossary links', async () => {
		const md = 'Visit [example](https://example.com).';
		const hast = await applyPlugins(md, {
			remarkPlugins: [[remarkGlossaryLinks]],
		});
		const links = findElements(hast, 'a');
		expect(links.every((el) => !el.properties?.['dataLinkType'])).toBe(true);
	});

	it('handles case-insensitive prefix', async () => {
		const md = '[term](Glossary/some-term)';
		const hast = await applyPlugins(md, {
			remarkPlugins: [[remarkGlossaryLinks]],
		});
		const links = findElements(hast, 'a');
		const glossaryLink = links.find(
			(el) => el.properties?.['dataLinkType'] === 'glossary',
		);
		expect(glossaryLink).toBeDefined();
		expect(glossaryLink!.properties?.['dataLinkTarget']).toBe('some-term');
	});
});
