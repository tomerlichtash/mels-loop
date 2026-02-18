import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import remarkFrontmatter from "remark-frontmatter";
import remarkRehype from "remark-rehype";
import rehypeRaw from "rehype-raw";
import type { Root as HastRoot } from "hast";
import type { MarkdownProcessOptions } from "./types";
import { remarkStripComments } from "./plugins/remark-strip-comments";
import { remarkAnnotationLinks } from "./plugins/remark-annotation-links";
import { remarkGlossaryLinks } from "./plugins/remark-glossary-links";
import { remarkFigures } from "./plugins/remark-figures";
import { remarkVerse } from "./plugins/remark-verse";

/**
 * Escape angle brackets around email-like addresses so rehype-raw
 * doesn't try to parse them as HTML tags.
 */
function escapeEmailAngles(content: string): string {
  return content.replace(/<([^>\s]*@[^>\s]*)>/g, "&lt;$1&gt;");
}

export async function processMarkdown(
  content: string,
  options: MarkdownProcessOptions = {}
): Promise<HastRoot> {
  const sanitized = escapeEmailAngles(content);

  const processor = unified()
    .use(remarkParse)
    .use(remarkFrontmatter)
    .use(remarkStripComments)
    .use(remarkGfm)
    .use(remarkAnnotationLinks)
    .use(remarkGlossaryLinks)
    .use(remarkFigures, {
      auto: options.figures?.auto,
      template: options.figures?.template,
      baseIndex: options.figures?.base_index ?? options.figureIndex ?? 0,
    })
    .use(remarkVerse, { parseMode: options.parseMode })
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeRaw);

  const mdast = processor.parse(sanitized);
  const hast = (await processor.run(mdast)) as HastRoot;

  return hast;
}
