'use client';

import { useTranslation } from '@mels-loop/i18n/client';
import { useColorScheme } from '@mels-loop/ui/color-scheme';
import { Tooltip } from '@mels-loop/ui/primitives';
import { usePathname } from 'next/navigation';
import { useCallback, useEffect, useRef, useState } from 'react';

import { BurgerButton } from '../BurgerButton/BurgerButton';
import { LocaleSwitcher } from '../LocaleSwitcher/LocaleSwitcher';
import { Logo } from '../Logo/Logo';
import { ThemeSwitcher } from '../ThemeSwitcher/ThemeSwitcher';
import type { LocaleOption } from '../types';
import styles from './SiteHeader.module.css';

const SCROLL_THRESHOLD = 10;

interface SiteHeaderProps {
	onMenuClick: () => void;
	locales: LocaleOption[];
}

export function SiteHeader({ onMenuClick, locales }: SiteHeaderProps) {
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
						{/* <span className={styles.logoSubtitle}>{t('siteSubtitle')}</span> */}
					</div>

					<div className={styles.right}>
						{/*
						 * The whole group moves into the drawer on mobile. Brand plus
						 * this many controls does not fit a 390px bar — that crowding is
						 * what was breaking "MEL'S LOOP" across two lines.
						 */}
						{/*
						 * One bordered group rather than controls at arm's length from
						 * each other. The border is what makes them read as a set.
						 *
						 * Search stood outside this pair as the one control that acted
						 * rather than held a setting; with it gone the group is theme and
						 * language, which are the same kind of thing.
						 */}
						<div className={styles.cluster}>
							<div className={styles.settings}>
								<Tooltip label={themeLabel}>
									<ThemeSwitcher aria-label={themeLabel} />
								</Tooltip>
								<LocaleSwitcher locales={locales} />
							</div>
						</div>
						{/* Last in the row, so the brand keeps the leading edge at every
						 * width. */}
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
