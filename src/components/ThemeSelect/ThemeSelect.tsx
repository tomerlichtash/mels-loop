import React, { useEffect, useMemo, useState } from 'react';
import { Button, ToggleButton } from '@melsloop/ml-components';
import { MoonIcon, SunIcon } from '@radix-ui/react-icons';
import classNames from 'classnames';
import styles from './ThemeSelect.module.css';
import { useTheme } from 'next-themes';
import { getOppositeTheme } from 'components/helpers';
import { useLocale } from 'hooks/useLocale';

type ThemeSelectProps = {
	className?: string;
};

const ThemeSelect = ({ className }: ThemeSelectProps): JSX.Element => {
	const [mounted, setMounted] = useState(false);

	const { theme, setTheme } = useTheme();
	const { t } = useLocale();

	useEffect(() => setMounted(true), []);

	const label = useMemo(() => {
		return t('common:button:toggleTheme', {
			theme: t(`common:theme:${getOppositeTheme(theme)}:name`)
		});
	}, [theme, t]);

	if (!mounted) return null;

	const isDark = theme === 'dark';

	return (
		<ToggleButton
			isPressed={isDark}
			onClick={() => setTheme(isDark ? 'light' : 'dark')}
			className={classNames(styles.root, className)}
		>
			<Button
				variant="outline"
				mode="primary"
				size="xs"
				title={label}
				className={styles.button}
			>
				{isDark ? <MoonIcon /> : <SunIcon />}
			</Button>
		</ToggleButton>
	);
};

export default ThemeSelect;
