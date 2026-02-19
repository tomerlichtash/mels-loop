'use client';

import { useTranslation } from '@mels-loop/i18n/client';
import { usePathname } from 'next/navigation';
import * as Separator from '@radix-ui/react-separator';
import { ThemeSwitcher } from '../ThemeSwitcher/ThemeSwitcher';
import { LocaleSwitcher } from '../LocaleSwitcher/LocaleSwitcher';
import { NavMenu } from '../Navigation/NavMenu';
import type { NavItem } from '../types';
import styles from './Header.module.css';

interface HeaderProps {
	onMenuClick: () => void;
	navItems: NavItem[];
}

export function Header({ onMenuClick, navItems }: HeaderProps) {
	const { t } = useTranslation();
	const pathname = usePathname();
	const isHome = pathname === '/';

	return (
		<header className={styles.header}>
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
				<LocaleSwitcher />
				<Separator.Root
					orientation="vertical"
					className={styles.rightDivider}
				/>
				<ThemeSwitcher />
			</div>
		</header>
	);
}
