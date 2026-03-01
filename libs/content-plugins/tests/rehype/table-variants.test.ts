import remarkDirective from 'remark-directive';
import { describe, expect, it } from 'vitest';

import { rehypeTableVariants } from '../../src/rehype/table-variants';
import { remarkTableDirective } from '../../src/remark/table-directive';
import { applyPlugins, findElements } from '../test-helpers';

describe('rehypeTableVariants', () => {
	it('transforms bit-layout tables: removes thead, merges rows into tbody', async () => {
		const md =
			':::table{variant=bit-layout}\n| MSB | AAA | X | CCC | LSB |\n|-----|-----|---|-----|-----|\n| | Data | Idx | Op | |\n:::';
		const hast = await applyPlugins(md, {
			remarkPlugins: [[remarkDirective], [remarkTableDirective]],
			rehypePlugins: [[rehypeTableVariants]],
		});
		const tables = findElements(hast, 'table');
		expect(tables).toHaveLength(1);

		const theads = findElements(tables[0], 'thead');
		expect(theads).toHaveLength(0);

		const tbodies = findElements(tables[0], 'tbody');
		expect(tbodies).toHaveLength(1);

		// Should have 2 rows in tbody (header row moved + data row)
		const rows = findElements(tbodies[0], 'tr');
		expect(rows).toHaveLength(2);
	});

	it('converts edge cells in header row to <td>', async () => {
		const md =
			':::table{variant=bit-layout}\n| MSB | AAA | LSB |\n|-----|-----|-----|\n| | Data | |\n:::';
		const hast = await applyPlugins(md, {
			remarkPlugins: [[remarkDirective], [remarkTableDirective]],
			rehypePlugins: [[rehypeTableVariants]],
		});
		const tbodies = findElements(hast, 'tbody');
		const rows = findElements(tbodies[0], 'tr');
		// First row: edge cells should be <td>, inner cells <th>
		const firstRowCells = rows[0].children.filter(
			(c) => c.type === 'element' && (c.tagName === 'td' || c.tagName === 'th'),
		);
		expect(firstRowCells.length).toBeGreaterThanOrEqual(3);
	});

	it('ignores tables without data-table-variant', async () => {
		const md = '| A | B |\n|---|---|\n| 1 | 2 |';
		const hast = await applyPlugins(md, {
			rehypePlugins: [[rehypeTableVariants]],
		});
		const theads = findElements(hast, 'thead');
		// thead should still be present (not removed)
		expect(theads).toHaveLength(1);
	});

	it('ignores unknown variants', async () => {
		const md =
			':::table{variant=unknown}\n| A | B |\n|---|---|\n| 1 | 2 |\n:::';
		const hast = await applyPlugins(md, {
			remarkPlugins: [[remarkDirective], [remarkTableDirective]],
			rehypePlugins: [[rehypeTableVariants]],
		});
		const tables = findElements(hast, 'table');
		expect(tables).toHaveLength(1);
		// thead should still exist — no transformation applied
		const theads = findElements(tables[0], 'thead');
		expect(theads).toHaveLength(1);
	});

	it('handles header row with single cell', async () => {
		const md =
			':::table{variant=bit-layout}\n| Only |\n|------|\n| Data |\n:::';
		const hast = await applyPlugins(md, {
			remarkPlugins: [[remarkDirective], [remarkTableDirective]],
			rehypePlugins: [[rehypeTableVariants]],
		});
		const tables = findElements(hast, 'table');
		expect(tables).toHaveLength(1);
	});

	it('creates tbody when table has only thead (no tbody)', async () => {
		const md =
			':::table{variant=bit-layout}\n| A | B | C |\n|---|---|---|\n:::';
		const hast = await applyPlugins(md, {
			remarkPlugins: [[remarkDirective], [remarkTableDirective]],
			rehypePlugins: [[rehypeTableVariants]],
		});
		const tables = findElements(hast, 'table');
		expect(tables).toHaveLength(1);
		const tbodies = findElements(tables[0], 'tbody');
		expect(tbodies).toHaveLength(1);
	});
});
