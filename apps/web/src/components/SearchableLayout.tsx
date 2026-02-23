'use client';

import {
	type FooterLinkColumn,
	type LocaleOption,
	type NavItem,
	SiteLayout,
} from '@mels-loop/ui/layout';
import { type ReactNode, useState } from 'react';

import { SearchDialog } from './SearchDialog/SearchDialog';
import { useSearchShortcut } from './SearchDialog/useSearchShortcut';

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
