import type { BlockContent, DefinitionContent, Root } from 'mdast';
import { visit } from 'unist-util-visit';

interface DirectiveNode {
	type: 'containerDirective';
	name: string;
	attributes?: Record<string, string | null | undefined> | null;
	children: (BlockContent | DefinitionContent)[];
	data?: {
		hName?: string;
		hProperties?: Record<string, unknown>;
		[key: string]: unknown;
	};
}

/**
 * Transforms `:::table{variant=...}` container directives.
 *
 * Finds the table node inside the directive, attaches the variant as
 * `data-table-variant`, and optionally wraps it in a `<figure>` element
 * for automatic figure indexing.
 *
 * Usage in markdown:
 *
 *   :::table{variant=bit-layout figure}
 *   | MSB< | AAA | X   | CCC    | >LSB |
 *   |------|-----|-----|--------|------|
 *   |      | Data| Index| Opcode |      |
 *   :::
 *
 * The `figure` attribute is optional. When present, the table is wrapped
 * in a <figure> and participates in auto-indexing (Fig. 1, Fig. 2, etc.).
 */
export function remarkTableDirective() {
	return (tree: Root) => {
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		visit(tree, 'containerDirective', (node: any, index, parent) => {
			const directive = node as DirectiveNode;

			if (directive.name !== 'table') return;
			if (typeof index !== 'number' || !parent) return;

			const variant = directive.attributes?.variant;
			const wrapInFigure = 'figure' in (directive.attributes ?? {});

			// Find the table node among the directive's children
			const tableChild = directive.children.find(
				(child) => child.type === 'table',
			);

			if (!tableChild) return;

			// Attach the variant as a HAST property on the table
			if (variant) {
				const existing = (tableChild.data ?? {}) as Record<string, unknown>;
				const existingProps =
					(existing.hProperties as Record<string, unknown>) ?? {};
				tableChild.data = {
					...existing,
					hProperties: {
						...existingProps,
						'data-table-variant': variant,
					},
				};
			}

			if (wrapInFigure) {
				// Wrap the table in a <figure> for auto-indexing
				directive.children = [tableChild];
				directive.data = {
					hName: 'figure',
					hProperties: {},
				};
			} else {
				// Replace the directive with the table (unwrap)
				parent.children[index] = tableChild;
			}
		});
	};
}
