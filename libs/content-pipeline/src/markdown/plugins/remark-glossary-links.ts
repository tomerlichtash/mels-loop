import type { Link, Root } from 'mdast';
import { visit } from 'unist-util-visit';

const GLOSSARY_RE = /^glossary\//i;

/**
 * Detects links matching [text](glossary/...) pattern and adds
 * data attributes for glossary popover rendering.
 */
export function remarkGlossaryLinks() {
	return (tree: Root) => {
		visit(tree, 'link', (node: Link) => {
			const url = node.url;
			if (!GLOSSARY_RE.test(url)) return;

			// Extract glossary term ID from URL (e.g., "glossary/drum-memory" -> "drum-memory")
			const target = url.replace(GLOSSARY_RE, '');

			const data = node.data || (node.data = {});
			const hProperties =
				(data.hProperties as Record<string, unknown>) ||
				((data.hProperties = {}) as Record<string, unknown>);

			hProperties['data-link-type'] = 'glossary';
			hProperties['data-link-target'] = target;
		});
	};
}
