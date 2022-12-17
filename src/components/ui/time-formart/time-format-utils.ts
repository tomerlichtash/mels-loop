import {
	LocaleTimeFormats,
	LocaleTimeFormatsDelims,
} from "./time-format-consts";

const leadingZero = (s: string) => (s.length === 2 ? s : `0${s}`);

export const format = (dateStr: Date, locale: string) => {
	const date = new Date(dateStr);

	const format = LocaleTimeFormats[locale];
	const delim = LocaleTimeFormatsDelims[locale];

	const dateStrs = {
		dd: leadingZero(date.getUTCDate().toString()),
		MM: leadingZero((date.getUTCMonth() + 1).toString()),
		yyyy: date.getUTCFullYear(),
	};

	return format
		.split(delim)
		.map((key: string) => dateStrs[key])
		.join(delim);
};
