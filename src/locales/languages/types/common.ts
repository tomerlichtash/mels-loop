import { LocaleId } from "../../../interfaces/locale-context";
import { Language } from "./locale";

export type LocaleLabels = Record<keyof ILocaleKeys, string>;

export interface ILocaleKeys {
	LOCALE_LABEL_EN: "LOCALE_LABEL_EN";
	LOCALE_LABEL_HE: "LOCALE_LABEL_HE";
}

export type AvailableLocales = Record<LocaleId, Language & LocaleLabels>;
