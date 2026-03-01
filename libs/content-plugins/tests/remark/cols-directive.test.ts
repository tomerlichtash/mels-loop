import remarkDirective from 'remark-directive';
import { describe, expect, it } from 'vitest';

import { remarkColsDirective } from '../../src/remark/cols-directive';
import { applyPlugins, findElements } from '../test-helpers';

describe('remarkColsDirective', () => {
	it('converts :::cols to a div with data-layout=cols', async () => {
		const md =
			'::::cols\n:::col\nColumn one\n:::\n:::col\nColumn two\n:::\n::::';
		const hast = await applyPlugins(md, {
			remarkPlugins: [[remarkDirective], [remarkColsDirective]],
		});
		const divs = findElements(hast, 'div');
		const colsDiv = divs.find((d) => d.properties?.['dataLayout'] === 'cols');
		expect(colsDiv).toBeDefined();
	});

	it('applies ratio attribute', async () => {
		const md =
			'::::cols{ratio=1-2}\n:::col\nLeft\n:::\n:::col\nRight\n:::\n::::';
		const hast = await applyPlugins(md, {
			remarkPlugins: [[remarkDirective], [remarkColsDirective]],
		});
		const divs = findElements(hast, 'div');
		const colsDiv = divs.find((d) => d.properties?.['dataLayout'] === 'cols');
		expect(colsDiv).toBeDefined();
		expect(colsDiv!.properties?.['dataColsRatio']).toBe('1-2');
	});

	it('rejects invalid ratio values', async () => {
		const md =
			'::::cols{ratio=5-5}\n:::col\nLeft\n:::\n:::col\nRight\n:::\n::::';
		const hast = await applyPlugins(md, {
			remarkPlugins: [[remarkDirective], [remarkColsDirective]],
		});
		const divs = findElements(hast, 'div');
		const colsDiv = divs.find((d) => d.properties?.['dataLayout'] === 'cols');
		expect(colsDiv).toBeDefined();
		// Invalid ratio falls back to auto (no data-cols-ratio attribute)
		expect(colsDiv!.properties?.['dataColsRatio']).toBeUndefined();
	});

	it('wraps :::col children as plain divs', async () => {
		const md = '::::cols\n:::col\nContent\n:::\n:::col\nMore\n:::\n::::';
		const hast = await applyPlugins(md, {
			remarkPlugins: [[remarkDirective], [remarkColsDirective]],
		});
		const divs = findElements(hast, 'div');
		// Should have the outer cols div + at least 2 inner col divs
		expect(divs.length).toBeGreaterThanOrEqual(3);
	});

	it('auto-splits leading html nodes into column 1, rest into column 2', async () => {
		const md =
			':::cols\n<figure><img src="/a.jpg" alt="" /></figure>\n\nParagraph text\n:::';
		const hast = await applyPlugins(md, {
			remarkPlugins: [[remarkDirective], [remarkColsDirective]],
		});
		const divs = findElements(hast, 'div');
		const colsDiv = divs.find((d) => d.properties?.['dataLayout'] === 'cols');
		expect(colsDiv).toBeDefined();
		// Should have 2 child divs (auto-generated columns)
		const childDivs = findElements(colsDiv!, 'div');
		expect(childDivs.length).toBeGreaterThanOrEqual(2);
	});

	it('does not auto-split when no leading html nodes', async () => {
		const md = ':::cols\nJust a paragraph\n:::';
		const hast = await applyPlugins(md, {
			remarkPlugins: [[remarkDirective], [remarkColsDirective]],
		});
		const divs = findElements(hast, 'div');
		const colsDiv = divs.find((d) => d.properties?.['dataLayout'] === 'cols');
		expect(colsDiv).toBeDefined();
	});

	it('ignores non-cols directives', async () => {
		const md = ':::blockquote\nNot cols\n:::';
		const hast = await applyPlugins(md, {
			remarkPlugins: [[remarkDirective], [remarkColsDirective]],
		});
		const divs = findElements(hast, 'div');
		const colsDiv = divs.find((d) => d.properties?.['dataLayout'] === 'cols');
		expect(colsDiv).toBeUndefined();
	});
});
