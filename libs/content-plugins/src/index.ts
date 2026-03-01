import type {
	PluginBuilder,
	PluginFactory,
} from '@mels-loop/content-pipeline/loaders';
import type { PluginSpec } from '@mels-loop/content-pipeline/markdown';
import remarkDirective from 'remark-directive';

import { rehypeFigureImages } from './rehype/figure-images';
import { rehypeFigureIndex } from './rehype/figure-index';
import { rehypeLines } from './rehype/lines';
import { rehypeSourceImages } from './rehype/source-images';
import { rehypeTableVariants } from './rehype/table-variants';
import { remarkAnnotationLinks } from './remark/annotation-links';
import { remarkBlockquoteDirective } from './remark/blockquote-directive';
import { remarkColsDirective } from './remark/cols-directive';
import { remarkFigureDirective } from './remark/figure-directive';
import { remarkFigures } from './remark/figures';
import { remarkGlossaryLinks } from './remark/glossary-links';
import { remarkSourceLinks } from './remark/source-links';
import { remarkSourceVars } from './remark/source-vars';
import { remarkStripComments } from './remark/strip-comments';
import { remarkTableDirective } from './remark/table-directive';
import { remarkVerse } from './remark/verse';

/**
 * Creates the full content plugin configuration for Mel's Loop.
 *
 * Plugin ordering:
 *   Remark: strip-comments → source-vars → link-detection → figures →
 *           directives (blockquote, cols, figure, table) → verse
 *   Rehype: table-variants → figure-images → source-images →
 *           figure-index → lines
 */
export const createContentPlugins: PluginBuilder = (context) => {
	const { sources, figures: overrideFigures } = context ?? {};

	const factory: PluginFactory = (metadata) => {
		const figureConfig = overrideFigures ?? metadata.figures;

		const remarkPlugins: PluginSpec[] = [
			[remarkStripComments],
			...(sources ? [[remarkSourceVars, { sources }] as PluginSpec] : []),
			[remarkAnnotationLinks],
			[remarkGlossaryLinks],
			[remarkSourceLinks],
			[remarkFigures],
			[remarkDirective],
			[remarkBlockquoteDirective],
			[remarkColsDirective],
			[remarkFigureDirective],
			[remarkTableDirective],
			[remarkVerse, { parseMode: metadata.parse_mode }],
		];

		const rehypePlugins: PluginSpec[] = [
			[rehypeTableVariants],
			[rehypeFigureImages],
			...(sources ? [[rehypeSourceImages, { sources }] as PluginSpec] : []),
			[
				rehypeFigureIndex,
				{
					auto: figureConfig?.auto,
					template: figureConfig?.template,
					baseIndex: figureConfig?.base_index ?? 0,
				},
			],
			[rehypeLines],
		];

		return { remarkPlugins, rehypePlugins };
	};

	return factory;
};
