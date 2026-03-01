import type { Element, ElementContent, Root } from 'hast';
import { visit } from 'unist-util-visit';

/**
 * Rehype plugin that transforms tables based on their `data-table-variant`.
 *
 * Currently supports:
 *
 * - **bit-layout**: Restructures the GFM table output so that:
 *   - All rows move into `<tbody>` (no `<thead>`)
 *   - In the first row, edge cells (first and last) become `<td>`,
 *     inner cells stay as `<th>`
 *   - Remaining rows keep all cells as `<td>`
 */
export function rehypeTableVariants() {
	return (tree: Root) => {
		visit(tree, 'element', (node: Element) => {
			if (node.tagName !== 'table') return;

			const variant = node.properties?.dataTableVariant;
			if (!variant) return;

			if (variant === 'bit-layout') {
				transformBitLayout(node);
			}
		});
	};
}

function isElement(node: ElementContent): node is Element {
	return node.type === 'element';
}

function getElementChildren(node: Element): Element[] {
	return node.children.filter(isElement);
}

function transformBitLayout(table: Element) {
	const thead = getElementChildren(table).find(
		(child) => child.tagName === 'thead',
	);
	const tbody = getElementChildren(table).find(
		(child) => child.tagName === 'tbody',
	);

	if (!thead) return;

	// Get header rows and convert edge cells from th to td
	const headerRows = getElementChildren(thead);
	for (const row of headerRows) {
		const cells = getElementChildren(row);
		if (cells.length >= 2) {
			// First and last cells become td (edge labels like MSB<, >LSB)
			cells[0].tagName = 'td';
			cells[cells.length - 1].tagName = 'td';
			// Inner cells stay as th
		}
	}

	if (tbody) {
		// Prepend header rows to tbody
		const tbodyElements = tbody.children.filter(isElement);
		tbody.children = [...headerRows, ...tbodyElements];
	} else {
		// Create tbody with all rows
		const newTbody: Element = {
			type: 'element',
			tagName: 'tbody',
			properties: {},
			children: headerRows,
		};
		table.children = [newTbody];
		return;
	}

	// Remove thead
	table.children = table.children.filter(
		(child) => !(isElement(child) && child.tagName === 'thead'),
	);
}
