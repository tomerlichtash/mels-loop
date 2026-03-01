import type { Root } from 'mdast';
import { visit } from 'unist-util-visit';

import type { DirectiveNode } from './types';

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
