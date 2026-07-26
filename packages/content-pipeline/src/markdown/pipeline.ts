import type { Element, Root as HastRoot, RootContent, Text } from 'hast';
import rehypeRaw from 'rehype-raw';
import remarkFrontmatter from 'remark-frontmatter';
import remarkGfm from 'remark-gfm';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import { unified } from 'unified';
import { visit } from 'unist-util-visit';

import type { MarkdownProcessOptions } from './types';

export type { MarkdownProcessOptions, PluginSpec } from './types';

/**
 * Escape angle brackets around email-like addresses so rehype-raw
 * doesn't try to parse them as HTML tags.
 */
function escapeEmailAngles(content: string): string {
	return content.replace(/<([^>\s]*@[^>\s]*)>/g, '&lt;$1&gt;');
}

/**
 * Rehype plugin that unwraps mailto: autolinks into plain text.
 * GFM autolink literals turn bare emails into <a href="mailto:...">
 * which we don't want.
 */
function rehypeUnwrapMailto() {
	return (tree: HastRoot) => {
		visit(tree, (node, index, parent) => {
			if (
				node.type === 'element' &&
				(node as Element).tagName === 'a' &&
				typeof (node as Element).properties.href === 'string' &&
				((node as Element).properties.href as string).startsWith('mailto:') &&
				parent &&
				typeof index === 'number'
			) {
				const el = node as Element;
				const text: Text = {
					type: 'text',
					value:
						(el.children[0] as Text)?.value ??
						(el.properties.href as string).replace('mailto:', ''),
				};
				(parent.children as RootContent[]).splice(index, 1, text);
			}
		});
	};
}

/**
 * Processes raw markdown into a HAST tree.
 *
 * Core pipeline: remarkParse → remarkFrontmatter → remarkGfm → remarkRehype → rehypeRaw.
 * All custom transforms are supplied by the consumer via plugin arrays:
 * - `remarkPlugins`: inserted after GFM, before the remark→rehype bridge
 * - `rehypePlugins`: appended after rehype-raw
 */
export async function processMarkdown(
	content: string,
	options: MarkdownProcessOptions = {},
): Promise<HastRoot> {
	const sanitized = escapeEmailAngles(content);

	const processor = unified()
		.use(remarkParse)
		.use(remarkFrontmatter)
		.use(remarkGfm);

	for (const [plugin, ...opts] of options.remarkPlugins ?? []) {
		processor.use(plugin, ...opts);
	}

	processor
		.use(remarkRehype, { allowDangerousHtml: true })
		.use(rehypeRaw)
		.use(rehypeUnwrapMailto);

	for (const [plugin, ...opts] of options.rehypePlugins ?? []) {
		processor.use(plugin, ...opts);
	}

	const mdast = processor.parse(sanitized);
	const hast = (await processor.run(mdast)) as HastRoot;

	return hast;
}
