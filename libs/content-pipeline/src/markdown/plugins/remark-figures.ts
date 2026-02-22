import type { Image, Paragraph, Root } from 'mdast';
import { visit } from 'unist-util-visit';

interface FigureOptions {
	auto?: boolean;
	template?: string;
	baseIndex?: number;
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
				value: `<figure data-figure-index="${figureIndex}"><img src="${image.url}" alt="${image.alt || ''}" />${caption ? `<figcaption>${caption}</figcaption>` : ''}</figure>`,
			};

			parent.children[index] = figureHtml;
		});
	};
}
