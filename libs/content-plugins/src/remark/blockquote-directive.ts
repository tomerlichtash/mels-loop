import type { Root } from 'mdast';
import { visit } from 'unist-util-visit';

import { splitTextNewlines } from './helpers';
import type { DirectiveNode } from './types';

/**
 * Transforms `:::blockquote{verse}` container directives into `<blockquote>`
 * elements with optional verse formatting and citation.
 *
 * Usage in markdown:
 *
 *   :::blockquote{verse}
 *   The vital clue came when I noticed
 *   the index register bit,
 *   ::cite[Lines 185-190]
 *   :::
 *
 * - `verse` attribute: preserves line breaks (newlines → <br>)
 * - `::cite[text]` leaf directive: renders as <cite>(text)</cite>
 */
export function remarkBlockquoteDirective() {
	return (tree: Root) => {
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		visit(tree, (node: any, index, parent) => {
			// Handle ::cite leaf directives → <cite>
			if (node.type === 'leafDirective' && node.name === 'cite') {
				const directive = node as DirectiveNode;
				directive.data = {
					hName: 'cite',
				};
				return;
			}

			// Handle :::blockquote container directives
			if (node.type !== 'containerDirective' || node.name !== 'blockquote') {
				return;
			}

			const directive = node as DirectiveNode;
			if (typeof index !== 'number' || !parent) return;

			const isVerse = 'verse' in (directive.attributes ?? {});

			// Convert the directive into a <blockquote>
			directive.data = {
				hName: 'blockquote',
				hProperties: {
					...(isVerse && { 'data-parse-mode': 'verse' }),
					'data-type': 'quote',
				},
			};

			// In verse mode, convert newlines to <br> within text nodes
			if (isVerse) {
				for (const child of directive.children) {
					if (child.type !== 'paragraph') continue;
					// eslint-disable-next-line @typescript-eslint/no-explicit-any
					const para = child as any;
					para.children = splitTextNewlines(para.children);
				}
			}
		});
	};
}
