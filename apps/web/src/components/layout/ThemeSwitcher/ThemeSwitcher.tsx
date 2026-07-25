'use client';

import { useColorScheme } from '@mels-loop/ui/color-scheme';
import { ToggleButton } from '@mels-loop/ui/primitives';
// SSR entry: RSC-safe, no React Context, and it tree-shakes to the two icons
// used here rather than pulling the whole set.
import { MoonIcon, SunIcon } from '@phosphor-icons/react/ssr';

import styles from './ThemeSwitcher.module.css';

interface ThemeSwitcherProps {
	'aria-label'?: string;
}

export function ThemeSwitcher({ 'aria-label': ariaLabel }: ThemeSwitcherProps) {
	const { colorScheme, toggleColorScheme } = useColorScheme();
	const isDark = colorScheme === 'dark';

	return (
		<ToggleButton
			pressed={isDark}
			onPressedChange={() => toggleColorScheme()}
			className={styles.root}
			aria-label={ariaLabel}
		>
			<span className={styles.icon}>
				{isDark ? <SunIcon weight="fill" /> : <MoonIcon weight="fill" />}
			</span>
		</ToggleButton>
	);
}
