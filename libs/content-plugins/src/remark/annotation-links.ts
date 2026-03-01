import type { Link, Root } from 'mdast';
import { visit } from 'unist-util-visit';

import { setLinkHProperties } from './helpers';

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

			const target = url.replace(ANNOTATION_RE, '');

			setLinkHProperties(node, {
				'data-link-type': 'annotation',
				'data-link-target': target,
				'data-sequence': String(sequence),
			});

			// If the link text is "^", it's a footnote-style annotation
			const firstChild = node.children[0];
			if (firstChild?.type === 'text' && firstChild.value === '^') {
				firstChild.value = String(sequence).padStart(2, '0');
			}
		});
	};
}
