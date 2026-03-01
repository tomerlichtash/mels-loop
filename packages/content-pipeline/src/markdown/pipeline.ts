import type { Root as HastRoot } from 'hast';
import rehypeRaw from 'rehype-raw';
import remarkFrontmatter from 'remark-frontmatter';
import remarkGfm from 'remark-gfm';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import { unified } from 'unified';

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

	processor.use(remarkRehype, { allowDangerousHtml: true }).use(rehypeRaw);

	for (const [plugin, ...opts] of options.rehypePlugins ?? []) {
		processor.use(plugin, ...opts);
	}

	const mdast = processor.parse(sanitized);
	const hast = (await processor.run(mdast)) as HastRoot;

	return hast;
}
