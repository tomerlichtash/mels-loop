import type { Link, Root } from 'mdast';
import { visit } from 'unist-util-visit';

const ANNOTATION_RE = /^annotations?\//i;

/**
 * Detects links matching [^](annotations/...) pattern and adds
 * data attributes for popover rendering.
 */
export function remarkAnnotationLinks() {
	let sequence = 0;

	return (tree: Root) => {
		sequence = 0;

		visit(tree, 'link', (node: Link) => {
			const url = node.url;
			if (!ANNOTATION_RE.test(url)) return;

			sequence++;

			// Extract annotation ID from URL (e.g., "annotations/mel-kaye-bio" -> "mel-kaye-bio")
			const target = url.replace(ANNOTATION_RE, '');

			// Set hProperties so they appear as attributes in the hast output
			const data: Record<string, unknown> =
				(node.data as Record<string, unknown>) ||
				((node.data = {}) as unknown as Record<string, unknown>);
			const hProperties =
				(data.hProperties as Record<string, unknown>) ||
				((data.hProperties = {}) as Record<string, unknown>);

			hProperties['data-link-type'] = 'annotation';
			hProperties['data-link-target'] = target;
			hProperties['data-sequence'] = String(sequence);

			// If the link text is "^", it's a footnote-style annotation
			const firstChild = node.children[0];
			if (firstChild?.type === 'text' && firstChild.value === '^') {
				firstChild.value = String(sequence).padStart(2, '0');
			}
		});
	};
}
