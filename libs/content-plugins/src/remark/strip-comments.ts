import type { Root } from 'mdast';
import { visit } from 'unist-util-visit';

/**
 * Removes HTML comments from markdown content.
 * Strips both standard HTML comments (<!-- -->) and
 * lines starting with /// (triple-slash comments used as editorial notes).
 */
export function remarkStripComments() {
	return (tree: Root) => {
		// Remove HTML comment nodes
		visit(tree, 'html', (node, index, parent) => {
			if (
				parent &&
				typeof index === 'number' &&
				/^<!--[\s\S]*?-->$/.test(node.value.trim())
			) {
				parent.children.splice(index, 1);
				return index;
			}
		});

		// Remove paragraphs that start with ///
		visit(tree, 'paragraph', (node, index, parent) => {
			if (parent && typeof index === 'number') {
				const firstChild = node.children[0];
				if (firstChild?.type === 'text' && firstChild.value.startsWith('///')) {
					parent.children.splice(index, 1);
					return index;
				}
			}
		});
	};
}
