import { MoonIcon, SunIcon } from '@radix-ui/react-icons';
import styles from './ThemeSelect.module.scss';

export const getIcon = (isDark: boolean) =>
	isDark ? (
		<MoonIcon className={styles.icon} />
	) : (
		<SunIcon className={styles.icon} />
	);
