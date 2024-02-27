import { default as menuSectionData } from './sections.json' assert { type: 'json' };
import { default as menuItemsData } from './items.json' assert { type: 'json' };
import type {
	NavItemDataProps,
	NavSectionDataProps,
} from '../../../components/nav/types';

type LayoutConfig = {
	menuSectionData: Record<string, NavSectionDataProps[]>;
	menuItemsData: NavItemDataProps[];
};

const config: LayoutConfig = {
	menuSectionData: menuSectionData,
	menuItemsData: menuItemsData,
};

export default config;
