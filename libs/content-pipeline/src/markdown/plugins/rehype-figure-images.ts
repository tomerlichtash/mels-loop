import type { Root, Element, Text } from 'hast';
import { visit } from 'unist-util-visit';

const IMAGE_RE = /!\[([^\]]*)\]\(([^)]+)\)/g;

/**
 * Rehype plugin that converts markdown image syntax (![alt](src)) found
 * inside <figure> elements into proper <img> elements.
 *
 * This is needed because remark treats content inside HTML blocks as raw
 * text, so ![](url) inside <figure> never becomes an <img> node.
 */
export function rehypeFigureImages() {
	return (tree: Root) => {
		visit(tree, 'element', (node: Element) => {
			if (node.tagName !== 'figure') return;

			const newChildren: Element['children'] = [];

			for (const child of node.children) {
				if (child.type !== 'text') {
					newChildren.push(child);
					continue;
				}

				const text = (child as Text).value;
				let lastIndex = 0;
				let match: RegExpExecArray | null;

				IMAGE_RE.lastIndex = 0;
				while ((match = IMAGE_RE.exec(text)) !== null) {
					const before = text.slice(lastIndex, match.index);
					if (before.trim()) {
						newChildren.push({ type: 'text', value: before });
					}

					newChildren.push({
						type: 'element',
						tagName: 'img',
						properties: { src: match[2], alt: match[1] },
						children: [],
					});

					lastIndex = IMAGE_RE.lastIndex;
				}

				const after = text.slice(lastIndex);
				if (after.trim()) {
					newChildren.push({ type: 'text', value: after });
				}
			}

			node.children = newChildren;
		});
	};
}
