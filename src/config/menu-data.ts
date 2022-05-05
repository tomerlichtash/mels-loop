import { IMenuItem, IMenuSection } from "../interfaces/menu";

export const TopBarMenuSections: IMenuSection[] = [
	{
		id: "articles1",
		type: "group",
		meta: {
			layout: "one",
		},
		keys: {
			title: "MENU_ITEM_TITLE_ARTICLES",
		},
		children: ["preface", "melshack"],
	},
	{
		id: "about",
		type: "single",
		meta: {
			layout: "two",
		},
		keys: {
			title: "MENU_SECTION_CONTACT",
		},
		children: ["about", "contribute"],
	},
	{
		id: "contact",
		type: "group",
		meta: {
			layout: "one",
		},
		keys: {
			title: "MENU_SECTION_CONTACT",
		},
		children: ["twitter", "github"],
	},
];

export const MenuItems: IMenuItem[] = [
	{
		id: "preface",
		type: "article",
		meta: {
			url: "/docs/preface",
			// icon: "fileText",
		},
		keys: {
			title: "MENU_ITEM_ENTRY_TITLE_ARTICLE_PREFACE",
			description: "MENU_ITEM_ENTRY_DESC_ARTICLE_PREFACE",
			author: "AUTHOR_TOMER_LICHTASH",
		},
	},
	{
		id: "melshack",
		type: "article",
		meta: {
			url: "/docs/mels-hack",
			// icon: "fileText",
		},
		keys: {
			title: "MENU_ITEM_ENTRY_TITLE_ARTICLE_ABOUT_THE_HACK",
			description: "MENU_ITEM_ENTRY_DESC_ARTICLE_ABOUT_THE_HACK",
			author: "AUTHOR_DAVID_FRANKIEL",
		},
	},
	{
		id: "page1",
		type: "page",
		meta: {
			url: "/docs/resources",
			// icon: "list",
		},
		keys: {
			title: "MENU_ITEM_ENTRY_TITLE_PAGE_RESOURCES",
			description: "MENU_ITEM_ENTRY_DESC_PAGE_RESOURCES",
		},
	},
	{
		id: "about",
		type: "page",
		meta: {
			// layout: "two",
			url: "/about",
		},
		keys: {
			title: "MENU_ITEM_ENTRY_TITLE_STATIC_PAGE_ABOUT",
			description: "ABSTRACT_ABOUT",
			cta_label: "LEARN_MORE",
		},
	},
	{
		id: "blog",
		type: "page",
		meta: {
			// layout: "two",
			url: "/posts",
		},
		keys: {
			title: "MENU_ITEM_ENTRY_TITLE_STATIC_PAGE_BLOG",
			description: "ABSTRACT_ABOUT",
			cta_label: "LEARN_MORE",
		},
	},
	{
		id: "contribute",
		type: "page",
		meta: {
			url: "/contribute",
		},
		keys: {
			title: "MENU_ITEM_ENTRY_TITLE_STATIC_PAGE_CONTRIBUTE",
			description: "MENU_SECTION_CONTACT",
			cta_label: "LEARN_MORE",
		},
	},
	{
		id: "twitter",
		type: "link",
		meta: {
			url: "https://twitter.com/aboutmelsloop",
			// icon: "twitter",
		},
		keys: {
			title: "MENU_ITEM_ENTRY_TITLE_LINK_TWITTER",
			description: "MENU_ITEM_ENTRY_DESC_LINK_TWITTER",
		},
	},
	{
		id: "github",
		type: "link",
		meta: {
			url: "https://github.com/tomerlichtash/mels-loop-nextjs",
			// icon: "github",
		},
		keys: {
			title: "MENU_ITEM_ENTRY_TITLE_LINK_GITHUB",
			description: "MENU_ITEM_ENTRY_DESC_LINK_GITHUB",
		},
	},
];
