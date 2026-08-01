import { describe, expect, it } from 'vitest';

import { remarkEntityLinks } from '../../src/remark/entity-links';
import { applyPlugins, findElements } from '../test-helpers';

describe('remarkEntityLinks', () => {
	it('adds entity data attributes to entity: links', async () => {
		const md = 'because that was his name.[^](entity:mel-kaye)';
		const hast = await applyPlugins(md, {
			remarkPlugins: [[remarkEntityLinks]],
		});
		const links = findElements(hast, 'a');
		const entityLink = links.find(
			(el) => el.properties?.['dataLinkType'] === 'entity',
		);
		expect(entityLink).toBeDefined();
		expect(entityLink!.properties?.['dataLinkTarget']).toBe('mel-kaye');
	});

	it('leaves other links alone', async () => {
		const md = '[a note](annotations/some-note) and [a page](/about)';
		const hast = await applyPlugins(md, {
			remarkPlugins: [[remarkEntityLinks]],
		});
		const tagged = findElements(hast, 'a').filter(
			(el) => el.properties?.['dataLinkType'] === 'entity',
		);
		expect(tagged).toHaveLength(0);
	});
});
