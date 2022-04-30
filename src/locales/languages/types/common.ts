import { Language } from "./locale";

export type LocaleId = "en" | "he";

export type TextDirection = "rtl" | "ltr";

export type LocaleLabels = Record<keyof ILocaleKeys, string>;

export interface ILocaleMetaProps {
	direction: TextDirection;
}

export type LocaleKeys = Record<
	keyof Language & keyof LocaleLabels,
	Language & LocaleLabels
>;

export type LocaleDecleration = {
	keys: LocaleKeys;
	meta: ILocaleMetaProps;
};

export interface ILocaleKeys {
	LOCALE_LABEL_EN: "LOCALE_LABEL_EN";
	LOCALE_LABEL_HE: "LOCALE_LABEL_HE";
}

export type AvailableLocales = Record<LocaleId, LocaleDecleration>;
