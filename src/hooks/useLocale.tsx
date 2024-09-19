import { useCallback, useMemo } from 'react';
import { useRouter } from 'next/router';
import useTranslation from 'next-translate/useTranslation';
import i18n from '../../i18n';

type TextDirection = 'rtl' | 'ltr';

type LocaleId = 'en' | 'he';

type LocaleProps = (id?: LocaleId) => {
	lang: LocaleId;
	locales: LocaleId[];
	textDirection: TextDirection;
	localeItems: LocaleOptionProps[];
	setLocale: (id: string) => Promise<boolean>;
	t: (key: string, options?: Record<string, unknown>) => string;
};

export type LocaleOptionProps = {
	id: LocaleId;
	label: string;
	title: string;
};

export const useLocale: LocaleProps = (id: string) => {
	const router = useRouter();
	const { t, lang } = useTranslation();

	const current = lang as LocaleId;
	const locales = i18n.locales as LocaleId[];
	const directions = i18n.direction as Record<LocaleId, TextDirection>;
	const textDirection = directions[id || current];

	const localeItems: LocaleOptionProps[] = useMemo(
		() =>
			locales.map((id) => ({
				id: id,
				label: t(`locale:${id}:symbol`),
				title: t(`locale:${id}:label`)
			})),
		[locales, t]
	);

	const setLocale = useCallback(
		async (id: LocaleId) =>
			router.push(router.asPath, router.asPath, {
				locale: id,
				scroll: true
			}),
		[router]
	);

	return {
		lang: current,
		locales,
		textDirection,
		localeItems,
		setLocale,
		t
	};
};
