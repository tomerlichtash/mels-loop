import { AvailableLocales } from "./languages/types/common";

export const _translate =
	(langRef: string, langs: AvailableLocales) =>
	(key: string, lang?: string): string => {
		if (!key) {
			return;
		}
		const ref = lang || langRef;
		if (!langs[ref] && !langs[ref]?.keys) {
			return `%MISSING_LOCALE_${ref}_${key}%`;
		} else if (!langs[ref].keys[key]) {
			return `%MISSING_KEY_${key}%`;
		}
		return langs[ref].keys[key] || `%${key}%`;
	};
