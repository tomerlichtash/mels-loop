import { SitePage } from "../interfaces/models";
import LOCALE from "../locales/components";

const {
	HOME_PAGE_LOCALE,
	DOCS_PAGE_LOCALE,
	ABOUT_PAGE_LOCALE,
	// STORY_PAGE_LOCALE,
	BLOG_PAGE_LOCALE,
	PREFACE_PAGE_LOCALE,
	RESOURCES_PAGE_LOCALE,
	GLOSSARY_PAGE_LOCALE,
	ERROR_404_PAGE_LOCALE,
	ERROR_GENERAL_LOCALE,
} = LOCALE;

export const SITE_PAGES: SitePage[] = [
	{
		id: "home",
		menuNav: true,
		locale: HOME_PAGE_LOCALE,
		targetPathname: "/",
	},
	{
		id: "preface",
		menuNav: true,
		locale: PREFACE_PAGE_LOCALE,
		targetPathname: "/docs/preface",
	},
	{
		id: "resources",
		menuNav: true,
		locale: RESOURCES_PAGE_LOCALE,
		targetPathname: "/docs/resources",
	},
	{
		id: "about",
		menuNav: true,
		locale: ABOUT_PAGE_LOCALE,
		targetPathname: "/about",
	},
	{
		id: "posts",
		menuNav: true,
		locale: BLOG_PAGE_LOCALE,
		targetPathname: "/posts",
	},
	{
		id: "docs",
		menuNav: false,
		locale: DOCS_PAGE_LOCALE,
		targetPathname: "/docs",
		children: ["preface", "resources", "blackjack-writeup"],
	},
	// {
	// 	id: "story",
	// 	menuNav: true,
	// 	locale: STORY_PAGE_LOCALE,
	// 	targetPathname: "/story",
	// },
	{
		id: "glossary",
		menuNav: false,
		locale: GLOSSARY_PAGE_LOCALE,
		targetPathname: "/glossary",
	},
	{
		id: "error",
		menuNav: false,
		locale: ERROR_GENERAL_LOCALE,
		targetPathname: "NONE",
	},
	{
		id: "404",
		menuNav: false,
		locale: ERROR_404_PAGE_LOCALE,
		targetPathname: "NONE",
	},
];
