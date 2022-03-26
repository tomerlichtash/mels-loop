import { ComponentProps } from "../../interfaces/models";

interface MenuItem {
	type: string;
	title: string;
	description: string;
	url: string;
}

export interface MenuGroup {
	title: string;
	layout: string;
	content: MenuItem[];
}

export interface NavMenuProps extends ComponentProps {
	items: MenuGroup[];
}
