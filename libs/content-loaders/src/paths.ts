import {
	contentPath,
	localeFileName,
} from '@mels-loop/content-pipeline/loaders';

const md = (locale: string) => localeFileName(locale);

const glossary = (...s: string[]) => contentPath('glossary', ...s);
const pages = (...s: string[]) => contentPath('pages', ...s);
const posts = (...s: string[]) => contentPath('posts', ...s);
const sources = (...s: string[]) => contentPath('sources', ...s);
const stories = (...s: string[]) => contentPath('stories', ...s);

/** Builds dir/item/file path accessors for a story sub-section. */
function storySection(name: string) {
	return {
		dir: (story: string) => stories(story, name),
		item: (story: string, slug: string) => stories(story, name, slug),
		file: (story: string, slug: string, locale: string) =>
			stories(story, name, slug, md(locale)),
	};
}

export const paths = {
	glossary: {
		dir: () => glossary(),
		file: (slug: string, locale: string) => glossary(slug, md(locale)),
	},
	pages: {
		file: (slug: string, locale: string) => pages(slug, md(locale)),
	},
	posts: {
		dir: () => posts(),
		file: (slug: string, locale: string) => posts(slug, md(locale)),
	},
	sources: {
		dir: () => sources(),
		data: (id: string) => sources(id, 'index.json'),
		messages: (id: string, locale: string) =>
			sources(id, `index.${locale}.json`),
	},
	stories: {
		dir: () => stories(),
		config: (slug: string) => stories(slug, 'story.json'),
		file: (slug: string, locale: string) => stories(slug, md(locale)),
		messages: (slug: string, locale: string) =>
			stories(slug, 'messages', `${locale}.json`),
		articles: storySection('articles'),
		documents: storySection('documents'),
		annotations: storySection('annotations'),
		codex: {
			dir: (story: string) => stories(story, 'codex'),
			file: (story: string, locale: string) =>
				stories(story, 'codex', md(locale)),
		},
		resources: {
			file: (story: string, locale: string) =>
				stories(story, 'resources', md(locale)),
		},
	},
};
