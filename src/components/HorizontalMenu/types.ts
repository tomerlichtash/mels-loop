type NavItemLocaleProps = Record<string, string>;

type NavItemDataProps = {
	id: string;
	type: 'article' | 'page' | 'external';
	url: string;
	locale: NavItemLocaleProps;
	icon?: string;
	target?: string;
};

type NavSectionDataProps = {
	id: string;
	locale: NavItemLocaleProps;
	items: string[];
};

type NavParsedNodes = {
	id: string;
	locale: Record<string, string>;
	items: NavItemDataProps[];
};

type NavProps = {
	items: NavParsedNodes[];
};

export type {
	NavItemLocaleProps,
	NavSectionDataProps,
	NavItemDataProps,
	NavParsedNodes,
	NavProps,
};
