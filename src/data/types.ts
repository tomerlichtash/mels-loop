export type NavItemProps = {
	id?: string;
	title?: string;
	subtitle?: string;
	url?: string;
	icon?: React.ReactNode;
	targetBlank?: boolean;
};

export type NavSectionProps = {
	title?: string;
	items: NavItemProps[];
};

export type NavSectionsData = Record<string, NavSectionProps>;
