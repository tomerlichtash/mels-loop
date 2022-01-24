export type LocaleId = "EN_US" | "HE_IL";

export interface ILocaleKeys {
	LOCALE_LABEL_EN: "LOCALE_LABEL_EN";
	LOCALE_LABEL_HE: "LOCALE_LABEL_HE";
}

export interface ILanguageKeys {
	HOME_NAV_LABEL: "HOME_NAV_LABEL";
	ABOUT_NAV_LABEL: "ABOUT_NAV_LABEL";
	STORY_NAV_LABEL: "STORY_NAV_LABEL";
	PREFACE_NAV_LABEL: "PREFACE_NAV_LABEL";
	RESOURCES_NAV_LABEL: "RESOURCES_NAV_LABEL";
	SITE_TITLE: "SITE_TITLE";
	SITE_SUBTITLE: "SITE_SUBTITLE";
	LOCALE_SELECTOR_TITLE: "LOCALE_SELECTOR_TITLE";
	LOCALE_SELECTOR_CLOSE: "LOCALE_SELECTOR_CLOSE";
	MOBILE_MENU_OPEN_LABEL: "MOBILE_MENU_OPEN_LABEL";
	MOBILE_MENU_CLOSE_LABEL: "MOBILE_MENU_CLOSE_LABEL";
	ERROR_404_FILE_NOT_FOUND: "ERROR_404_FILE_NOT_FOUND";
	FOOTER_LICENSE: "FOOTER_LICENSE";
}

export type Language = Record<keyof ILanguageKeys, string>;

export type LocaleLabels = Record<keyof ILocaleKeys, string>;

export type AvailableLocales = Record<LocaleId, Language & LocaleLabels>;

export interface IComponentKeyProps {
	siteTitle: "siteTitle";
	siteSubtitle: "siteSubtitle";
	siteLicense: "siteLicense";
	pageName: "pageName";
	openLabel: "openLabel";
	closeLabel: "closeLabel";
	en: "en";
	he: "he";
}

export type ComponentKeyMap = Partial<
	Record<keyof IComponentKeyProps | keyof ILocaleKeys, keyof ILanguageKeys>
>;
