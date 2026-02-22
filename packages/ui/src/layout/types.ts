export interface LocaleOption {
	code: string;
	labelKey: string;
	switchToKey: string;
}

export interface NavStoryItem {
	slug: string;
	title: string;
	abstract: string;
	featured?: boolean;
	image?: string;
}

export interface NavItem {
	key: string;
	href: string;
	hasContent?: boolean;
	stories?: NavStoryItem[];
}

export interface FooterLink {
	label: string;
	href: string;
	external?: boolean;
	icon?: 'github' | 'twitter' | 'envelope' | 'info' | 'reader' | 'heart';
}

export interface FooterLinkColumn {
	titleKey: string;
	links: FooterLink[];
}
