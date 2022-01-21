// import { defaultLocale, dateFormats } from "./consts";
const { defaultLocale } = require("../../i18n.json");

export const isDefaultLocale = (locale: string) => locale === defaultLocale;

export const getLocale = (locale: string) =>
	isDefaultLocale(locale) ? "en" : "he";

// export const getLocaleFormat = (locale: string) =>
// 	dateFormats[locale] as string;
