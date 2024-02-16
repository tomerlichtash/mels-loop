import React, { useEffect, useState } from 'react';
import { getIcon } from 'components/icons';
import Toggle from '../toggle/Toggle';
import styles from './ThemeSelect.module.scss';
import classNames from 'classnames';

type ThemeSelectProps = {
	label: string;
	theme: string;
	setTheme: (val: string) => void;
	className?: string;
};

const ThemeSelect = ({
	label,
	theme,
	setTheme,
	className,
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
			className={classNames(styles.root, className)}
		>
			{getIcon(theme)}
		</Toggle>
	);
};

export default ThemeSelect;
export type { ThemeSelectProps };
