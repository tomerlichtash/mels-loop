import type { Paragraph, Root } from 'mdast';
import { visit } from 'unist-util-visit';

import { splitTextNewlines } from './helpers';

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
			node.children = splitTextNewlines(node.children) as Paragraph['children'];
		});
	};
}
