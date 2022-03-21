import { AvailableLocales } from "./types";
import { LOCALE_LABELS, EN_US, HE_IL } from "./locales";
import { GLOSSARY_TERMS_EN, GLOSSARY_TERMS_HE } from "./glossary";

export const Locale: AvailableLocales = {
	EN_US: Object.assign(EN_US, LOCALE_LABELS, GLOSSARY_TERMS_EN),
	HE_IL: Object.assign(HE_IL, LOCALE_LABELS, GLOSSARY_TERMS_HE),
};
