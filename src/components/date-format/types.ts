import type { LocaleId } from 'types/locale';

type DateFormatProps = {
	date: Date;
	locale?: LocaleId;
	format?: string;
	className?: string;
};

export type { DateFormatProps };
