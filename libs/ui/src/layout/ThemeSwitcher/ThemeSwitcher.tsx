'use client';

import { MoonIcon, SunIcon } from '@radix-ui/react-icons';

import { useColorScheme } from '../../color-scheme/useColorScheme';
import { ToggleButton } from '../../primitives/ToggleButton';
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
			<span className={styles.icon}>{isDark ? <SunIcon /> : <MoonIcon />}</span>
		</ToggleButton>
	);
}
