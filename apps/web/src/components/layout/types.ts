export interface LocaleOption {
	code: string;
	labelKey: string;
	switchToKey: string;
}

export interface NavItem {
	key: string;
	href: string;
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
