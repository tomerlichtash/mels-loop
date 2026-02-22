import type { Paragraph, Root, Text } from 'mdast';
import { visit } from 'unist-util-visit';

interface VerseOptions {
	parseMode?: 'verse' | 'normal';
}

/**
 * When parseMode is "verse", converts newlines within text nodes to <br> tags.
 * This preserves line breaks as they appear in the source, which is essential
 * for poetry/verse content like The Story of Mel.
 */
export function remarkVerse(options: VerseOptions = {}) {
	const { parseMode } = options;

	return (tree: Root) => {
		if (parseMode !== 'verse') return;

		visit(tree, 'paragraph', (node: Paragraph) => {
			const newChildren: Paragraph['children'] = [];

			for (const child of node.children) {
				if (child.type === 'text') {
					const text = child as Text;
					const lines = text.value.split('\n');

					lines.forEach((line, i) => {
						if (i > 0) {
							newChildren.push({
								type: 'html' as unknown as 'text',
								value: '<br />',
							} as unknown as Paragraph['children'][number]);
						}
						if (line) {
							newChildren.push({ type: 'text', value: line });
						}
					});
				} else {
					newChildren.push(child);
				}
			}

			node.children = newChildren;
		});
	};
}
