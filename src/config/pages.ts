import {
	ABOUT_PAGE_LOCALE,
	HOME_PAGE_LOCALE,
	PREFACE_PAGE_LOCALE,
	RESOURCES_PAGE_LOCALE,
	STORY_PAGE_LOCALE,
} from "../locales/components";

export const SITE_PAGES = [
	{
		label: HOME_PAGE_LOCALE.pageName,
		id: "home",
		targetPathname: "/",
	},
	{
		label: PREFACE_PAGE_LOCALE.pageName,
		id: "preface",
		targetPathname: "/docs/preface",
	},
	{
		label: STORY_PAGE_LOCALE.pageName,
		id: "story",
		targetPathname: "/story",
	},
	{
		label: ABOUT_PAGE_LOCALE.pageName,
		id: "about",
		targetPathname: "/about",
		compKeys: ABOUT_PAGE_LOCALE,
	},
	{
		label: RESOURCES_PAGE_LOCALE.pageName,
		id: "resources",
		targetPathname: "/docs/resources",
	},
];
