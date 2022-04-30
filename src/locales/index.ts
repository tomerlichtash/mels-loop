import type { AvailableLocales } from "./languages/types/common";
import COMMON from "./languages/common";
import EN_US from "./languages/en";
import HE_IL from "./languages/he";

export const Languages: AvailableLocales = {
	en: {
		keys: Object.assign({}, COMMON, EN_US),
		meta: { direction: "ltr" },
	},
	he: {
		keys: Object.assign({}, COMMON, HE_IL),
		meta: { direction: "rtl" },
	},
};

export default Languages;
