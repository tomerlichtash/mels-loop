import type { Root } from 'mdast';
import { visit } from 'unist-util-visit';

import type { DirectiveNode } from './types';

/**
 * Transforms `:::smallprint` container directives into de-emphasised print.
 *
 * For the lines that surround a text without belonging to it: where and when
 * it was published, who holds the rights, where a copy can be read. They are
 * part of the document — they belong in the body, in the order the author put
 * them — but they are not the work, and setting them like the work makes a
 * reader start on the wrong sentence.
 *
 *     :::smallprint
 *     This was posted to Usenet by its author, Ed Nather, on May 21, 1983:
 *     :::
 *
 * The alternative was to lift such a line out of the body into a frontmatter
 * field, which is what the two locales of the Mel codex had each done, in
 * different fields, to the same sentence. That loses its position in the
 * document and makes its rendering a property of the template rather than of
 * the text.
 */
export function remarkSmallprintDirective() {
	return (tree: Root) => {
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		visit(tree, 'containerDirective', (node: any) => {
			const directive = node as DirectiveNode;
			if (directive.name !== 'smallprint') return;

			directive.data = {
				...directive.data,
				hName: 'div',
				hProperties: { 'data-type': 'smallprint' },
			};
		});
	};
}
