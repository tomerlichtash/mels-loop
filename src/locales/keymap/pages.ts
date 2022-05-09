import { ComponentKeyMap } from "./types";

const PageKeys: Record<string, ComponentKeyMap> = {
	HOME_PAGE: {
		pageName: "PAGE_LABEL_HOME",
	},
	ABOUT_PAGE: {
		pageName: "PAGE_LABEL_ABOUT",
	},
	BLOG_PAGE: {
		pageName: "PAGE_LABEL_BLOG",
		sectionName: "SECTION_LABEL_POSTS",
	},
	RESOURCES_PAGE: {
		pageName: "PAGE_LABEL_RESOURCES",
	},
	ERROR_404_PAGE: {
		pageName: "ERROR_404_FILE_NOT_FOUND",
	},
	ERROR_GENERAL: {
		pageName: "ERROR_GENERAL",
	},
};

export default {
	HOME_PAGE_LOCALE: PageKeys.HOME_PAGE,
	ABOUT_PAGE_LOCALE: PageKeys.ABOUT_PAGE,
	BLOG_PAGE_LOCALE: PageKeys.BLOG_PAGE,
	PREFACE_PAGE_LOCALE: PageKeys.PREFACE_PAGE,
	RESOURCES_PAGE_LOCALE: PageKeys.RESOURCES_PAGE,
	ERROR_404_PAGE_LOCALE: PageKeys.ERROR_404_PAGE,
	ERROR_GENERAL_LOCALE: PageKeys.ERROR_GENERAL,
};

// DOCS_PAGE_LOCALE: PageKeys.DOCS_PAGE,
// STORY_PAGE_LOCALE: PageKeys.STORY_PAGE,
// GLOSSARY_PAGE_LOCALE: PageKeys.GLOSSARY_PAGE,

// DOCS_PAGE: {
// 	pageName: "PAGE_NAME_DOCS",
// },
// STORY_PAGE: {
// 	pageName: "PAGE_NAME_STORY",
// },
// PREFACE_PAGE: {
// 	pageName: "PREFACE_NAV_LABEL",
// },
// GLOSSARY_PAGE: {
// 	pageName: "PAGE_NAME_GLOSSARY",
// },
