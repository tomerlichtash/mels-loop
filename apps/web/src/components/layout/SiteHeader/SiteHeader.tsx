'use client';

import { useTranslation } from '@mels-loop/i18n/client';
import { useColorScheme } from '@mels-loop/ui/color-scheme';
import { Separator, Tooltip } from '@mels-loop/ui/primitives';
import { usePathname } from 'next/navigation';
import { useCallback, useEffect, useRef, useState } from 'react';

import { BurgerButton } from '../BurgerButton/BurgerButton';
import { LocaleSwitcher } from '../LocaleSwitcher/LocaleSwitcher';
import { Logo } from '../Logo/Logo';
import { NavMenu } from '../NavMenu/NavMenu';
import { SearchTrigger } from '../SearchTrigger/SearchTrigger';
import { ThemeSwitcher } from '../ThemeSwitcher/ThemeSwitcher';
import type { LocaleOption, NavItem } from '../types';
import styles from './SiteHeader.module.css';

const SCROLL_THRESHOLD = 10;

interface SiteHeaderProps {
	onMenuClick: () => void;
	onSearchClick?: () => void;
	navItems: NavItem[];
	locales: LocaleOption[];
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

	const [hidden, setHidden] = useState(false);
	const lastScrollY = useRef(0);

	const onScroll = useCallback(() => {
		const y = window.scrollY;
		const delta = y - lastScrollY.current;

		if (Math.abs(delta) < SCROLL_THRESHOLD) return;

		const isHidden = delta > 0 && y > 0;
		setHidden(isHidden);
		document.documentElement.style.setProperty(
			'--ml-header-offset',
			isHidden ? '0px' : 'var(--ml-header-height)',
		);
		lastScrollY.current = y;
	}, []);

	useEffect(() => {
		window.addEventListener('scroll', onScroll, { passive: true });
		return () => window.removeEventListener('scroll', onScroll);
	}, [onScroll]);

	return (
		<>
			<header className={`${styles.root} ${hidden ? styles.hidden : ''}`}>
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
			<span
				className={`${styles.strip} ${hidden ? styles.stripVisible : ''} gradient-strip`}
			/>
		</>
	);
}
