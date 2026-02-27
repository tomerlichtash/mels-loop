import type { Root as HastRoot } from 'hast';
import rehypeRaw from 'rehype-raw';
import remarkDirective from 'remark-directive';
import remarkFrontmatter from 'remark-frontmatter';
import remarkGfm from 'remark-gfm';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import { unified } from 'unified';

import { rehypeFigureImages } from './plugins/rehype-figure-images';
import { rehypeFigureIndex } from './plugins/rehype-figure-index';
import { rehypeLines } from './plugins/rehype-lines';
import { rehypeSourceImages } from './plugins/rehype-source-images';
import { rehypeTableVariants } from './plugins/rehype-table-variants';
import { remarkAnnotationLinks } from './plugins/remark-annotation-links';
import { remarkColsDirective } from './plugins/remark-cols-directive';
import { remarkFigures } from './plugins/remark-figures';
import { remarkGlossaryLinks } from './plugins/remark-glossary-links';
import { remarkSourceLinks } from './plugins/remark-source-links';
import { remarkSourceVars } from './plugins/remark-source-vars';
import { remarkStripComments } from './plugins/remark-strip-comments';
import { remarkTableDirective } from './plugins/remark-table-directive';
import { remarkVerse } from './plugins/remark-verse';
import type { MarkdownProcessOptions } from './types';

/**
 * Escape angle brackets around email-like addresses so rehype-raw
 * doesn't try to parse them as HTML tags.
 */
function escapeEmailAngles(content: string): string {
	return content.replace(/<([^>\s]*@[^>\s]*)>/g, '&lt;$1&gt;');
}

export async function processMarkdown(
	content: string,
	options: MarkdownProcessOptions = {},
): Promise<HastRoot> {
	const sanitized = escapeEmailAngles(content);

	const processor = unified()
		.use(remarkParse)
		.use(remarkFrontmatter)
		.use(remarkStripComments)
		.use(remarkSourceVars, { sources: options.sources ?? {} })
		.use(remarkGfm)
		.use(remarkAnnotationLinks)
		.use(remarkGlossaryLinks)
		.use(remarkSourceLinks)
		.use(remarkFigures)
		.use(remarkDirective)
		.use(remarkColsDirective)
		.use(remarkTableDirective)
		.use(remarkVerse, { parseMode: options.parseMode })
		.use(remarkRehype, { allowDangerousHtml: true })
		.use(rehypeRaw)
		.use(rehypeTableVariants)
		.use(rehypeFigureImages)
		.use(rehypeSourceImages, { sources: options.sources ?? {} })
		.use(rehypeFigureIndex, {
			auto: options.figures?.auto,
			template: options.figures?.template,
			baseIndex: options.figures?.base_index ?? options.figureIndex ?? 0,
		})
		.use(rehypeLines);

	const mdast = processor.parse(sanitized);
	const hast = (await processor.run(mdast)) as HastRoot;

	return hast;
}
