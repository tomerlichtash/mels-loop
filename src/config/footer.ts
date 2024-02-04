import { ListItemProps } from '@components/list-item';
import { PUBLIC_PROJECT_GITHUB_ADDRESS } from 'consts';

export const footerLinks: Record<string, ListItemProps[]> = {
	SECTION_LABEL_PAGES: [
		{
			url: '/about',
			label: 'MENU_ITEM_LABEL_ID_ABOUT',
		},
		{
			url: '/blog',
			label: 'MENU_ITEM_LABEL_ID_BLOG',
		},
		{
			url: '/contribute',
			label: 'MENU_ITEM_LABEL_ID_CONTRIBUTE',
		},
	],
	SECTION_LABEL_LINKS: [
		{
			url: PUBLIC_PROJECT_GITHUB_ADDRESS,
			label: 'MENU_ITEM_LABEL_ID_GITHUB',
			target: '_blank',
		},
		{
			url: 'https://twitter.com/aboutmelsloop',
			label: 'MENU_ITEM_LABEL_ID_TWITTER',
			target: '_blank',
		},
		{
			url: '/contact',
			label: 'MENU_ITEM_LABEL_ID_CONTACT',
			target: '_blank',
		},
	],
};
