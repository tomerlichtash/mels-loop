/**
 * Ref-integrity check over the real content tree.
 *
 * Zod validates shape at the loader boundary; this suite validates that
 * references resolve: every source id cited anywhere points at a record
 * that exists, each record's id matches its directory name, and every
 * record has English messages. Runs in the normal test job, so a typo'd
 * id fails CI before it 404s.
 */
import fs from 'fs/promises';
import matter from 'gray-matter';
import path from 'path';
import url from 'url';
import { beforeAll, describe, expect, it } from 'vitest';

import { parseEntity, parseSource } from '../src/schema';

const here = path.dirname(url.fileURLToPath(import.meta.url));
const contentDir = path.resolve(here, '../../../content');
const sourcesDir = path.join(contentDir, 'sources');
const entitiesDir = path.join(contentDir, 'entities');
const storiesDir = path.join(contentDir, 'stories');

const SOURCE_REF_PREFIX = 'source:';

async function subdirs(dir: string): Promise<string[]> {
	try {
		const entries = await fs.readdir(dir, { withFileTypes: true });
		return entries.filter((e) => e.isDirectory()).map((e) => e.name);
	} catch {
		return [];
	}
}

async function readJson(filePath: string): Promise<unknown> {
	return JSON.parse(await fs.readFile(filePath, 'utf-8'));
}

/** Collects `sources:` frontmatter ids from every .md file under a story. */
async function frontmatterSourceIds(
	storyDir: string,
): Promise<Map<string, string[]>> {
	const found = new Map<string, string[]>();
	async function walk(dir: string): Promise<void> {
		const entries = await fs.readdir(dir, { withFileTypes: true });
		await Promise.all(
			entries.map(async (e) => {
				const full = path.join(dir, e.name);
				if (e.isDirectory()) return walk(full);
				if (!e.name.endsWith('.md')) return;
				const { data } = matter(await fs.readFile(full, 'utf-8'));
				if (Array.isArray(data.sources)) {
					found.set(path.relative(contentDir, full), data.sources as string[]);
				}
			}),
		);
	}
	await walk(storyDir);
	return found;
}

let sourceIds: Set<string>;

beforeAll(async () => {
	sourceIds = new Set(await subdirs(sourcesDir));
});

describe('source records', () => {
	it('every record is valid, id matches its directory, and has English messages', async () => {
		for (const dir of await subdirs(sourcesDir)) {
			const dataPath = path.join(sourcesDir, dir, 'index.json');
			const source = parseSource(await readJson(dataPath), dataPath);
			expect(source.id, `id vs directory in ${dataPath}`).toBe(dir);
			await expect(
				fs.access(path.join(sourcesDir, dir, 'index.en.json')),
				`missing index.en.json for ${dir}`,
			).resolves.toBeUndefined();
		}
	});

	it('a record with a presentation image points it at an actual image', async () => {
		for (const dir of await subdirs(sourcesDir)) {
			const dataPath = path.join(sourcesDir, dir, 'index.json');
			const source = parseSource(await readJson(dataPath), dataPath);
			if (source.image) {
				expect(
					/\.(jpe?g|png|webp|gif|avif)$/i.test(source.image),
					`${dir}: image "${source.image}" is not an image URL`,
				).toBe(true);
			}
		}
	});

	it('a transcription is claimed by at most one record', async () => {
		/* Two records claiming the same page would serve the same content
		 * under two canonical records — the duplication the blackjack merge
		 * existed to end. The claiming record's page embeds the transcript
		 * and the document route redirects to it; that only works when the
		 * claim is unique. */
		const claims = new Map<string, string>();
		for (const dir of await subdirs(sourcesDir)) {
			const dataPath = path.join(sourcesDir, dir, 'index.json');
			const source = parseSource(await readJson(dataPath), dataPath);
			if (!source.page) continue;
			const holder = claims.get(source.page);
			expect(
				holder,
				`"${source.page}" claimed by both ${holder} and ${dir}`,
			).toBeUndefined();
			claims.set(source.page, dir);
		}
	});

	it("every record's page ref resolves to real content", async () => {
		for (const dir of await subdirs(sourcesDir)) {
			const dataPath = path.join(sourcesDir, dir, 'index.json');
			const source = parseSource(await readJson(dataPath), dataPath);
			if (!source.page) continue;
			const match = /^\/stories\/([^/]+)\/documents\/([^/]+)$/.exec(
				source.page,
			);
			expect(match, `${dir}: unrecognised page ref "${source.page}"`).not.toBe(
				null,
			);
			if (match) {
				await expect(
					fs.access(path.join(storiesDir, match[1], 'documents', match[2])),
					`${dir}: page ref "${source.page}" has no content directory`,
				).resolves.toBeUndefined();
			}
		}
	});
});

