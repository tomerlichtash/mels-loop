import { EN_US, HE_IL } from "./locales";

const LOCALE_MAP = {
	en: EN_US,
	he: HE_IL,
};

export const t = (key: string, locale: string): string => {
	return LOCALE_MAP[locale][key] || `%${key}%`;
};
