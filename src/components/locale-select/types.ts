import { LocaleId } from 'locale/locale-context';

type LocaleOption = {
	id: LocaleId;
	label: string;
	title: string;
};

type LocaleSelectProps = {
	defaultValue: string;
	options: LocaleOption[];
	onSelect: (id: LocaleId) => void;
};

export type { LocaleSelectProps, LocaleOption };
