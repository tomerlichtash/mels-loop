import { LocaleId, TextDirection } from 'types/locale';
// import i18n from '../../i18n.json' with { type: 'json'};
import useTranslation from 'next-translate/useTranslation';
import i18n from '../../i18n';

type LocaleProps = (id?: LocaleId) => {
	lang: LocaleId;
	locales: LocaleId[];
	textDirection: TextDirection;
	t: (key: string, options?: Record<string, unknown>) => string;
};

export const useLocale: LocaleProps = (id) => {
	const { t, lang } = useTranslation();

	const current = lang as LocaleId;
	const locales = i18n['locales'] as LocaleId[];
	const directions = i18n['direction'] as Record<LocaleId, TextDirection>;
	const textDirection = directions[id || current];

	return {
		lang: current,
		locales,
		textDirection,
		t,
	};
};
