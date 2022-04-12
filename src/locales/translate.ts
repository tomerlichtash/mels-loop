import { AvailableLocales } from "./languages/types/common";

export const _translate =
	(langRef: string, langs: AvailableLocales) =>
	(key: string, lang?: string): string => {
		if (!key) {
			return;
		}
		const ref = lang || langRef;
		if (!langs[ref]) {
			return `%MISSING_LOCALE_${ref}_${key}%`;
		} else if (!langs[ref][key]) {
			return `%MISSING_KEY_${key}%`;
		}
		return langs[ref][key] || `%${key}%`;
	};
