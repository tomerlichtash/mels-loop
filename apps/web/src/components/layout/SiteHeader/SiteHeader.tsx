'use client';

import { useTranslation } from '@mels-loop/i18n/client';
import { useColorScheme } from '@mels-loop/ui/color-scheme';
import { Separator, Tooltip } from '@mels-loop/ui/primitives';
import { usePathname } from 'next/navigation';
import { useCallback, useEffect, useRef, useState } from 'react';

import { BurgerButton } from '../BurgerButton/BurgerButton';
import { LocaleSwitcher } from '../LocaleSwitcher/LocaleSwitcher';
import { Logo } from '../Logo/Logo';
import { SearchTrigger } from '../SearchTrigger/SearchTrigger';
import { ThemeSwitcher } from '../ThemeSwitcher/ThemeSwitcher';
import type { LocaleOption } from '../types';
import styles from './SiteHeader.module.css';

const SCROLL_THRESHOLD = 10;

interface SiteHeaderProps {
	onMenuClick: () => void;
	onSearchClick?: () => void;
	locales: LocaleOption[];
}

export function SiteHeader({
	onMenuClick,
	onSearchClick,
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
						<Logo isHome={isHome} siteTitle={t('siteTitle')} />
						<Separator orientation="vertical" className={styles.logoDivider} />
						<span className={styles.logoSubtitle}>{t('siteSubtitle')}</span>
					</div>

					<div className={styles.right}>
						{/*
						 * The whole group moves into the drawer on mobile. Brand plus
						 * this many controls does not fit a 390px bar — that crowding is
						 * what was breaking "MEL'S LOOP" across two lines.
						 */}
						{/*
						 * One bordered group, divided into segments, rather than five
						 * separate controls at arm's length from each other. The border
						 * is what makes them read as a set; the rules inside it are what
						 * keep theme, language and search legible as three distinct
						 * things.
						 */}
						<div className={styles.cluster}>
							{/* Configuration: how the site is presented. These two hold a
							    setting; they sit together and stay quiet. */}
							<div className={styles.settings}>
								<Tooltip label={themeLabel}>
									<ThemeSwitcher aria-label={themeLabel} />
								</Tooltip>
								<LocaleSwitcher locales={locales} />
							</div>
							{/* An action: it does something rather than holding a state,
							    so it stands apart and carries full strength. */}
							{onSearchClick && (
								<SearchTrigger
									onClick={onSearchClick}
									label={t('search.open')}
								/>
							)}
						</div>
						{/* Last in the row, so the brand keeps the leading edge at every
						 * width and the trigger sits with the other actions. */}
						<BurgerButton onClick={onMenuClick} />
					</div>
				</div>
			</header>
			<span
				className={`${styles.strip} ${hidden ? styles.stripVisible : ''} gradient-strip`}
			/>
		</>
	);
}
