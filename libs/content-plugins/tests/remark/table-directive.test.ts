import remarkDirective from 'remark-directive';
import { describe, expect, it } from 'vitest';

import { remarkTableDirective } from '../../src/remark/table-directive';
import { applyPlugins, findElements } from '../test-helpers';

describe('remarkTableDirective', () => {
	it('attaches variant to the table element', async () => {
		const md =
			':::table{variant=bit-layout}\n| A | B |\n|---|---|\n| 1 | 2 |\n:::';
		const hast = await applyPlugins(md, {
			remarkPlugins: [[remarkDirective], [remarkTableDirective]],
		});
		const tables = findElements(hast, 'table');
		expect(tables).toHaveLength(1);
		expect(tables[0].properties?.['dataTableVariant']).toBe('bit-layout');
	});

	it('wraps table in <figure> when figure attribute is present', async () => {
		const md =
			':::table{variant=bit-layout figure}\n| A | B |\n|---|---|\n| 1 | 2 |\n:::';
		const hast = await applyPlugins(md, {
			remarkPlugins: [[remarkDirective], [remarkTableDirective]],
		});
		const figures = findElements(hast, 'figure');
		expect(figures).toHaveLength(1);
		const tables = findElements(figures[0], 'table');
		expect(tables).toHaveLength(1);
	});

	it('unwraps table from directive when no figure attribute', async () => {
		const md =
			':::table{variant=bit-layout}\n| A | B |\n|---|---|\n| 1 | 2 |\n:::';
		const hast = await applyPlugins(md, {
			remarkPlugins: [[remarkDirective], [remarkTableDirective]],
		});
		// Table should exist but not inside a figure
		const figures = findElements(hast, 'figure');
		expect(figures).toHaveLength(0);
		const tables = findElements(hast, 'table');
		expect(tables).toHaveLength(1);
	});

	it('ignores non-table directives', async () => {
		const md = ':::cols\nNot a table\n:::';
		const hast = await applyPlugins(md, {
			remarkPlugins: [[remarkDirective], [remarkTableDirective]],
		});
		const tables = findElements(hast, 'table');
		expect(tables).toHaveLength(0);
	});

	it('handles table directive with no variant attribute', async () => {
		const md = ':::table\n| A | B |\n|---|---|\n| 1 | 2 |\n:::';
		const hast = await applyPlugins(md, {
			remarkPlugins: [[remarkDirective], [remarkTableDirective]],
		});
		const tables = findElements(hast, 'table');
		expect(tables).toHaveLength(1);
		expect(tables[0].properties?.['dataTableVariant']).toBeUndefined();
	});

	it('ignores table directive with no table child', async () => {
		const md = ':::table{variant=bit-layout}\nJust a paragraph, no table\n:::';
		const hast = await applyPlugins(md, {
			remarkPlugins: [[remarkDirective], [remarkTableDirective]],
		});
		const tables = findElements(hast, 'table');
		expect(tables).toHaveLength(0);
	});
});
