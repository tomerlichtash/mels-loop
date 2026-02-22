'use client';

import { useTranslation } from '@mels-loop/i18n/client';
import { setLocaleCookie } from '@mels-loop/i18n/locale-cookie';
import cn from 'classnames';

import type { LocaleOption } from '../types';
import styles from './LocaleSwitcher.module.css';

interface LocaleSwitcherProps {
	locales: LocaleOption[];
}

export function LocaleSwitcher({ locales }: LocaleSwitcherProps) {
	const { locale, t } = useTranslation();

	return (
		<div className={styles.root} role="group" aria-label={t('locale.group')}>
			{locales.map((option) => {
				const active = option.code === locale;
				const fontClass = styles[option.code] ?? '';

				return active ? (
					<span
						key={option.code}
						className={cn(styles.item, styles.active, fontClass)}
						aria-current="true"
					>
						{t(option.labelKey)}
					</span>
				) : (
					<button
						key={option.code}
						type="button"
						className={cn(styles.item, fontClass)}
						aria-label={t(option.switchToKey)}
						onClick={() => {
							setLocaleCookie(option.code);
							window.location.reload();
						}}
					>
						{t(option.labelKey)}
					</button>
				);
			})}
		</div>
	);
}
