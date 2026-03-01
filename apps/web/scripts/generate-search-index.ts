#!/usr/bin/env tsx
/**
 * Builds per-locale Orama search indexes and writes them to apps/web/public/.
 * Run: pnpm search-index (from apps/web) or pnpm --filter @mels-loop/web search-index
 */
import { i18nConfig, type Locale } from '../src/i18n-init';

// Ensure i18n config is initialized (side-effect import)
void i18nConfig;

import { createHash } from 'node:crypto';

import {
	getAllGlossaryTerms,
	getAllPosts,
	getAllResolvedSources,
	getAllStories,
	getPage,
	getPost,
	getStoryArticle,
	getStoryArticles,
	getStoryConfig,
} from '@mels-loop/content/loaders';
import { setContentDir } from '@mels-loop/content-pipeline/loaders';
import { getLocales } from '@mels-loop/i18n/config';
import { create, insertMultiple, save } from '@orama/orama';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUTPUT_DIR = path.resolve(__dirname, '../public');
const CONTENT_DIR = path.resolve(__dirname, '../../../content');

setContentDir(CONTENT_DIR);

function wrapWithVersion(raw: ReturnType<typeof save>) {
	const json = JSON.stringify(raw);
	const version = createHash('sha256').update(json).digest('hex').slice(0, 16);
	return { version, data: raw };
}

const schema = {
	type: 'string' as const,
	subtype: 'string' as const,
	slug: 'string' as const,
	url: 'string' as const,
	title: 'string' as const,
	body: 'string' as const,
	locale: 'string' as const,
};

type SearchDoc = {
	type: string;
	subtype: string;
	slug: string;
	url: string;
	title: string;
	body: string;
	locale: string;
};

const STATIC_PAGES = ['about', 'contact', 'contribute'];

type SourceLookup = Map<string, Record<string, string | undefined>>;

/** Resolve {{sources/id:field}} templates using pre-loaded source data. */
function resolveSourceTemplates(text: string, sources: SourceLookup): string {
	return text.replace(
		/\{\{sources?\/([^:}]+):([^}]+)\}\}/g,
		(_match, id: string, field: string) => {
			const src = sources.get(id);
			return src?.[field] ?? '';
		},
	);
}

/**
 * Extract indexable plain text from raw markdown.
 * - Resolves {{sources/id:field}} templates to actual source text
 * - Extracts <figcaption> text content (with resolved templates)
 * - Strips <figure>, <table>, <blockQuote>, <img>, <cite> and other HTML elements
 * - Strips :::cols / :::col / ::::cols directives
 * - Strips markdown images ![alt](url)
 * - Strips HTML comments and /// editorial comments
 * - Strips remaining markdown syntax
 */
