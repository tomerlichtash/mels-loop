'use client';

import { MoonIcon, SunIcon } from '@radix-ui/react-icons';
import { Tooltip } from '../../primitives/Tooltip/Tooltip';
import styles from './ThemeSwitcher.module.css';

interface ThemeSwitcherProps {
	onToggle: () => void;
	label: string;
}

export function ThemeSwitcher({ onToggle, label }: ThemeSwitcherProps) {
	return (
		<Tooltip label={label}>
			<button
				type="button"
				className={styles.root}
				onClick={onToggle}
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
