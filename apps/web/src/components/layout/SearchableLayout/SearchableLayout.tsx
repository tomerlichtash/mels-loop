'use client';

import { type ReactNode, useState } from 'react';

import { SearchDialog } from '@/components/search/SearchDialog/SearchDialog';
import { useSearchShortcut } from '@/components/search/SearchDialog/useSearchShortcut';

import { SiteLayout } from '../SiteLayout/SiteLayout';
import type { FooterLinkColumn, LocaleOption, NavItem } from '../types';

interface SearchableLayoutProps {
	children: ReactNode;
	navItems: NavItem[];
	footerLinks?: FooterLinkColumn[];
	locales: LocaleOption[];
}

export function SearchableLayout({
	children,
	navItems,
	footerLinks,
	locales,
}: SearchableLayoutProps) {
	const [searchOpen, setSearchOpen] = useState(false);
	useSearchShortcut(() => setSearchOpen(true));

	return (
		<SiteLayout
			navItems={navItems}
			footerLinks={footerLinks}
			locales={locales}
			onSearchClick={() => setSearchOpen(true)}
			searchSlot={
				<SearchDialog open={searchOpen} onOpenChange={setSearchOpen} />
			}
		>
			{children}
		</SiteLayout>
	);
}
