import { AvailableLocales } from "./types";
import { LOCALE_LABELS, EN_US, HE_IL } from "./locales";

export const Locale: AvailableLocales = {
	EN_US: Object.assign(EN_US, LOCALE_LABELS),
	HE_IL: Object.assign(HE_IL, LOCALE_LABELS),
};
