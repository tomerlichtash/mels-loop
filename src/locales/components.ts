import { ComponentKeyMap } from "./types";

export const SITE_META: ComponentKeyMap = {
	siteTitle: "SITE_TITLE",
	siteSubtitle: "SITE_SUBTITLE",
};

export const HOME_PAGE_LOCALE: ComponentKeyMap = Object.assign(
	{
		pageName: "HOME_NAV_LABEL",
	},
	SITE_META
);

export const ABOUT_PAGE_LOCALE: ComponentKeyMap = Object.assign(
	{
		pageName: "ABOUT_NAV_LABEL",
	},
	SITE_META
);

export const STORY_PAGE_LOCALE: ComponentKeyMap = Object.assign(
	{
		pageName: "STORY_NAV_LABEL",
	},
	SITE_META
);

export const PREFACE_PAGE_LOCALE: ComponentKeyMap = Object.assign(
	{
		pageName: "PREFACE_NAV_LABEL",
	},
	SITE_META
);

export const RESOURCES_PAGE_LOCALE: ComponentKeyMap = Object.assign(
	{
		pageName: "RESOURCES_NAV_LABEL",
	},
	SITE_META
);

export const GLOSSARY_PAGE_LOCALE: ComponentKeyMap = Object.assign(
	{
		pageName: "GLOSSARY_NAV_LABEL",
	},
	SITE_META
);

export const ERROR_404_PAGE_LOCALE: ComponentKeyMap = Object.assign(
	{
		pageName: "ERROR_404_FILE_NOT_FOUND",
	},
	SITE_META
);

export const ERROR_GENERAL_LOCALE: ComponentKeyMap = Object.assign(
	{
		pageName: "ERROR_GENERAL",
	},
	SITE_META
);

export const NAV_MENU_DROPDOWN_LOCALE: ComponentKeyMap = {
	openLabel: "MOBILE_MENU_OPEN_LABEL",
	closeLabel: "MOBILE_MENU_CLOSE_LABEL",
};

export const HEADER_LOCALE: ComponentKeyMap = {
	siteTitle: "SITE_TITLE",
	siteSubtitle: "SITE_SUBTITLE",
};

export const FOOTER_LOCALE: ComponentKeyMap = {
	siteTitle: "SITE_TITLE",
	siteLicense: "FOOTER_LICENSE",
};

export const LOCALE_SELECTOR_LOCALE: ComponentKeyMap = {
	openLabel: "LOCALE_SELECTOR_TITLE",
	closeLabel: "LOCALE_SELECTOR_CLOSE",
};
