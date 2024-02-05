import React, { useEffect, useState } from 'react';
import Toggle from '../toggle/Toggle';
import styles from './ThemeSelect.module.scss';
import { getIcon } from './helpers';

export type ThemeSelectProps = {
	label: string;
	theme: string;
	setTheme: (val: string) => void;
};

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
			className={styles.root}
		>
			{getIcon(isDark)}
		</Toggle>
	);
};

export default ThemeSelect;
