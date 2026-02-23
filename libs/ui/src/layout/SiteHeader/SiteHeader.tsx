'use client';

import { useTranslation } from '@mels-loop/i18n/client';
import * as Separator from '@radix-ui/react-separator';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { memo } from 'react';

import { useColorScheme } from '../../color-scheme/useColorScheme';
import { Tooltip } from '../../primitives/Tooltip/Tooltip';
import { LocaleSwitcher } from '../LocaleSwitcher/LocaleSwitcher';
import { NavMenu } from '../Navigation/NavMenu';
import { ThemeSwitcher } from '../ThemeSwitcher/ThemeSwitcher';
import type { LocaleOption, NavItem } from '../types';
import styles from './SiteHeader.module.css';

interface SiteHeaderProps {
	onMenuClick: () => void;
	navItems: NavItem[];
	locales: LocaleOption[];
}

function BurgerButton({ onClick }: { onClick: () => void }) {
	const { t } = useTranslation();
	return (
		<button
			type="button"
			className={styles.burger}
			onClick={onClick}
			aria-label={t('nav.toggleMenu')}
		>
			<span className={styles.burgerLine} />
			<span className={styles.burgerLine} />
			<span className={styles.burgerLine} />
		</button>
	);
}

const Logo = memo(function Logo({
	isHome,
	siteTitle,
}: {
	isHome: boolean;
	siteTitle: string;
}) {
	const content = (
		<>
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
			<span className={styles.logoText}>{siteTitle}</span>
		</>
	);
	return isHome ? (
		<span className={styles.logo}>{content}</span>
	) : (
		<Link href="/" className={styles.logoLink}>
			{content}
		</Link>
	);
});

export function SiteHeader({
	onMenuClick,
	navItems,
	locales,
}: SiteHeaderProps) {
	const { t } = useTranslation();
	const { colorScheme } = useColorScheme();
	const pathname = usePathname();
	const isHome = pathname === '/';
	const themeLabel = t(`theme.switchTo.${colorScheme}`);

	return (
		<header className={styles.root}>
			<div className={styles.inner}>
				<div className={styles.left}>
					<BurgerButton onClick={onMenuClick} />
					<Logo isHome={isHome} siteTitle={t('siteTitle')} />
					<Separator.Root
						orientation="vertical"
						className={styles.logoDivider}
					/>
					<span className={styles.logoSubtitle}>{t('siteSubtitle')}</span>
				</div>

				<div className={styles.right}>
					<nav className={styles.desktopNav}>
						<NavMenu navItems={navItems} />
					</nav>
					<LocaleSwitcher locales={locales} />
					<Tooltip label={themeLabel}>
						<ThemeSwitcher aria-label={themeLabel} />
					</Tooltip>
				</div>
			</div>
		</header>
	);
}
