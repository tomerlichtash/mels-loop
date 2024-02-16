export type NavItemLocaleProps = Record<string, string>;

export type NavProps = {
	items: NavParsedNodes[];
};

export type NavItemDataProps = {
	id: string;
	type: string;
	url: string;
	locale: NavItemLocaleProps;
	icon?: string;
	target?: string;
};

export type NavSectionDataProps = {
	id: string;
	locale: NavItemLocaleProps;
	items: string[];
};

export type NavParsedNodes = {
	id: string;
	locale: Record<string, string>;
	items: NavItemDataProps[];
};
