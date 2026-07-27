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

/*
 * Search is hidden for now — trigger and shortcut both.
 *
 * Its index still points at pages this build does not serve: source hits go to
 * /sources#id, which is gone, and post hits to /blog/<slug>, which has never
 * been the route — those have always 404ed. Leaving the shortcut live while
 * hiding the button would keep both a keystroke away.
 *
 * Nothing is deleted. The dialog, the shortcut and the index generator all
 * stay, ready for the move to Pagefind.
 */
const SEARCH_ENABLED = false;

export function SearchableLayout({
	children,
	navItems,
	footerLinks,
	locales,
}: SearchableLayoutProps) {
	const [searchOpen, setSearchOpen] = useState(false);
	useSearchShortcut(() => SEARCH_ENABLED && setSearchOpen(true));

	return (
		<SiteLayout
			navItems={navItems}
			footerLinks={footerLinks}
			locales={locales}
			onSearchClick={SEARCH_ENABLED ? () => setSearchOpen(true) : undefined}
			searchSlot={
				SEARCH_ENABLED ? (
					<SearchDialog open={searchOpen} onOpenChange={setSearchOpen} />
				) : undefined
			}
		>
			{children}
		</SiteLayout>
	);
}
