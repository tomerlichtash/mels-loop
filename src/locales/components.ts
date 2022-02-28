import { ComponentKeyMap } from "./types";

export const SITE_META: ComponentKeyMap = {
	siteTitle: "SITE_TITLE",
	siteSubtitle: "SITE_SUBTITLE",
};

const CompKeys: Record<string, ComponentKeyMap> = {
	HOME_PAGE: {
		pageName: "HOME_NAV_LABEL",
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
	HEADER: {
		siteTitle: "SITE_TITLE",
		siteSubtitle: "SITE_SUBTITLE",
	},
	FOOTER: {
		siteTitle: "SITE_TITLE",
		siteLicense: "FOOTER_LICENSE",
	},
	LOCALE_SELECTOR: {
		languageLabel: "LOCALE_SELECTOR_LANGUAGE_LABEL",
	},
};

const withMeta = (keys: Record<string, string>) =>
	Object.assign(keys, SITE_META);

export const HOME_PAGE_LOCALE = withMeta(CompKeys.HOME_PAGE);
export const ABOUT_PAGE_LOCALE = withMeta(CompKeys.ABOUT_PAGE);
export const STORY_PAGE_LOCALE = withMeta(CompKeys.STORY_PAGE);
export const BLOG_PAGE_LOCALE = withMeta(CompKeys.BLOG_PAGE);
export const PREFACE_PAGE_LOCALE = withMeta(CompKeys.PREFACE_PAGE);
export const RESOURCES_PAGE_LOCALE = withMeta(CompKeys.RESOURCES_PAGE);
export const GLOSSARY_PAGE_LOCALE = withMeta(CompKeys.GLOSSARY_PAGE);
export const ERROR_404_PAGE_LOCALE = withMeta(CompKeys.ERROR_404_PAGE);
export const ERROR_GENERAL_LOCALE = withMeta(CompKeys.ERROR_GENERAL);
export const HEADER_LOCALE = CompKeys.HEADER;
export const FOOTER_LOCALE = CompKeys.FOOTER;
export const LOCALE_SELECTOR_LOCALE = CompKeys.LOCALE_SELECTOR;
