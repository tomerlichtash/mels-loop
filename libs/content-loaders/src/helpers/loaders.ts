import {
	buildPlugins,
	fileExists,
	loadMarkdownFile,
	localeFileName,
} from '@mels-loop/content-pipeline/loaders';
import type { ProcessedContent } from '@mels-loop/content-pipeline/types';
import fs from 'fs/promises';
import matter from 'gray-matter';
import path from 'path';

import { paths } from '../paths';
import { parseSource } from '../schema';
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
 * Reads and parses a JSON file. Returns null if the file does not exist.
 */
export async function loadJsonFile<T>(filePath: string): Promise<T | null> {
	if (!(await fileExists(filePath))) return null;
	const raw = await fs.readFile(filePath, 'utf-8');
	return JSON.parse(raw) as T;
}

/**
 * Loads and validates a source record. Returns null if the file does not
 * exist; throws (failing the build) if it exists but is invalid.
 */
export async function loadSourceData(id: string): Promise<Source | null> {
	const filePath = paths.sources.data(id);
	const raw = await loadJsonFile<unknown>(filePath);
	if (raw === null) return null;
	return parseSource(raw, filePath);
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
	const plugins = buildPlugins();

	const results = await Promise.all(
		dirs.map(async (d) => {
			const filePath = path.join(dir, d.name, localeFileName(locale));
			if (!(await fileExists(filePath))) return null;
			const content = await loadMarkdownFile(filePath, { plugins });
			return [d.name, content] as const;
		}),
	);

	return Object.fromEntries(results.filter((r) => r !== null));
}

const FALLBACK_LOCALE = 'en';

/**
 * Loads locale-specific messages for a source, falling back to English.
 */
export async function loadSourceMessages(
	id: string,
	locale: string,
): Promise<SourceMessages | null> {
	const result = await loadJsonFile<SourceMessages>(
		paths.sources.messages(id, locale),
	);
	if (result) return result;
	if (locale !== FALLBACK_LOCALE) {
		return loadJsonFile<SourceMessages>(
			paths.sources.messages(id, FALLBACK_LOCALE),
		);
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
			const [source, messages] = await Promise.all([
				loadSourceData(id),
				loadSourceMessages(id, locale),
			]);
			if (!source) return null;
			const resolved = resolveSource(source, messages ?? { title: id });
			return [id, resolved] as const;
		}),
	);
	return Object.fromEntries(entries.filter((e) => e !== null));
}

/**
 * Collects source IDs from frontmatter "sources" fields in all .md files
 * within a directory.
 */
export async function collectSourceIdsFromDir(dir: string): Promise<string[]> {
	try {
		const entries = await fs.readdir(dir, { withFileTypes: true });
		const mdFiles = entries.filter((e) => e.isFile() && e.name.endsWith('.md'));
		const ids: string[] = [];
		await Promise.all(
			mdFiles.map(async (f) => {
				try {
					const raw = await fs.readFile(path.join(dir, f.name), 'utf-8');
					const { data } = matter(raw);
					const sources = data.sources as string[] | undefined;
					if (Array.isArray(sources)) ids.push(...sources);
				} catch {
					// ignore unreadable files
				}
			}),
		);
		return ids;
	} catch {
		return [];
	}
}
