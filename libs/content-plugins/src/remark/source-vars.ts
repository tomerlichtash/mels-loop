import type { ResolvedSource } from '@mels-loop/content-loaders/types';
import type { Html, Image, Root, Text } from 'mdast';
import { visit } from 'unist-util-visit';

/**
 * Matches `{{sources/id:field}}` or `{{source/id:field}}` template expressions.
 * Accessible fields: title, description, author, date, source, repository, license, url, type.
 */
const VAR_RE = /\{\{sources?\/([^:}]+):([^}]+)\}\}/g;

interface Options {
	sources: Record<string, ResolvedSource>;
}

/*
 * Runs on the raw markdown, before it is parsed.
 *
 * It has to. remark-directive treats `:name` as inline directive syntax, and
 * it is a *syntax extension*, so it acts while the document is being parsed —
 * before any transformer, whatever the plugin order says. In a paragraph
 * `{{sources/id:description}}` was split into three nodes, and in an image's
 * alt text the `:description` was swallowed whole and the field name lost with
 * it. A transformer could never see an intact expression, so this feature had
 * silently produced raw `{{...}}` on the page.
 *
 * The guard that used to sit in front of each call was `VAR_RE.test(value)`,
 * on a regex carrying the /g flag. `test` advances `lastIndex` on a match, so
 * the next node was searched from wherever the previous one happened to stop
 * and expressions were skipped at random. String.replace with /g always starts
 * from zero, so the work is done here and the guard is a plain substring check
 * that cannot carry state.
 */
export function interpolateSourceVars(
	value: string,
	sources: Record<string, ResolvedSource>,
): string {
	if (!value.includes('{{')) return value;
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
 * Kept as a safety net for expressions that survive parsing intact. The real
 * work happens before the parser runs — see the preprocess note on
 * interpolateSourceVars — because remark-directive claims `:field` as text
 * directive syntax and destroys these expressions at parse time.
 *
 * Replaces `{{sources/id:field}}` expressions with resolved values from the
 * pre-loaded sources map. Covers plain `text` nodes, raw `html` nodes (content
 * inside `<figure>` and other HTML blocks), and the `alt` and `title`
 * properties of images.
 *
 * Images matter because a figure's caption is authored as the image's alt text
 * — `![{{sources/id:description}}](sources/id)`. That alt is a property of an
 * image node, never a text node, so visiting text alone missed it entirely and
 * the raw `{{...}}` was copied verbatim into the figcaption by remarkFigures.
 * Interpolating here rather than there keeps every expansion in one plugin,
 * and this one runs first.
 *
 * Locale resolution has already happened at the loader level, so `title` and
 * `description` return the locale-correct string.
 */
export function remarkSourceVars({ sources }: Options) {
	return (tree: Root) => {
		if (!sources || Object.keys(sources).length === 0) return;

		visit(tree, 'text', (node: Text) => {
			node.value = interpolateSourceVars(node.value, sources);
		});

		visit(tree, 'html', (node: Html) => {
			node.value = interpolateSourceVars(node.value, sources);
		});

		visit(tree, 'image', (node: Image) => {
			if (node.alt) node.alt = interpolateSourceVars(node.alt, sources);
			if (node.title) node.title = interpolateSourceVars(node.title, sources);
		});
	};
}
