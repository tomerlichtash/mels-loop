import {
	ABOUT_PAGE_LOCALE,
	HOME_PAGE_LOCALE,
	PREFACE_PAGE_LOCALE,
	RESOURCES_PAGE_LOCALE,
	STORY_PAGE_LOCALE,
} from "../locales/components";

export const SITE_PAGES = [
	{
		id: "home",
		label: HOME_PAGE_LOCALE.pageName,
		targetPathname: "/",
	},
	{
		id: "preface",
		label: PREFACE_PAGE_LOCALE.pageName,
		targetPathname: "/docs/preface",
	},
	{
		id: "story",
		label: STORY_PAGE_LOCALE.pageName,
		targetPathname: "/story",
	},
	{
		id: "about",
		label: ABOUT_PAGE_LOCALE.pageName,
		targetPathname: "/about",
	},
	{
		id: "resources",
		label: RESOURCES_PAGE_LOCALE.pageName,
		targetPathname: "/docs/resources",
	},
];
