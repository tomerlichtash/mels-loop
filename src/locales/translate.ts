import { AvailableLocales } from "./languages/types/common";

export const _translate =
	(langRef: string, langs: AvailableLocales) =>
	(key: string, lang?: string): string => {
		if (!key) {
			return;
		}
		const ref = lang || langRef;
		if (!langs[ref]) {
			return `%${ref}_${key}%`;
		} else if (!langs[ref][key] || !langs[ref][key].length) {
			return `%${key}%`;
		}
		return langs[ref][key] || `%${key}%`;
	};
