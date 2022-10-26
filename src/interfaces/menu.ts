import { IAuthors } from "../locales/languages/types/authors";
import { ILanguageKeys } from "../locales/languages/types/locale";

export type MenuItemLayout = "one" | "two" | "three";
export type MenuSectionType = "group" | "single";
export type MenuItemChildType = "article" | "page" | "link" | "external";
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
	type: MenuSectionType;
	meta: { layout: MenuItemLayout };
	children: string[];
}

export interface IMenuItem extends IMenuItemBase {
	type: MenuItemChildType;
	meta: { url?: string; icon?: string };
}

export interface IMenuData {
	id: string;
	keys: MenuItemKeys;
	type: MenuSectionType;
	meta: { layout: MenuItemLayout; url?: string };
	children: IMenuItem[];
}
