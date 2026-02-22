import type { Image, Paragraph, Root } from 'mdast';
import { visit } from 'unist-util-visit';

interface FigureOptions {
	auto?: boolean;
	template?: string;
	baseIndex?: number;
}

const FIGURE_ATTR_KEYS = new Set([
	'width',
	'height',
	'max-width',
	'max-height',
]);

function parseFigureAttrs(title: string | null | undefined): string {
	if (!title) return '';
	const attrs: string[] = [];
	for (const pair of title.trim().split(/\s+/)) {
		const eq = pair.indexOf('=');
		if (eq < 0) continue;
		const key = pair.slice(0, eq).toLowerCase();
		if (!FIGURE_ATTR_KEYS.has(key)) continue;
		attrs.push(`data-${key}="${pair.slice(eq + 1)}"`);
	}
	return attrs.length ? ' ' + attrs.join(' ') : '';
}

/**
 * Promotes paragraphs containing only an image into <figure> + <figcaption>.
 * When auto=true, generates captions from the template (e.g., "Fig. %index%").
 */
export function remarkFigures(options: FigureOptions = {}) {
	const { auto = false, template = 'Fig. %index%', baseIndex = 0 } = options;
	let figureIndex = baseIndex;

	return (tree: Root) => {
		figureIndex = baseIndex;

		visit(tree, 'paragraph', (node: Paragraph, index, parent) => {
			if (!parent || typeof index !== 'number') return;

			// Check if paragraph contains only a single image
			if (node.children.length !== 1 || node.children[0].type !== 'image') {
				return;
			}

			const image = node.children[0] as Image;
			figureIndex++;

			const caption = auto
				? template.replace('%index%', String(figureIndex))
				: image.alt || '';

			// Replace paragraph with figure HTML
			const figureHtml = {
				type: 'html' as const,
				value: `<figure data-figure-index="${figureIndex}"${parseFigureAttrs(image.title)}><img src="${image.url}" alt="${image.alt || ''}" />${caption ? `<figcaption>${caption}</figcaption>` : ''}</figure>`,
			};

			parent.children[index] = figureHtml;
		});
	};
}
