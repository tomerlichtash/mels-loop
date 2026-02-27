import type { Root } from 'mdast';
import { visit } from 'unist-util-visit';

interface DirectiveNode {
	type: 'containerDirective';
	name: string;
	attributes?: Record<string, string | null | undefined> | null;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	children: any[];
	data?: {
		hName?: string;
		hProperties?: Record<string, unknown>;
		[key: string]: unknown;
	};
}

/**
 * Transforms `:::figure` container directives into `<figure>` elements,
 * participating in automatic figure indexing.
 *
 * Usage in markdown:
 *
 *   :::figure
 *   ```
 *   preformatted content here
 *   ```
 *   :::
 */
export function remarkFigureDirective() {
	return (tree: Root) => {
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		visit(tree, 'containerDirective', (node: any) => {
			const directive = node as DirectiveNode;

			if (directive.name !== 'figure') return;

			directive.data = {
				hName: 'figure',
				hProperties: {},
			};
		});
	};
}
