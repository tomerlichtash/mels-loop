import type { LocaleId } from 'locale/locale-context';

type DateFormatProps = {
	date: Date;
	locale?: LocaleId;
	format?: string;
	className?: string;
};

export type { DateFormatProps };
