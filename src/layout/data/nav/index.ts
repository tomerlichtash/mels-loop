import { default as menuSectionData } from './sections.json' assert { type: 'json' };
import { default as menuItemsData } from './items.json' assert { type: 'json' };
import type { NavItemDataProps, NavSectionDataProps } from '../../../components/nav/types';

export enum NavSectionId {
	TOPBAR = 'topbar',
	SIDEBAR = 'sidebar',
	FOOTER = 'footer',
}

type LayoutConfig = {
	menuSectionData: Record<NavSectionId, NavSectionDataProps[]>;
	menuItemsData: NavItemDataProps[];
};

const config: LayoutConfig = {
	menuSectionData: menuSectionData,
	menuItemsData: menuItemsData,
};

export default config;
