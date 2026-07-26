import { mediaBaseUrl as buildMediaBaseUrl } from '@mels-loop/content-loaders/loaders';
import type { ResolvedSource } from '@mels-loop/content-loaders/types';
import type {
	PluginBuilder,
	PluginFactory,
} from '@mels-loop/content-pipeline/loaders';
import type { PluginSpec } from '@mels-loop/content-pipeline/markdown';
import remarkDirective from 'remark-directive';

import { rehypeFigureImages } from './rehype/figure-images';
import { rehypeFigureIndex } from './rehype/figure-index';
import { rehypeLines } from './rehype/lines';
import { rehypeMediaBaseUrl } from './rehype/media-base-url';
import { rehypeSourceImages } from './rehype/source-images';
import { rehypeTableVariants } from './rehype/table-variants';
import { remarkAnnotationLinks } from './remark/annotation-links';
import { remarkBlockquoteDirective } from './remark/blockquote-directive';
import { remarkChatDirective } from './remark/chat-directive';
import { remarkColsDirective } from './remark/cols-directive';
import { remarkEmailDirective } from './remark/email-directive';
import { remarkFigureDirective } from './remark/figure-directive';
import { remarkFigures } from './remark/figures';
import { remarkGlossaryLinks } from './remark/glossary-links';
import { remarkSourceLinks } from './remark/source-links';
import { interpolateSourceVars, remarkSourceVars } from './remark/source-vars';
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
	const mediaBaseUrl = buildMediaBaseUrl();

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
			[remarkChatDirective],
			[remarkColsDirective],
			[remarkEmailDirective],
			[remarkFigureDirective],
			[remarkTableDirective],
			[remarkVerse, { parseMode: metadata.parse_mode }],
		];

		const rehypePlugins: PluginSpec[] = [
			[rehypeTableVariants],
			[rehypeFigureImages],
			...(sources ? [[rehypeSourceImages, { sources }] as PluginSpec] : []),
			...(mediaBaseUrl
				? [[rehypeMediaBaseUrl, { baseUrl: mediaBaseUrl }] as PluginSpec]
				: []),
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

		/*
		 * Source expressions are expanded before parsing, not by a plugin: the
		 * directive syntax extension destroys them during the parse itself.
		 */
		const preprocess = sources
			? [
					(raw: string) =>
						/*
						 * The context types sources loosely. The plugin path never
						 * surfaced that because plugin options are untyped, so the cast
						 * lands here, at the one place the value is used directly.
						 */
						interpolateSourceVars(
							raw,
							sources as Record<string, ResolvedSource>,
						),
				]
			: undefined;

		return { remarkPlugins, rehypePlugins, ...(preprocess && { preprocess }) };
	};

	return factory;
};
