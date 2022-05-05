import { IAuthors } from "../locales/languages/types/authors";
import { ILanguageKeys } from "../locales/languages/types/locale";

export type MenuItemLayout = "one" | "two" | "three";
export type MenuItemType = "group" | "single" | "child";
export type MenuItemChildType = "article" | "page" | "link";
export type MenuItemKey =
	| "title"
	| "description"
	| "abstract"
	| "cta_label"
	| "author";

export type MenuItemKeys = Partial<
	Record<MenuItemKey, keyof ILanguageKeys | keyof IAuthors>
>;

export interface IMenuItemBase {
	id: string;
	keys: MenuItemKeys;
}

export interface IMenuSection extends IMenuItemBase {
	type: MenuItemType;
	meta: { layout: MenuItemLayout };
	children: string[];
}

export interface IMenuItem extends IMenuItemBase {
	type: MenuItemChildType;
	meta: {
		url?: string;
	};
}

export interface IMenuData {
	id: string;
	keys: MenuItemKeys;
	type: MenuItemType;
	meta: { layout: MenuItemLayout; url?: string };
	children: IMenuItem[];
}
