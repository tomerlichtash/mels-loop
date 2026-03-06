'use client';

import { type ReactNode, useState } from 'react';

import { MobileDrawer } from '../MobileDrawer/MobileDrawer';
import { SiteFooter } from '../SiteFooter/SiteFooter';
import { SiteHeader } from '../SiteHeader/SiteHeader';
import type { FooterLinkColumn, LocaleOption, NavItem } from '../types';
import styles from './SiteLayout.module.css';

interface SiteLayoutProps {
	children: ReactNode;
	navItems: NavItem[];
	footerLinks?: FooterLinkColumn[];
	locales: LocaleOption[];
	searchSlot?: ReactNode;
	onSearchClick?: () => void;
}

export function SiteLayout({
	children,
	navItems,
	footerLinks,
	locales,
	searchSlot,
	onSearchClick,
}: SiteLayoutProps) {
	const [drawerOpened, setDrawerOpened] = useState(false);

	return (
		<div className={styles.root}>
			<SiteHeader
				onMenuClick={() => setDrawerOpened(true)}
				onSearchClick={onSearchClick}
				navItems={navItems}
				locales={locales}
			/>

			<main className={styles.main}>
				<div className={styles.content}>{children}</div>
			</main>

			<SiteFooter linkColumns={footerLinks} />

			<MobileDrawer
				opened={drawerOpened}
				onClose={() => setDrawerOpened(false)}
				navItems={navItems}
			/>

			{searchSlot}
		</div>
	);
}
