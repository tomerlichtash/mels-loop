import { SitePage } from "../interfaces/models";
import {
	ABOUT_PAGE_LOCALE,
	HOME_PAGE_LOCALE,
	PREFACE_PAGE_LOCALE,
	RESOURCES_PAGE_LOCALE,
	STORY_PAGE_LOCALE,
	GLOSSARY_PAGE_LOCALE,
} from "../locales/components";

export const SITE_PAGES: SitePage[] = [
	{
		id: "home",
		menuNav: true,
		locale: HOME_PAGE_LOCALE,
		label: HOME_PAGE_LOCALE.pageName,
		targetPathname: "/",
		pathname: "/",
	},
	{
		id: "preface",
		menuNav: true,
		locale: PREFACE_PAGE_LOCALE,
		label: PREFACE_PAGE_LOCALE.pageName,
		targetPathname: "/docs/preface",
		pathname: "/docs/[id]",
	},
	{
		id: "story",
		menuNav: true,
		locale: STORY_PAGE_LOCALE,
		label: STORY_PAGE_LOCALE.pageName,
		targetPathname: "/story",
		pathname: "/story",
	},
	{
		id: "about",
		menuNav: true,
		locale: ABOUT_PAGE_LOCALE,
		label: ABOUT_PAGE_LOCALE.pageName,
		targetPathname: "/about",
		pathname: "/about",
	},
	{
		id: "resources",
		menuNav: true,
		locale: RESOURCES_PAGE_LOCALE,
		label: RESOURCES_PAGE_LOCALE.pageName,
		targetPathname: "/docs/resources",
		pathname: "/docs/[id]",
	},
	{
		id: "glossary",
		menuNav: false,
		locale: GLOSSARY_PAGE_LOCALE,
		label: GLOSSARY_PAGE_LOCALE.pageName,
		targetPathname: "/docs/resources",
		pathname: "/glossary/[id]",
	},
	{
		id: "error",
		menuNav: false,
		locale: GLOSSARY_PAGE_LOCALE,
		label: GLOSSARY_PAGE_LOCALE.pageName,
		targetPathname: "NONE",
		pathname: "/_error",
	},
];
