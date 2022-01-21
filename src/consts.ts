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

export const sitePagesOptions = [
	{ label: "HOME_NAV_LABEL", id: "home", targetPathname: "/" },
	{ label: "ABOUT_NAV_LABEL", id: "about", targetPathname: "/about" },
	{ label: "STORY_NAV_LABEL", id: "story", targetPathname: "/story" },
];

// export const LOCALE_SELECTOR_LOCALE = {
// 	TITLE: {
// 		en: "Choose Language",
// 		he: "בחירת שפה",
// 	},
// };

// export const HEADER_LOCALE = {
// 	SITE_NAME: {
// 		en: "Mel's Loop",
// 		he: "לולאת מל",
// 	},
// 	SITE_SUBTITLE: {
// 		en: "A Comprehensive Guide to The Story of Mel",
// 		he: "המדריך המלא לסיפור על מל",
// 	},
// };

// export const SITE_PAGES = {
// 	HOME: {
// 		pathname: "/",
// 		pageId: "home",
// 	},
// 	ABOUT: {
// 		pathname: "/about",
// 		pageId: "about",
// 	},
// 	STORY: {
// 		pathname: "/story",
// 		pageId: "story",
// 	},
// };

// export const LOCALE_LABELS = {
// 	en: "English",
// 	he: "עברית",
// };
