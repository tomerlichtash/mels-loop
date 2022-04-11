import type { AvailableLocales } from "./languages/types/common";
import COMMON from "./languages/common";
import EN_US from "./languages/en";
import HE_IL from "./languages/he";

export const LANGS: AvailableLocales = {
	en: Object.assign({}, COMMON, EN_US),
	he: Object.assign({}, COMMON, HE_IL),
};

export default LANGS;
