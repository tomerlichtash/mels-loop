'use client';

import { type ReactNode, useState } from 'react';

import { MobileDrawer } from '../Navigation/MobileDrawer';
import { SiteFooter } from '../SiteFooter/SiteFooter';
import { SiteHeader } from '../SiteHeader/SiteHeader';
import type { FooterLinkColumn, LocaleOption, NavItem } from '../types';
import styles from './SiteLayout.module.css';

interface SiteLayoutProps {
	children: ReactNode;
	navItems: NavItem[];
	footerLinks?: FooterLinkColumn[];
	locales: LocaleOption[];
}

export function SiteLayout({
	children,
	navItems,
	footerLinks,
	locales,
}: SiteLayoutProps) {
	const [drawerOpened, setDrawerOpened] = useState(false);

	return (
		<div className={styles.root}>
			<SiteHeader
				onMenuClick={() => setDrawerOpened(true)}
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
		</div>
	);
}
