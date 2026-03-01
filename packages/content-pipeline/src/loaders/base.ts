import fs from 'fs/promises';
import matter from 'gray-matter';
import path from 'path';

import { processMarkdown } from '../markdown/pipeline';
import type { MarkdownProcessOptions } from '../markdown/types';
import type { ContentMetadata, FigureConfig, ProcessedContent } from '../types';

export type PluginFactory = (
	metadata: ContentMetadata,
) => MarkdownProcessOptions;

export interface PluginBuilderContext {
	sources?: Record<string, unknown>;
	figures?: FigureConfig;
}

/**
 * A function that creates a PluginFactory given optional context.
 * Set by the consumer via `setPluginBuilder()` to provide all custom
 * remark/rehype plugins for content processing.
 */
export type PluginBuilder = (context?: PluginBuilderContext) => PluginFactory;

const ENV_KEY = 'CONTENT_PIPELINE_DIR';
let _pluginBuilder: PluginBuilder | null = null;

export function setContentDir(dir: string): void {
	process.env[ENV_KEY] = dir;
}

export function getContentDir(): string {
	const dir = process.env[ENV_KEY];
	if (!dir) {
		throw new Error(
			'Content directory not set. Call setContentDir() before using loaders.',
		);
	}
	return dir;
}

/**
 * Registers a plugin builder that loaders use to get content plugins.
 * Call this at app initialization alongside `setContentDir()`.
 */
export function setPluginBuilder(builder: PluginBuilder): void {
	_pluginBuilder = builder;
}

/**
 * Returns a PluginFactory from the registered builder, or undefined if none set.
 */
export function buildPlugins(
	context?: PluginBuilderContext,
): PluginFactory | undefined {
	return _pluginBuilder?.(context);
}

export async function fileExists(filePath: string): Promise<boolean> {
	try {
		await fs.access(filePath);
		return true;
	} catch {
		return false;
	}
}

export async function loadMarkdownFile(
	filePath: string,
	options?: {
		plugins?: MarkdownProcessOptions | PluginFactory;
	},
): Promise<ProcessedContent> {
	const raw = await fs.readFile(filePath, 'utf-8');
	const { data, content } = matter(raw);
	const metadata = data as ContentMetadata;

	const pluginConfig =
		typeof options?.plugins === 'function'
			? options.plugins(metadata)
			: options?.plugins;

	const hast = await processMarkdown(content, pluginConfig);

	return { metadata, hast, raw: content };
}

export function contentPath(...segments: string[]): string {
	return path.join(getContentDir(), ...segments);
}

export function localeFileName(locale: string): string {
	return `index.${locale}.md`;
}
