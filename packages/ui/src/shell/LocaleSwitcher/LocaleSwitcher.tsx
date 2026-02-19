'use client';

import { useTranslation } from '@mels-loop/i18n/client';
import { setLocaleCookie } from '@mels-loop/i18n/locale-cookie';
import styles from './LocaleSwitcher.module.css';

const locales = [
	{ code: 'en', label: 'EN' },
	{ code: 'he', label: 'ע' },
];

export function LocaleSwitcher() {
	const { locale } = useTranslation();

	return (
		<div className={styles.group} role="group" aria-label="Switch language">
			{locales.map(({ code, label }) => {
				const active = code === locale;
				const fontClass = styles[code] ?? '';

				return active ? (
					<span
						key={code}
						className={`${styles.item} ${styles.active} ${fontClass}`}
						aria-current="true"
					>
						{label}
					</span>
				) : (
					<button
						key={code}
						type="button"
						className={`${styles.item} ${fontClass}`}
						aria-label={`Switch to ${code}`}
						onClick={() => {
							setLocaleCookie(code);
							window.location.reload();
						}}
					>
						{label}
					</button>
				);
			})}
		</div>
	);
}
