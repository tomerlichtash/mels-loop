import { Locale } from "./index";
import { ILanguage, ILocaleShortId } from "./types";

const { HE_IL, EN_US } = Locale;

const langs = {
	en: EN_US,
	he: HE_IL,
};

export const t = (key: keyof ILanguage, locId: ILocaleShortId): string => {
	return langs[locId][key] || `%${key}%`;
};
