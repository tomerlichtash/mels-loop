import React, { useEffect, useState } from 'react';
import Toggle from '../toggle';
import { MoonIcon, SunIcon } from '@radix-ui/react-icons';
import styles from './ThemeSelect.module.scss';

const getIcon = (isDark: boolean) =>
	isDark ? (
		<MoonIcon className={styles.icon} />
	) : (
		<SunIcon className={styles.icon} />
	);

const ThemeSelect = ({ label, theme, setTheme }): JSX.Element => {
	const [mounted, setMounted] = useState(false);

	useEffect(() => setMounted(true), []);

	if (!mounted) return null;

	const isDark = theme === 'dark';

	return (
		<Toggle
			title={label}
			isToggled={isDark}
			onToggle={() => setTheme(isDark ? 'light' : 'dark')}
		>
			{getIcon(isDark)}
		</Toggle>
	);
};

export default ThemeSelect;
