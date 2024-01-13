import { ComponentKeyMap } from "./types";

const PageKeys: Record<string, ComponentKeyMap> = {
	HOME_PAGE: {
		pageName: "site.pages.home.label",
	},
	ABOUT_PAGE: {
		pageName: "site.pages.about.label",
	},
	BLOG_PAGE: {
		pageName: "site.pages.blog.label",
		sectionName: "SECTION_LABEL_POSTS",
	},
	RESOURCES_PAGE: {
		pageName: "PAGE_LABEL_RESOURCES",
	},
	GLOSSARY_PAGE: {
		pageName: "PAGE_LABEL_GLOSSARY",
	},
	DOCS_PAGE: {
		pageName: "PAGE_LABEL_DOCS",
	},
	CONTACT_PAGE: {
		pageName: "PAGE_LABEL_CONTACT",
	},
	CONTRIBUTE_PAGE: {
		pageName: "PAGE_LABEL_CONTRIBUTE",
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
	DOCS_PAGE_LOCALE: PageKeys.DOCS_PAGE,
	CONTACT_PAGE_LOCALE: PageKeys.CONTACT_PAGE,
	CONTRIBUTE_PAGE_LOCALE: PageKeys.CONTRIBUTE_PAGE,
	GLOSSARY_PAGE_LOCALE: PageKeys.GLOSSARY_PAGE,
	ERROR_404_PAGE_LOCALE: PageKeys.ERROR_404_PAGE,
	ERROR_GENERAL_LOCALE: PageKeys.ERROR_GENERAL,
};
