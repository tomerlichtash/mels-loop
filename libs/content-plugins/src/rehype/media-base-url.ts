import type { Element, Root } from 'hast';
import { visit } from 'unist-util-visit';

const MEDIA_PREFIX = '/media/';

interface Options {
	baseUrl: string;
}

/**
 * Rewrites `img[src^="/media/"]` and `a[href^="/media/"]` to use an external
 * base URL (e.g. S3). When no baseUrl is provided the paths stay relative.
 */
export function rehypeMediaBaseUrl({ baseUrl }: Options) {
	return (tree: Root) => {
		if (!baseUrl) return;

		visit(tree, 'element', (node: Element) => {
			if (node.tagName === 'img' || node.tagName === 'source') {
				rewriteAttr(node, 'src', baseUrl);
			}
			if (node.tagName === 'a') {
				rewriteAttr(node, 'href', baseUrl);
			}
		});
	};
}

function rewriteAttr(node: Element, attr: string, baseUrl: string) {
	const val = node.properties?.[attr];
	if (typeof val === 'string' && val.startsWith(MEDIA_PREFIX)) {
		node.properties[attr] = baseUrl + val.slice(MEDIA_PREFIX.length);
	}
}
