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

const VALID_RATIOS = new Set(['auto', '1-1', '1-2', '2-1', '1-3', '3-1']);

/**
 * Transforms `:::cols` / `::::cols` container directives into a two-column
 * layout.
 *
 * Two modes:
 *
 * 1. **Explicit columns** — when the directive contains `:::col` children,
 *    each `:::col` becomes a grid column (wrapped in a plain <div>).
 *
 *    ::::cols{ratio=1-2}
 *    :::col
 *    Paragraph text…
 *    :::
 *    :::col
 *    <figure>…</figure>
 *    :::
 *    ::::
 *
 * 2. **Auto-split** — when no `:::col` children are present, all leading
 *    `html` nodes become column 1 and the rest become column 2.
 *
 *    :::cols
 *    <figure data-max-width="280">…</figure>
 *
 *    Paragraph text…
 *    :::
 *
 * Supports an optional `ratio` attribute to control column proportions:
 *   ratio=1-2  → 1fr 2fr
 *   ratio=1-1  → 1fr 1fr
 *   (default)  → auto 1fr
 *
 * Valid ratios: auto, 1-1, 1-2, 2-1, 1-3, 3-1
 */
export function remarkColsDirective() {
	return (tree: Root) => {
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		visit(tree, 'containerDirective', (node: any) => {
			const directive = node as DirectiveNode;

			// Handle :::col children — just mark them as plain divs
			if (directive.name === 'col') {
				directive.data = { ...directive.data, hName: 'div' };
				return;
			}

			if (directive.name !== 'cols') return;

			const ratio = directive.attributes?.ratio ?? 'auto';
			const safeRatio = VALID_RATIOS.has(ratio) ? ratio : 'auto';

			directive.data = {
				...directive.data,
				hName: 'div',
				hProperties: {
					'data-layout': 'cols',
					...(safeRatio !== 'auto' && { 'data-cols-ratio': safeRatio }),
				},
			};

			// Mode 1: explicit :::col children — leave them in place
			const hasExplicitCols = directive.children.some(
				(child) =>
					(child as DirectiveNode).type === 'containerDirective' &&
					(child as DirectiveNode).name === 'col',
			);

			if (hasExplicitCols) return;

			// Mode 2: auto-split — leading html nodes → col 1, rest → col 2
			let splitIndex = 0;
			for (let i = 0; i < directive.children.length; i++) {
				if (directive.children[i].type === 'html') {
					splitIndex = i + 1;
				} else {
					break;
				}
			}

			const firstCol = directive.children.slice(0, splitIndex);
			const secondCol = directive.children.slice(splitIndex);

			if (firstCol.length === 0 || secondCol.length === 0) return;

			const col1: DirectiveNode = {
				type: 'containerDirective',
				name: '_col',
				attributes: {},
				children: firstCol,
				data: { hName: 'div' },
			};

			const col2: DirectiveNode = {
				type: 'containerDirective',
				name: '_col',
				attributes: {},
				children: secondCol,
				data: { hName: 'div' },
			};

			directive.children = [col1, col2] as unknown as (
				| BlockContent
				| DefinitionContent
			)[];
		});
	};
}
