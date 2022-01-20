export const defaultLocale = "en-US";

export const dateFormats = {
	en: "LLLL d, yyyy",
	he: "dd/MM/yy",
};

export enum CONTENT_TYPES {
	CODEX = "codex",
	POSTS = "posts",
	TESTS = "tests",
	DOCS = "docs",
	GLOSSARY = "glossary",
}

export const SITE_PAGES = {
	HOME: {
		pathname: "/",
		pageId: "home",
	},
	ABOUT: {
		pathname: "/about",
		pageId: "about",
	},
	STORY: {
		pathname: "/story",
		pageId: "story",
	},
};

export const LOCALE_LABELS = {
	en: "English",
	he: "עברית",
};
