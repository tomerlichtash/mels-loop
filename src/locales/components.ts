import { ComponentKeyMap } from "./types";

export const SITE_META: ComponentKeyMap = {
	siteTitle: "SITE_TITLE",
	siteSubtitle: "SITE_SUBTITLE",
};

const PageKeys: Record<string, ComponentKeyMap> = {
	HOME_PAGE: {
		pageName: "HOME_NAV_LABEL",
	},
	DOCS_PAGE: {
		pageName: "DOCS_NAV_LABEL",
	},
	ABOUT_PAGE: {
		pageName: "ABOUT_NAV_LABEL",
	},
	STORY_PAGE: {
		pageName: "STORY_NAV_LABEL",
	},
	PREFACE_PAGE: {
		pageName: "PREFACE_NAV_LABEL",
	},
	BLOG_PAGE: {
		pageName: "BLOG_NAV_LABEL",
		postsList: "BLOG_POSTS_LIST",
	},
	RESOURCES_PAGE: {
		pageName: "RESOURCES_NAV_LABEL",
	},
	GLOSSARY_PAGE: {
		pageName: "GLOSSARY_NAV_LABEL",
	},
	ERROR_404_PAGE: {
		pageName: "ERROR_404_FILE_NOT_FOUND",
	},
	ERROR_GENERAL: {
		pageName: "ERROR_GENERAL",
	},
};

const CompKeys: Record<string, ComponentKeyMap> = {
	HEADER: {},
	FOOTER: {
		siteLicense: "FOOTER_LICENSE",
	},
	LOCALE_SELECTOR: {
		languageLabel: "LOCALE_SELECTOR_LANGUAGE_LABEL",
	},
};

const withMeta = (keys: Record<string, string>) =>
	Object.assign(keys, SITE_META);

// Pages
const PAGES_KEYS = {
	HOME_PAGE_LOCALE: withMeta(PageKeys.HOME_PAGE),
	DOCS_PAGE_LOCALE: withMeta(PageKeys.DOCS_PAGE),
	ABOUT_PAGE_LOCALE: withMeta(PageKeys.ABOUT_PAGE),
	STORY_PAGE_LOCALE: withMeta(PageKeys.STORY_PAGE),
	BLOG_PAGE_LOCALE: withMeta(PageKeys.BLOG_PAGE),
	PREFACE_PAGE_LOCALE: withMeta(PageKeys.PREFACE_PAGE),
	RESOURCES_PAGE_LOCALE: withMeta(PageKeys.RESOURCES_PAGE),
	GLOSSARY_PAGE_LOCALE: withMeta(PageKeys.GLOSSARY_PAGE),
	ERROR_404_PAGE_LOCALE: withMeta(PageKeys.ERROR_404_PAGE),
	ERROR_GENERAL_LOCALE: withMeta(PageKeys.ERROR_GENERAL),
};
// Components
export const HEADER_LOCALE = withMeta(CompKeys.HEADER);
export const FOOTER_LOCALE = withMeta(CompKeys.FOOTER);
export const LOCALE_SELECTOR_LOCALE = CompKeys.LOCALE_SELECTOR;

export default {
	HOME_PAGE_LOCALE: PageKeys.HOME_PAGE,
	DOCS_PAGE_LOCALE: PageKeys.DOCS_PAGE,
	ABOUT_PAGE_LOCALE: PageKeys.ABOUT_PAGE,
	STORY_PAGE_LOCALE: PageKeys.STORY_PAGE,
	BLOG_PAGE_LOCALE: PageKeys.BLOG_PAGE,
	PREFACE_PAGE_LOCALE: PageKeys.PREFACE_PAGE,
	RESOURCES_PAGE_LOCALE: PageKeys.RESOURCES_PAGE,
	GLOSSARY_PAGE_LOCALE: PageKeys.GLOSSARY_PAGE,
	ERROR_404_PAGE_LOCALE: PageKeys.ERROR_404_PAGE,
	ERROR_GENERAL_LOCALE: PageKeys.ERROR_GENERAL,
};
