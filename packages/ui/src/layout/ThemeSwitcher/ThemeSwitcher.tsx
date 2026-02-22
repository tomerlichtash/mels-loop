'use client';

import { MoonIcon, SunIcon } from '@radix-ui/react-icons';
import { useTranslation } from '@mels-loop/i18n/client';
import { useColorScheme } from '../../color-scheme/useColorScheme';
import { Tooltip } from '../../primitives/Tooltip/Tooltip';
import styles from './ThemeSwitcher.module.css';

export function ThemeSwitcher() {
	const { t } = useTranslation();
	const { colorScheme, toggleColorScheme } = useColorScheme();
	const label = t(`theme.switchTo.${colorScheme}`);

	return (
		<Tooltip label={label}>
			<button
				type="button"
				className={styles.root}
				onClick={toggleColorScheme}
				aria-label={label}
			>
				<span className={styles.light}>
					<MoonIcon />
				</span>
				<span className={styles.dark}>
					<SunIcon />
				</span>
			</button>
		</Tooltip>
	);
}
