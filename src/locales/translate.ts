import { Locale } from "./index";
const { HE_IL, EN_US } = Locale;

const langs = {
	en: EN_US,
	he: HE_IL,
};

export const translate =
	(id: string) =>
	(key: string): string => {
		if (!langs[id]) {
			return `%MISSING_LOCALE_${id}_%${key}%`;
		} else if (!langs[id][key]) {
			return `%MISSING_KEY_${key}%`;
		}
		return langs[id][key] || `%${key}%`;
	};
