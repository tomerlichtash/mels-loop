import type { Element, Root } from 'hast';
import { visit } from 'unist-util-visit';

import type { ResolvedSource } from '../types';

const SOURCE_RE = /^sources?\//i;

interface Options {
	sources: Record<string, ResolvedSource>;
}

/**
 * Resolves `img[src^="sources/id"]` to the actual URL from the source registry.
 * Runs after rehypeFigureImages so it catches both regular markdown images
 * and images produced from inside <figure> HTML blocks.
 *
 * Also copies source metadata (author, credit, license) onto the element as
 * data-* attributes for downstream use.
 */
export function rehypeSourceImages({ sources }: Options) {
	return (tree: Root) => {
		if (!sources || Object.keys(sources).length === 0) return;

		visit(tree, 'element', (node: Element) => {
			if (node.tagName !== 'img') return;

			const src = node.properties?.src;
			if (typeof src !== 'string' || !SOURCE_RE.test(src)) return;

			const id = src.replace(SOURCE_RE, '');
			const source = sources[id];
			if (!source) return;

			node.properties = {
				...node.properties,
				src: source.url,
				'data-source-id': id,
				...(source.author ? { 'data-source-author': source.author } : {}),
				...(source.credit ? { 'data-source-credit': source.credit } : {}),
				...(source.license ? { 'data-source-license': source.license } : {}),
			};
		});
	};
}
