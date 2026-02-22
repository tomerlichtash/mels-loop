'use client';

import { useTranslation } from '@mels-loop/i18n/client';
import { usePathname } from 'next/navigation';
import * as Separator from '@radix-ui/react-separator';
import { ThemeSwitcher } from '../ThemeSwitcher/ThemeSwitcher';
import { LocaleSwitcher } from '../LocaleSwitcher/LocaleSwitcher';
import { NavMenu } from '../Navigation/NavMenu';
import { useColorScheme } from '../../color-scheme/useColorScheme';
import type { NavItem, LocaleOption } from '../types';
import styles from './SiteHeader.module.css';

interface SiteHeaderProps {
	onMenuClick: () => void;
	navItems: NavItem[];
	locales: LocaleOption[];
}

export function SiteHeader({
	onMenuClick,
	navItems,
	locales,
}: SiteHeaderProps) {
	const { t } = useTranslation();
	const pathname = usePathname();
	const isHome = pathname === '/';
	const { colorScheme, toggleColorScheme } = useColorScheme();
	const themeLabel =
		colorScheme === 'dark' ? t('theme.switchToLight') : t('theme.switchToDark');

	return (
		<header className={styles.root}>
			<div className={styles.left}>
				<button
					type="button"
					className={styles.burger}
					onClick={onMenuClick}
					aria-label="Toggle navigation"
				>
					<span className={styles.burgerLine} />
					<span className={styles.burgerLine} />
					<span className={styles.burgerLine} />
				</button>
				{isHome ? (
					<span className={styles.logo}>
						<span className={styles.logoIcon}>
							<img
								src="/assets/ml-logo-light.png"
								alt=""
								className={styles.logoImgLight}
							/>
							<img
								src="/assets/ml-logo-dark.png"
								alt=""
								className={styles.logoImgDark}
							/>
						</span>
						<span className={styles.logoText}>{t('siteTitle')}</span>
					</span>
				) : (
					<a href="/" className={styles.logoLink}>
						<span className={styles.logoIcon}>
							<img
								src="/assets/ml-logo-light.png"
								alt=""
								className={styles.logoImgLight}
							/>
							<img
								src="/assets/ml-logo-dark.png"
								alt=""
								className={styles.logoImgDark}
							/>
						</span>
						<span className={styles.logoText}>{t('siteTitle')}</span>
					</a>
				)}
				<Separator.Root orientation="vertical" className={styles.logoDivider} />
				<span className={styles.logoSubtitle}>{t('siteSubtitle')}</span>
			</div>

			<div className={styles.right}>
				<nav className={styles.desktopNav}>
					<NavMenu navItems={navItems} />
				</nav>
				<Separator.Root
					orientation="vertical"
					className={styles.rightDivider}
				/>
				<LocaleSwitcher locales={locales} />
				<Separator.Root
					orientation="vertical"
					className={styles.rightDivider}
				/>
				<ThemeSwitcher onToggle={toggleColorScheme} label={themeLabel} />
			</div>
		</header>
	);
}
