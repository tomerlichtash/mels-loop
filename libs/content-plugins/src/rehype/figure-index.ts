import type { Element, Root, Text } from 'hast';
import { visit } from 'unist-util-visit';

interface FigureIndexOptions {
	auto?: boolean;
	template?: string;
	baseIndex?: number;
}

export function rehypeFigureIndex(options: FigureIndexOptions = {}) {
	const { auto = false, template = 'Fig. %index%', baseIndex = 0 } = options;

	return (tree: Root) => {
		let counter = baseIndex;

		visit(tree, 'element', (node: Element) => {
			if (node.tagName !== 'figure') return;

			// Opt-out
			if (node.properties?.dataFigureIndex === 'none') return;

			counter++;
			node.properties = node.properties || {};
			node.properties.dataFigureIndex = String(counter);

			// Find figcaption child
			const figcaption = node.children.find(
				(c): c is Element => c.type === 'element' && c.tagName === 'figcaption',
			);

			const resolvedTemplate = template.replace(/%index%/g, String(counter));

			if (figcaption) {
				// Check if any text node already contains %index% (manual template)
				let hasManualIndex = false;
				visit(figcaption, 'text', (t: Text) => {
					if (t.value.includes('%index%')) hasManualIndex = true;
				});

				if (hasManualIndex) {
					// Resolve %index% in place
					visit(figcaption, 'text', (t: Text) => {
						if (t.value.includes('%index%')) {
							t.value = t.value.replace(/%index%/g, String(counter));
						}
					});
				} else if (auto) {
					// Prepend template to existing caption
					const separator: Text = { type: 'text', value: '. ' };
					figcaption.children.unshift(
						{ type: 'text', value: resolvedTemplate } as Text,
						separator,
					);
				}
			} else if (auto) {
				// Create figcaption from template
				node.children.push({
					type: 'element',
					tagName: 'figcaption',
					properties: {},
					children: [
						{
							type: 'text',
							value: resolvedTemplate,
						},
					],
				});
			}
		});
	};
}
