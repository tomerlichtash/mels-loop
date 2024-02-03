import { NavSectionDataProps } from '@components/HorizontalMenu/types';

export const MenuSections: NavSectionDataProps[] = [
	{
		id: 'articles',
		locale: {
			title: 'MENU_SECTION_LABEL_ARTICLES',
		},
		items: [
			'preface',
			'mel-kaye-bio',
			'mels-hack-the-missing-bits',
			'resources',
		],
	},
	{
		id: 'contact',
		locale: {
			title: 'MENU_SECTION_LABEL_CONTACT',
		},
		items: ['contact', 'twitter', 'github'],
	},
];

export const MobileMenuSections: NavSectionDataProps[] = [
	{
		id: 'articles',
		locale: {
			title: 'MENU_SECTION_LABEL_ARTICLES',
		},
		items: [
			'preface',
			'mel-kaye-bio',
			'mels-hack-the-missing-bits',
			'resources',
		],
	},
	{
		id: 'about',
		locale: {
			title: 'MENU_SECTION_LABEL_INFO',
		},
		items: ['about-mobile', 'blog'],
	},
	{
		id: 'contact',
		locale: {
			title: 'MENU_SECTION_LABEL_CONTACT',
		},
		items: ['twitter', 'github', 'contact'],
	},
];