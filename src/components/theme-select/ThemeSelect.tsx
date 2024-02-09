import React, { useEffect, useState } from 'react';
import { getIcon } from './helpers';
import Toggle from '../toggle/Toggle';
import styles from './ThemeSelect.module.scss';
import type { ThemeSelectProps } from './types';

const ThemeSelect = ({
	label,
	theme,
	setTheme,
}: ThemeSelectProps): JSX.Element => {
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
