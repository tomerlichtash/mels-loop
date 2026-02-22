'use client';

import { MoonIcon, SunIcon } from '@radix-ui/react-icons';

import { useColorScheme } from '../../color-scheme/useColorScheme';
import styles from './ThemeSwitcher.module.css';

interface ThemeSwitcherProps {
	'aria-label'?: string;
}

export function ThemeSwitcher({ 'aria-label': ariaLabel }: ThemeSwitcherProps) {
	const { toggleColorScheme } = useColorScheme();

	return (
		<button
			type="button"
			className={styles.root}
			onClick={toggleColorScheme}
			aria-label={ariaLabel}
		>
			<span className={styles.light}>
				<MoonIcon />
			</span>
			<span className={styles.dark}>
				<SunIcon />
			</span>
		</button>
	);
}