function extractIndexableText(raw: string, sources: SourceLookup): string {
	let text = raw;

	// Remove frontmatter
	text = text.replace(/^---[\s\S]*?---\n?/, '');

	// Remove HTML comments
	text = text.replace(/<!--[\s\S]*?-->/g, '');

	// Remove /// editorial comments
	text = text.replace(/^\/\/\/.*$/gm, '');

	// Resolve source templates before stripping HTML
	text = resolveSourceTemplates(text, sources);

	// Extract <figcaption> content before removing <figure> blocks
	const figcaptions: string[] = [];
	text.replace(/<figcaption[^>]*>([\s\S]*?)<\/figcaption>/gi, (_m, inner) => {
		// Strip any remaining HTML tags inside figcaption
		const clean = (inner as string).replace(/<[^>]+>/g, '').trim();
		if (clean && !clean.startsWith('Fig.') && !clean.startsWith('%index%')) {
			figcaptions.push(clean);
		}
		return '';
	});

	// Remove entire <figure>...</figure> blocks (including tables, images inside)
	text = text.replace(/<figure[^>]*>[\s\S]*?<\/figure>/gi, '');

	// Remove remaining <table>...</table> blocks
	text = text.replace(/<table[^>]*>[\s\S]*?<\/table>/gi, '');

	// Remove <blockQuote>...</blockQuote> but keep inner text
	text = text.replace(/<blockQuote[^>]*>([\s\S]*?)<\/blockQuote>/gi, '$1');

	// Remove <cite> tags but keep inner text
	text = text.replace(/<\/?cite>/gi, '');

	// Remove any remaining HTML tags
	text = text.replace(/<[^>]+>/g, '');

	// Remove :::cols / :::col / ::::cols directives (opening and closing)
	text = text.replace(/^:{2,4}(?:cols?|col)\b[^\n]*/gm, '');
	text = text.replace(/^:{2,4}\s*$/gm, '');

	// Remove markdown images ![alt](url)
	text = text.replace(/!\[[^\]]*\]\([^)]*\)/g, '');

	// Remove markdown links but keep link text: [text](url) → text
	text = text.replace(/\[([^\]]*)\]\([^)]*\)/g, '$1');

	// Remove markdown heading markers
	text = text.replace(/^#{1,6}\s+/gm, '');

	// Remove markdown emphasis/bold/code markers
	text = text.replace(/[*_`~]/g, '');

	// Remove markdown blockquote markers
	text = text.replace(/^>\s?/gm, '');

	// Remove markdown horizontal rules
	text = text.replace(/^[-*_]{3,}\s*$/gm, '');

	// Collapse whitespace
	text = text
		.replace(/\n+/g, ' ')
		.replace(/\s{2,}/g, ' ')
		.trim();

	// Append figcaption content
	if (figcaptions.length > 0) {
		text = text + ' ' + figcaptions.join(' ');
	}

	return text;
}

async function collectDocs(locale: Locale): Promise<SearchDoc[]> {
	const docs: SearchDoc[] = [];

	// Pre-load all resolved sources for template resolution
	const allSources = await getAllResolvedSources(locale);
	const sourceLookup: SourceLookup = new Map();
	for (const src of allSources) {
		sourceLookup.set(src.id, {
			title: src.title,
			description: src.description,
			author: src.author,
			date: src.date,
			credit: src.credit,
			url: src.url,
			type: src.type,
		});
	}

	// Stories
	const stories = await getAllStories();
	for (const storySlug of stories) {
		const config = await getStoryConfig(storySlug);
		if (config.title[locale]) {
			docs.push({
				type: 'story',
				subtype: '',
				slug: storySlug,
				url: `/stories/${storySlug}`,
				title: config.title[locale],
				body: config.abstract?.[locale] ?? '',
				locale,
			});
		}

		// Articles within story
		const articles = await getStoryArticles(storySlug);
		for (const articleSlug of articles) {
			const article = await getStoryArticle(storySlug, articleSlug, locale);
			if (article) {
				docs.push({
					type: 'article',
					subtype: '',
					slug: articleSlug,
					url: `/stories/${storySlug}/articles/${articleSlug}`,
					title: (article.metadata.title as string) ?? articleSlug,
					body: extractIndexableText(article.raw, sourceLookup),
					locale,
				});
			}
		}
	}

	// Glossary
	const glossary = await getAllGlossaryTerms(locale);
	for (const [key, entry] of Object.entries(glossary)) {
		const glossaryKey = (entry.metadata.glossary_key as string) ?? key;
		const body = extractIndexableText(entry.raw, sourceLookup);
		// Format key as readable title: ASSEMBLY_LANGUAGE → Assembly Language
		const title = glossaryKey
			.split('_')
			.map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
			.join(' ');

		docs.push({
			type: 'glossary',
			subtype: '',
			slug: key,
			url: `/glossary#${key}`,
			title,
			body,
			locale,
		});
	}

	// Posts
	const postSlugs = await getAllPosts();
	for (const slug of postSlugs) {
		const post = await getPost(slug, locale);
		if (post) {
			docs.push({
				type: 'post',
				subtype: '',
				slug,
				url: `/blog/${slug}`,
				title: (post.metadata.title as string) ?? slug,
				body: extractIndexableText(post.raw, sourceLookup),
				locale,
			});
		}
	}

	// Pages
	for (const slug of STATIC_PAGES) {
		const page = await getPage(slug, locale);
		if (page) {
			docs.push({
				type: 'page',
				subtype: '',
				slug,
				url: `/${slug}`,
				title: (page.metadata.title as string) ?? slug,
				body: extractIndexableText(page.raw, sourceLookup),
				locale,
			});
		}
	}

	// Sources
	for (const src of allSources) {
		docs.push({
			type: 'source',
			subtype: src.type ?? '',
			slug: src.id,
			url: `/sources#${src.id}`,
			title: src.title,
			body: [src.description, src.author, ...(src.tags ?? [])]
				.filter(Boolean)
				.join(' '),
			locale,
		});
	}

	return docs;
}

// Hebrew tokenizer using Intl.Segmenter
function createHebrewTokenizer() {
	const segmenter = new Intl.Segmenter('he', { granularity: 'word' });
	return {
		language: 'hebrew',
		normalizationCache: new Map<string, string>(),
		tokenize(input: string) {
			const segments = segmenter.segment(input);
			const tokens: string[] = [];
			for (const seg of segments) {
				if (seg.isWordLike) {
					tokens.push(seg.segment.toLowerCase());
				}
			}
			return tokens;
		},
	};
}

for (const locale of getLocales() as Locale[]) {
	const docs = await collectDocs(locale);
	await fs.mkdir(OUTPUT_DIR, { recursive: true });

	const langOpts =
		locale === 'he'
			? { components: { tokenizer: createHebrewTokenizer() } }
			: { language: 'english' as const };

	// Light index — same docs but with empty body (metadata only)
	const lightDocs = docs.map((d) => ({ ...d, body: '' }));
	const lightDb = create({ schema, ...langOpts });
	insertMultiple(lightDb, lightDocs);
	const lightRaw = save(lightDb);
	const lightPath = path.join(OUTPUT_DIR, `search-index.${locale}.light.json`);
	await fs.writeFile(
		lightPath,
		JSON.stringify(wrapWithVersion(lightRaw)),
		'utf-8',
	);

	// Full index — includes body text for deep search
	const fullDb = create({ schema, ...langOpts });
	insertMultiple(fullDb, docs);
	const fullRaw = save(fullDb);
	const fullPath = path.join(OUTPUT_DIR, `search-index.${locale}.full.json`);
	await fs.writeFile(
		fullPath,
		JSON.stringify(wrapWithVersion(fullRaw)),
		'utf-8',
	);

	console.log(
		`[${locale}] Indexed ${docs.length} documents → light: ${lightPath}, full: ${fullPath}`,
	);
}
