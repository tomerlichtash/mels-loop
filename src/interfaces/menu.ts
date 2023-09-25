export type MenuItemLayout = "one" | "two" | "three";

export type MenuSectionType = "group" | "single";

export type MenuItemChildType =
	| "codex"
	| "article"
	| "page"
	| "link"
	| "external";

export type MenuItemKey =
	| "title"
	| "description"
	| "abstract"
	| "cta_label"
	| "author";

export type MenuItemKeys = Partial<Record<MenuItemKey, string>>;

export interface IMenuItemBase {
	id: string;
	keys: MenuItemKeys;
}

export interface IMenuSection extends IMenuItemBase {
	type: MenuSectionType;
	meta: { layout: MenuItemLayout };
	keys: Record<string, string>;
	children: string[];
}

export interface IMenuItem extends IMenuItemBase {
	type: MenuItemChildType;
	meta: { url?: string; icon?: string };
}

export type MenuItemProps = {
	id: string;
	locale: MenuItemKeys;
	url: string;
	target?: "blank" | null;
	items: IMenuItem[];
};
