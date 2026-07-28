export interface LocaleOption {
	code: string;
	labelKey: string;
	switchToKey: string;
}

export interface NavItem {
	/** Dictionary key, used when `label` is absent. */
	key: string;
	href: string;
	/**
	 * An already-resolved, already-localised label.
	 *
	 * Article titles come from the content rather than the dictionary, so they
	 * arrive translated and have no key to look up.
	 */
	label?: string;
	/** Byline, shown under the label. Articles have one; site pages do not. */
	author?: string;
}

export interface FooterLink {
	label: string;
	href: string;
	external?: boolean;
}

export interface FooterLinkColumn {
	titleKey: string;
	links: FooterLink[];
}
