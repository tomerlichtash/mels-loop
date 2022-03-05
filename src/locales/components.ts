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
export const HOME_PAGE_LOCALE = withMeta(PageKeys.HOME_PAGE);
export const DOCS_PAGE_LOCALE = withMeta(PageKeys.DOCS_PAGE);
export const ABOUT_PAGE_LOCALE = withMeta(PageKeys.ABOUT_PAGE);
export const STORY_PAGE_LOCALE = withMeta(PageKeys.STORY_PAGE);
export const BLOG_PAGE_LOCALE = withMeta(PageKeys.BLOG_PAGE);
export const PREFACE_PAGE_LOCALE = withMeta(PageKeys.PREFACE_PAGE);
export const RESOURCES_PAGE_LOCALE = withMeta(PageKeys.RESOURCES_PAGE);
export const GLOSSARY_PAGE_LOCALE = withMeta(PageKeys.GLOSSARY_PAGE);
export const ERROR_404_PAGE_LOCALE = withMeta(PageKeys.ERROR_404_PAGE);
export const ERROR_GENERAL_LOCALE = withMeta(PageKeys.ERROR_GENERAL);

// Components
export const HEADER_LOCALE = withMeta(CompKeys.HEADER);
export const FOOTER_LOCALE = withMeta(CompKeys.FOOTER);
export const LOCALE_SELECTOR_LOCALE = CompKeys.LOCALE_SELECTOR;
