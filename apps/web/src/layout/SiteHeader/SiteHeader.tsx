'use client';

import { useTranslation } from '@mels-loop/i18n/client';
import { useColorScheme } from '@mels-loop/ui/color-scheme';
import { Separator, Tooltip } from '@mels-loop/ui/primitives';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { memo, useEffect, useState } from 'react';

import { LocaleSwitcher } from '../LocaleSwitcher/LocaleSwitcher';
import { NavMenu } from '../Navigation/NavMenu';
import { ThemeSwitcher } from '../ThemeSwitcher/ThemeSwitcher';
import type { LocaleOption, NavItem } from '../types';
import styles from './SiteHeader.module.css';

interface SiteHeaderProps {
	onMenuClick: () => void;
	onSearchClick?: () => void;
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

function SearchTrigger({
	onClick,
	placeholder,
	label,
}: {
	onClick: () => void;
	placeholder: string;
	label: string;
}) {
	const [isMac, setIsMac] = useState(false);
	useEffect(() => {
		setIsMac(/Mac|iPhone|iPod|iPad/i.test(navigator.userAgent));
	}, []);

	return (
		<button
			type="button"
			className={styles.searchTrigger}
			onClick={onClick}
			aria-label={label}
		>
			<svg
				className={styles.searchIcon}
				width="14"
				height="14"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				strokeWidth="2.5"
				strokeLinecap="round"
				strokeLinejoin="round"
			>
				<circle cx="11" cy="11" r="8" />
				<line x1="21" y1="21" x2="16.65" y2="16.65" />
			</svg>
			<span className={styles.searchPlaceholder}>{placeholder}</span>
			<span className={styles.searchKbd}>
				<kbd>{isMac ? '\u2318' : 'Ctrl'}</kbd>
				<kbd>K</kbd>
			</span>
		</button>
	);
}

export function SiteHeader({
	onMenuClick,
	onSearchClick,
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
					<Separator orientation="vertical" className={styles.logoDivider} />
					<span className={styles.logoSubtitle}>{t('siteSubtitle')}</span>
				</div>

				<div className={styles.right}>
					<nav className={styles.desktopNav}>
						<NavMenu navItems={navItems} />
					</nav>
					{onSearchClick && (
						<SearchTrigger
							onClick={onSearchClick}
							placeholder={t('search.triggerPlaceholder')}
							label={t('search.open')}
						/>
					)}
					<LocaleSwitcher locales={locales} />
					<Tooltip label={themeLabel}>
						<ThemeSwitcher aria-label={themeLabel} />
					</Tooltip>
				</div>
			</div>
		</header>
	);
}
