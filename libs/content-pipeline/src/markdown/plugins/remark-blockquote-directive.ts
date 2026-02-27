import type { BlockContent, DefinitionContent, Root } from 'mdast';
import { visit } from 'unist-util-visit';

interface DirectiveNode {
	type: 'containerDirective' | 'leafDirective';
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
				convertNewlinesToBreaks(directive);
			}
		});
	};
}

function convertNewlinesToBreaks(node: DirectiveNode) {
	for (const child of node.children) {
		if (child.type !== 'paragraph') continue;

		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		const para = child as any;
		const newChildren: typeof para.children = [];

		for (const c of para.children) {
			if (c.type === 'text') {
				const lines = c.value.split('\n');
				lines.forEach((line: string, i: number) => {
					if (i > 0) {
						newChildren.push({
							type: 'html',
							value: '<br />',
						});
					}
					if (line) {
						newChildren.push({ type: 'text', value: line });
					}
				});
			} else {
				newChildren.push(c);
			}
		}

		para.children = newChildren;
	}
}
