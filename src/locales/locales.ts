export type ILocaleId = "EN_US" | "HE_IL";

export type IAvailableLocales = Record<
	ILocaleId,
	Record<keyof ILocaleKeys, string>
>;

export interface ILocaleName {
	LOCALE_LABEL_EN: "LOCALE_LABEL_EN";
	LOCALE_LABEL_HE: "LOCALE_LABEL_HE";
}

export interface ILocaleKeys {
	HOME_NAV_LABEL: "HOME_NAV_LABEL";
	ABOUT_NAV_LABEL: "ABOUT_NAV_LABEL";
	STORY_NAV_LABEL: "STORY_NAV_LABEL";
	SITE_NAME: "SITE_NAME";
	SITE_SUBTITLE: "SITE_SUBTITLE";
	LOCALE_SELECTOR_TITLE: "LOCALE_SELECTOR_TITLE";
	LOCALE_SELECTOR_CLOSE: "LOCALE_SELECTOR_CLOSE";
	LOCALE_LABEL_EN: "LOCALE_LABEL_EN";
	LOCALE_LABEL_HE: "LOCALE_LABEL_HE";
	MOBILE_MENU_OPEN_LABEL: "MOBILE_MENU_OPEN_LABEL";
	MOBILE_MENU_CLOSE_LABEL: "MOBILE_MENU_CLOSE_LABEL";
	ERROR_404_FILE_NOT_FOUND: "ERROR_404_FILE_NOT_FOUND";
}

export const LOCALE_LABELS: Record<keyof ILocaleName, string> = {
	LOCALE_LABEL_EN: "English",
	LOCALE_LABEL_HE: "עברית",
};

export const EN_US: Record<keyof ILocaleKeys, string> = Object.assign(
	{
		HOME_NAV_LABEL: "Home",
		ABOUT_NAV_LABEL: "About",
		STORY_NAV_LABEL: "The Story",
		SITE_NAME: "Mel's Loop",
		SITE_SUBTITLE: "A Comprehensive Guide to The Story of Mel",
		LOCALE_SELECTOR_TITLE: "Choose Language",
		LOCALE_SELECTOR_CLOSE: "Close",
		MOBILE_MENU_OPEN_LABEL: "Menu",
		MOBILE_MENU_CLOSE_LABEL: "Close",
		ERROR_404_FILE_NOT_FOUND: "404",
	},
	LOCALE_LABELS
);

export const HE_IL: Record<keyof ILocaleKeys, string> = Object.assign(
	{
		HOME_NAV_LABEL: "שער",
		ABOUT_NAV_LABEL: "אודות",
		STORY_NAV_LABEL: "הסיפור",
		SITE_NAME: "לולאת מל",
		SITE_SUBTITLE: "המדריך המקיף לסיפור על מל",
		LOCALE_SELECTOR_TITLE: "בחירת שפה",
		LOCALE_SELECTOR_CLOSE: "סגירה",
		MOBILE_MENU_OPEN_LABEL: "תפריט",
		MOBILE_MENU_CLOSE_LABEL: "סגירה",
		ERROR_404_FILE_NOT_FOUND: "404",
	},
	LOCALE_LABELS
);

export const Locale: IAvailableLocales = {
	EN_US,
	HE_IL,
};
