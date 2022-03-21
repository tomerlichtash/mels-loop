import { Locale } from "./index";
const { HE_IL, EN_US } = Locale;

const langs = {
	en: EN_US,
	he: HE_IL,
};

export const translateFunc =
	(langRef: string) =>
	(key: string, lang?: string): string => {
		const ref = lang || langRef;
		if (!langs[ref]) {
			return `%MISSING_LOCALE_${ref}_%${key}%`;
		} else if (!langs[ref][key]) {
			return `%MISSING_KEY_${key}%`;
		}
		return langs[ref][key] || `%${key}%`;
	};
