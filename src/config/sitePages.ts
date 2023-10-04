import { SitePage } from "../interfaces/models";
import LOCALE from "../locale/keymap/pages";

const {
	HOME_PAGE_LOCALE,
	ABOUT_PAGE_LOCALE,
	BLOG_PAGE_LOCALE,
	PREFACE_PAGE_LOCALE,
	RESOURCES_PAGE_LOCALE,
	ERROR_404_PAGE_LOCALE,
	ERROR_GENERAL_LOCALE,
	DOCS_PAGE_LOCALE,
	CONTACT_PAGE_LOCALE,
	CONTRIBUTE_PAGE_LOCALE,
	GLOSSARY_PAGE_LOCALE,
} = LOCALE;

export const SITE_PAGES: SitePage[] = [
	{
		id: "home",
		locale: HOME_PAGE_LOCALE,
		targetPathname: "/",
	},
	{
		id: "preface",
		locale: PREFACE_PAGE_LOCALE,
		targetPathname: "/docs/the-story-of-mel/pages/preface",
	},
	{
		id: "resources",
		locale: RESOURCES_PAGE_LOCALE,
		targetPathname: "/docs/resources",
	},
	{
		id: "about",
		locale: ABOUT_PAGE_LOCALE,
		targetPathname: "/about",
	},
	{
		id: "posts",
		locale: BLOG_PAGE_LOCALE,
		targetPathname: "/posts",
	},
	{
		id: "post",
		locale: BLOG_PAGE_LOCALE,
		targetPathname: "/posts/[id]",
	},
	{
		id: "error",
		locale: ERROR_GENERAL_LOCALE,
		targetPathname: "NONE",
	},
	{
		id: "404",
		locale: ERROR_404_PAGE_LOCALE,
		targetPathname: "NONE",
	},
	{
		id: "glossary",
		locale: GLOSSARY_PAGE_LOCALE,
		targetPathname: "/glossary",
	},
	{
		id: "docs",
		locale: DOCS_PAGE_LOCALE,
		targetPathname: "/docs",
	},
	{
		id: "contact",
		locale: CONTACT_PAGE_LOCALE,
		targetPathname: "/contact",
	},
	{
		id: "contribute",
		locale: CONTRIBUTE_PAGE_LOCALE,
		targetPathname: "/contribute",
	},
];
