import { MenuGroup } from "../components/nav/types";

export const navItems: MenuGroup[] = [
	{
		title: "MENU_ITEM_TITLE_ARTICLES",
		layout: "one",
		content: [
			{
				type: "article",
				title: "MENU_ITEM_ENTRY_TITLE_ARTICLE_PREFACE",
				description: "MENU_ITEM_ENTRY_DESC_ARTICLE_PREFACE",
				url: "/docs/preface",
				author: "AUTHOR_TOMER_LICHTASH",
			},
			{
				type: "article",
				title: "MENU_ITEM_ENTRY_TITLE_ARTICLE_ABOUT_THE_HACK",
				description: "MENU_ITEM_ENTRY_DESC_ARTICLE_ABOUT_THE_HACK",
				url: "/docs/mels-hack",
				author: "AUTHOR_DAVID_FRANKIEL",
			},
		],
	},
	{
		title: "MENU_ITEM_TITLE_RESOURCES",
		layout: "two",
		content: [
			{
				type: "link",
				title: "MENU_ITEM_ENTRY_TITLE_LINK_WIKIPEDIA",
				description: "MENU_ITEM_ENTRY_DESC_LINK_WIKIPEDIA",
				url: "/docs/preface",
			},
			{
				type: "page",
				title: "MENU_ITEM_ENTRY_TITLE_PAGE_RESOURCES",
				description: "MENU_ITEM_ENTRY_DESC_PAGE_RESOURCES",
				url: "/docs/mels-hack",
			},
		],
	},
	{
		title: "MENU_ITEM_TITLE_ABOUT",
		layout: "two",
		content: [
			{
				type: "page",
				title: "MENU_ITEM_ENTRY_TITLE_STATIC_PAGE_ABOUT",
				description: "MENU_ITEM_ENTRY_DESC_STATIC_PAGE_ABOUT",
				url: "/docs/preface",
			},
			{
				type: "page",
				title: "MENU_ITEM_ENTRY_TITLE_STATIC_PAGE_BLOG",
				description: "MENU_ITEM_ENTRY_DESC_STATIC_PAGE_BLOG",
				url: "/posts",
			},
			{
				type: "page",
				title: "MENU_ITEM_ENTRY_TITLE_STATIC_PAGE_CONTRIBUTE",
				description: "MENU_ITEM_ENTRY_DESC_STATIC_PAGE_CONTRIBUTE",
				url: "/docs/mels-hack",
			},
			{
				type: "link",
				title: "MENU_ITEM_ENTRY_TITLE_LINK_TWITTER",
				description: "MENU_ITEM_ENTRY_DESC_LINK_TWITTER",
				url: "https://twitter.com/aboutmelsloop",
			},
			{
				type: "link",
				title: "MENU_ITEM_ENTRY_TITLE_LINK_GITHUB",
				description: "MENU_ITEM_ENTRY_DESC_LINK_GITHUB",
				url: "https://github.com/tomerlichtash/mels-loop-nextjs",
			},
		],
	},
];
