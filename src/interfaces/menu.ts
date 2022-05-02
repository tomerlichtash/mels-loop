import { ComponentProps } from "./models";
import { IContentAuthors } from "./../locales/languages/types/authors";

type ItemType = "page" | "article" | "link";

export interface MenuItem {
	type: ItemType;
	title: string;
	description: string;
	url: string;
	author?: keyof IContentAuthors;
}

export interface MenuGroup {
	title: string;
	layout: string;
	content: MenuItem[];
}

export interface NavMenuProps extends ComponentProps {
	items: MenuGroup[];
}
