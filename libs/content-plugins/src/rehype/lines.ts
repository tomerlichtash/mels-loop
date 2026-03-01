import type { Element, ElementContent, Root } from 'hast';
import { visit } from 'unist-util-visit';

/**
 * Rehype plugin that wraps lines within verse paragraphs in <line> elements.
 *
 * Paragraphs containing <br> elements (produced by remark-verse) are split
 * at each <br> boundary. Each segment becomes a <line id="line-N"> element,
 * enabling deep-linking to individual lines of a story.
 *
 * Paragraphs without <br> elements are left untouched.
 */
export function rehypeLines() {
	return (tree: Root) => {
		let lineCount = 0;

		visit(tree, 'element', (node: Element) => {
			if (node.tagName !== 'p') return;

			const hasBr = node.children.some(
				(child) =>
					child.type === 'element' && (child as Element).tagName === 'br',
			);
			if (!hasBr) return;

			const segments: ElementContent[][] = [[]];

			for (const child of node.children) {
				if (child.type === 'element' && (child as Element).tagName === 'br') {
					segments.push([]);
				} else {
					segments[segments.length - 1].push(child);
				}
			}

			node.children = segments
				.filter((seg) => seg.length > 0)
				.map((seg) => ({
					type: 'element' as const,
					tagName: 'line',
					properties: { id: `line-${++lineCount}` },
					children: seg,
				}));
		});
	};
}
