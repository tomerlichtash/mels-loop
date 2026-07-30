import type { Image, Paragraph, Root } from 'mdast';
import { visit } from 'unist-util-visit';

const FIGURE_ATTR_KEYS = new Set([
	'width',
	'height',
	'max-width',
	'max-height',
]);

/**
 * This plugin builds its output as a raw HTML string, so every value taken
 * from the document has to be escaped on the way in.
 *
 * Hebrew uses the double quote as gershayim — ארה"ב, and around nicknames the
 * way English uses inverted commas — so alt text carrying one closed the
 * attribute early and the rest of the caption was reparsed as attribute names.
 * Three words of a caption became three empty attributes, React logged
 * "Invalid attribute name" for each and the alt text was truncated at the
 * quote.
 */
function escapeHtml(value: string): string {
	return value
		.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;')
		.replace(/"/g, '&quot;');
}

function parseFigureAttrs(title: string | null | undefined): string {
	if (!title) return '';
	const attrs: string[] = [];
	for (const pair of title.trim().split(/\s+/)) {
		const eq = pair.indexOf('=');
		if (eq < 0) continue;
		const key = pair.slice(0, eq).toLowerCase();
		if (!FIGURE_ATTR_KEYS.has(key)) continue;
		attrs.push(`data-${key}="${escapeHtml(pair.slice(eq + 1))}"`);
	}
	return attrs.length ? ' ' + attrs.join(' ') : '';
}

/**
 * Promotes paragraphs containing only an image into <figure> + <figcaption>.
 * Indexing is handled separately by rehypeFigureIndex.
 */
export function remarkFigures() {
	return (tree: Root) => {
		visit(tree, 'paragraph', (node: Paragraph, index, parent) => {
			if (!parent || typeof index !== 'number') return;

			// Check if paragraph contains only a single image
			if (node.children.length !== 1 || node.children[0].type !== 'image') {
				return;
			}

			const image = node.children[0] as Image;
			const caption = image.alt || '';

			// Replace paragraph with figure HTML
			const figureHtml = {
				type: 'html' as const,
				value: `<figure${parseFigureAttrs(image.title)}><img src="${escapeHtml(image.url)}" alt="${escapeHtml(image.alt || '')}" />${caption ? `<figcaption>${escapeHtml(caption)}</figcaption>` : ''}</figure>`,
			};

			parent.children[index] = figureHtml;
		});
	};
}
