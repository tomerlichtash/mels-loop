import type { Html, Root, Text } from 'mdast';
import { visit } from 'unist-util-visit';

import type { ResolvedSource } from '../../types';

/**
 * Matches `{{sources/id:field}}` or `{{source/id:field}}` template expressions.
 * Accessible fields: title, description, author, date, credit, license, url, type.
 */
const VAR_RE = /\{\{sources?\/([^:}]+):([^}]+)\}\}/g;

interface Options {
	sources: Record<string, ResolvedSource>;
}

function interpolate(
	value: string,
	sources: Record<string, ResolvedSource>,
): string {
	VAR_RE.lastIndex = 0;
	return value.replace(VAR_RE, (_, id: string, field: string) => {
		const source = sources[id];
		if (!source) return '';
		const resolved = (source as unknown as Record<string, unknown>)[
			field.trim()
		];
		return typeof resolved === 'string' ? resolved : '';
	});
}

/**
 * Replaces `{{sources/id:field}}` expressions with resolved values from the
 * pre-loaded sources map. Handles both plain `text` nodes and raw `html` nodes
 * (the latter covers content inside `<figure>` and other HTML blocks).
 *
 * Locale resolution has already happened at the loader level, so `title` and
 * `description` return the locale-correct string.
 */
export function remarkSourceVars({ sources }: Options) {
	return (tree: Root) => {
		if (!sources || Object.keys(sources).length === 0) return;

		visit(tree, 'text', (node: Text) => {
			if (!VAR_RE.test(node.value)) return;
			node.value = interpolate(node.value, sources);
		});

		visit(tree, 'html', (node: Html) => {
			if (!VAR_RE.test(node.value)) return;
			node.value = interpolate(node.value, sources);
		});
	};
}