describe('entities', () => {
	it('every entity is valid, id matches its directory, and has English messages', async () => {
		for (const dir of await subdirs(entitiesDir)) {
			const dataPath = path.join(entitiesDir, dir, 'index.json');
			const entity = parseEntity(await readJson(dataPath), dataPath);
			expect(entity.id, `id vs directory in ${dataPath}`).toBe(dir);
			await expect(
				fs.access(path.join(entitiesDir, dir, 'index.en.json')),
				`missing index.en.json for ${dir}`,
			).resolves.toBeUndefined();
		}
	});

	it('every authored entity door resolves — entity: links and mentions:', async () => {
		const entityIds = new Set(await subdirs(entitiesDir));
		for (const slug of await subdirs(storiesDir)) {
			async function walk(dir: string): Promise<void> {
				const dirents = await fs.readdir(dir, { withFileTypes: true });
				await Promise.all(
					dirents.map(async (e) => {
						const full = path.join(dir, e.name);
						if (e.isDirectory()) return walk(full);
						if (!e.name.endsWith('.md')) return;
						const raw = await fs.readFile(full, 'utf-8');
						for (const match of raw.matchAll(/\]\(entity:([\w-]+)\)/g)) {
							expect(
								entityIds.has(match[1]),
								`${path.relative(contentDir, full)}: entity ref "${match[1]}" resolves to nothing`,
							).toBe(true);
						}
						const { data } = matter(raw);
						for (const id of (data.mentions as string[] | undefined) ?? []) {
							expect(
								entityIds.has(id),
								`${path.relative(contentDir, full)}: mention "${id}" resolves to nothing`,
							).toBe(true);
						}
					}),
				);
			}
			await walk(path.join(storiesDir, slug));
		}
	});

	it('every entity ref resolves — cited sources, portrait, related edges', async () => {
		const entityIds = new Set(await subdirs(entitiesDir));
		for (const dir of await subdirs(entitiesDir)) {
			const dataPath = path.join(entitiesDir, dir, 'index.json');
			const entity = parseEntity(await readJson(dataPath), dataPath);
			for (const id of entity.sources) {
				expect(sourceIds.has(id), `${dir}: unknown source "${id}"`).toBe(true);
			}
			if (entity.portrait) {
				expect(
					sourceIds.has(entity.portrait),
					`${dir}: portrait refs unknown source "${entity.portrait}"`,
				).toBe(true);
				expect(
					entity.sources.includes(entity.portrait),
					`${dir}: portrait "${entity.portrait}" is not among its cited sources`,
				).toBe(true);
			}
			for (const edge of entity.related ?? []) {
				expect(
					entityIds.has(edge.ref),
					`${dir}: related refs unknown entity "${edge.ref}"`,
				).toBe(true);
			}
		}
	});
});

describe('story citations', () => {
	it('every cited source id resolves to a record', async () => {
		for (const slug of await subdirs(storiesDir)) {
			const config = (await readJson(
				path.join(storiesDir, slug, 'story.json'),
			)) as {
				sources?: string[];
				featuredSources?: string[];
				assets?: Record<string, unknown>;
				entities?: { ref: string; role: string; as?: string }[];
			};

			const entityIds = new Set(await subdirs(entitiesDir));
			const storyMessages = (await readJson(
				path.join(storiesDir, slug, 'messages', 'en.json'),
			)) as Record<string, unknown>;
			for (const edge of config.entities ?? []) {
				expect(
					entityIds.has(edge.ref),
					`${slug}: involvement edge refs unknown entity "${edge.ref}"`,
				).toBe(true);
				if (edge.as) {
					/* The alias is a message key — dangling keys render as raw
					 * key text in the aside. */
					const resolved = edge.as
						.split('.')
						.reduce<unknown>(
							(acc, part) =>
								acc && typeof acc === 'object'
									? (acc as Record<string, unknown>)[part]
									: undefined,
							storyMessages,
						);
					expect(
						typeof resolved,
						`${slug}: alias key "${edge.as}" missing from story messages`,
					).toBe('string');
				}
			}

			for (const id of config.sources ?? []) {
				expect(sourceIds.has(id), `${slug}: unknown source "${id}"`).toBe(true);
			}
			for (const id of config.featuredSources ?? []) {
				expect(
					config.sources?.includes(id),
					`${slug}: featured source "${id}" not in sources`,
				).toBe(true);
			}

			for (const [key, value] of Object.entries(config.assets ?? {})) {
				if (typeof value !== 'string') continue;
				if (!value.startsWith(SOURCE_REF_PREFIX)) continue;
				const id = value.slice(SOURCE_REF_PREFIX.length);
				expect(
					sourceIds.has(id),
					`${slug}: asset "${key}" refs unknown source "${id}"`,
				).toBe(true);
			}

			const frontmatter = await frontmatterSourceIds(
				path.join(storiesDir, slug),
			);
			for (const [file, ids] of frontmatter) {
				for (const id of ids) {
					expect(sourceIds.has(id), `${file}: unknown source "${id}"`).toBe(
						true,
					);
				}
			}
		}
	});
});
