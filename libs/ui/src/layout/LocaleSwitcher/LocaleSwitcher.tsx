'use client';

import { useTranslation } from '@mels-loop/i18n/client';
import { setLocaleCookie } from '@mels-loop/i18n/locale-cookie';

import { ToggleGroup } from '../../primitives/ToggleGroup';
import type { LocaleOption } from '../types';
import styles from './LocaleSwitcher.module.css';

interface LocaleSwitcherProps {
	locales: LocaleOption[];
}

export function LocaleSwitcher({ locales }: LocaleSwitcherProps) {
	const { locale, t } = useTranslation();

	const items = locales.map((option) => ({
		value: option.code,
		label: t(option.labelKey),
		className: styles[option.code] ?? '',
		'aria-label': t(option.switchToKey),
	}));

	return (
		<ToggleGroup
			className={styles.root}
			value={locale}
			items={items}
			onChange={(code) => {
				setLocaleCookie(code);
				window.location.reload();
			}}
			aria-label={t('locale.group')}
		/>
	);
}
