import type { Link, Root } from 'mdast';
import { visit } from 'unist-util-visit';

const SOURCE_RE = /^sources?\//i;

/**
 * Detects links matching [label](sources/id) or [label](source/id) pattern and
 * adds data attributes for source popover rendering.
 */
export function remarkSourceLinks() {
	return (tree: Root) => {
		visit(tree, 'link', (node: Link) => {
			const url = node.url;
			if (!SOURCE_RE.test(url)) return;

			// Extract source ID from URL (e.g., "sources/mel-kaye-photo-1952" -> "mel-kaye-photo-1952")
			const target = url.replace(SOURCE_RE, '');

			const data = node.data || (node.data = {});
			const hProperties =
				(data.hProperties as Record<string, unknown>) ||
				((data.hProperties = {}) as Record<string, unknown>);

			hProperties['data-link-type'] = 'source';
			hProperties['data-link-target'] = target;
		});
	};
}
