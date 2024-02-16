import { default as menuSectionData } from 'config/navSections.json' assert { type: 'json' };
import { default as menuItemsData } from 'config/navItems.json' assert { type: 'json' };
import { default as footerLinksData } from 'config/layoutFooterLinks.json' assert { type: 'json' };
import type {
	NavItemDataProps,
	NavSectionDataProps,
} from '../components/HorizontalMenu/types';
import { LinkProps } from 'components/link/Link';

type LinkSectionProps = {
	label: string;
	items: LinkProps[];
};

type LayoutConfig = {
	menuSectionData: NavSectionDataProps[];
	menuItemsData: NavItemDataProps[];
	footerLinksData: LinkSectionProps[];
};

const config: LayoutConfig = {
	menuSectionData: menuSectionData,
	menuItemsData: menuItemsData,
	footerLinksData: footerLinksData,
};

export default config;
