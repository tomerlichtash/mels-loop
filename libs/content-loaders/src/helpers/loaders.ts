import {
	buildPlugins,
	fileExists,
	loadMarkdownFile,
	localeFileName,
} from '@mels-loop/content-pipeline/loaders';
import type { ProcessedContent } from '@mels-loop/content-pipeline/types';
import fs from 'fs/promises';
import path from 'path';

import { paths } from '../paths';
import type { ResolvedSource, Source, SourceMessages } from '../types';
import { resolveSource } from './parse';

/**
 * Lists subdirectory names within a content directory.
 */
export async function listSubdirs(dir: string): Promise<string[]> {
	if (!(await fileExists(dir))) return [];
	const entries = await fs.readdir(dir, { withFileTypes: true });
	return entries.filter((e) => e.isDirectory()).map((e) => e.name);
}

/**
 * Loads a single markdown file with default plugins.
 * Returns null if the file does not exist.
 */
export async function loadLocaleFile(
	filePath: string,
): Promise<ProcessedContent | null> {
	if (!(await fileExists(filePath))) return null;
	return loadMarkdownFile(filePath, { plugins: buildPlugins() });
}

/**
 * Loads all locale-specific markdown files from subdirectories.
 * Returns a record keyed by subdirectory name.
 */
export async function loadAllLocaleFiles(
	dir: string,
	locale: string,
): Promise<Record<string, ProcessedContent>> {
	if (!(await fileExists(dir))) return {};

	const entries = await fs.readdir(dir, { withFileTypes: true });
	const dirs = entries.filter((e) => e.isDirectory());

	const result: Record<string, ProcessedContent> = {};
	const plugins = buildPlugins();

	await Promise.all(
		dirs.map(async (d) => {
			const filePath = path.join(dir, d.name, localeFileName(locale));
			if (await fileExists(filePath)) {
				result[d.name] = await loadMarkdownFile(filePath, { plugins });
			}
		}),
	);

	return result;
}

const FALLBACK_LOCALE = 'en';

/**
 * Loads locale-specific messages for a source, falling back to English.
 */
export async function loadSourceMessages(
	id: string,
	locale: string,
): Promise<SourceMessages | null> {
	const localePath = paths.sources.messages(id, locale);
	if (await fileExists(localePath)) {
		const raw = await fs.readFile(localePath, 'utf-8');
		return JSON.parse(raw) as SourceMessages;
	}
	if (locale !== FALLBACK_LOCALE) {
		const fallbackPath = paths.sources.messages(id, FALLBACK_LOCALE);
		if (await fileExists(fallbackPath)) {
			const raw = await fs.readFile(fallbackPath, 'utf-8');
			return JSON.parse(raw) as SourceMessages;
		}
	}
	return null;
}

/**
 * Loads and resolves sources by ID with locale fallback.
 * Returns a record keyed by source ID.
 */
export async function loadResolvedSourcesById(
	ids: string[],
	locale: string,
): Promise<Record<string, ResolvedSource>> {
	if (ids.length === 0) return {};
	const entries = await Promise.all(
		ids.map(async (id) => {
			const basePath = paths.sources.data(id);
			if (!(await fileExists(basePath))) return null;

			const [baseRaw, messages] = await Promise.all([
				fs.readFile(basePath, 'utf-8'),
				loadSourceMessages(id, locale),
			]);

			const source = JSON.parse(baseRaw) as Source;
			const resolved = resolveSource(source, messages ?? { title: id });
			return [id, resolved] as const;
		}),
	);
	return Object.fromEntries(entries.filter((e) => e !== null));
}
