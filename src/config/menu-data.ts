import { IMenuItem, IMenuSection } from "../interfaces/menu";

export const MenuSections: IMenuSection[] = [
	{
		id: "articles1",
		type: "group",
		meta: {
			layout: "one",
		},
		keys: {
			title: "MENU_SECTION_LABEL_ARTICLES",
		},
		children: ["preface", "melshack", "page1"],
	},
	{
		id: "info",
		type: "single",
		meta: {
			layout: "two",
		},
		keys: {},
		children: ["about", "contribute"],
	},
	{
		id: "contact",
		type: "group",
		meta: {
			layout: "one",
		},
		keys: {
			title: "MENU_SECTION_LABEL_CONTACT",
		},
		children: ["twitter", "github"],
	},
];

export const MobileMenuSections: IMenuSection[] = [
	{
		id: "articles1",
		type: "group",
		meta: {
			layout: "one",
		},
		keys: {
			title: "MENU_SECTION_LABEL_ARTICLES",
		},
		children: ["preface", "melshack", "page1"],
	},
	{
		id: "about",
		type: "single",
		meta: {
			layout: "two",
		},
		keys: {
			title: "MENU_SECTION_LABEL_INFO",
		},
		children: ["about-mobile", "blog", "contribute"],
	},
	{
		id: "contact",
		type: "group",
		meta: {
			layout: "one",
		},
		keys: {
			title: "MENU_SECTION_LABEL_CONTACT",
		},
		children: ["twitter", "github", "contact"],
	},
];

export const MenuItems: IMenuItem[] = [
	{
		id: "preface",
		type: "article",
		meta: {
			url: "/docs/preface",
		},
		keys: {
			title: "MENU_ITEM_LABEL_ID_PREFACE",
			// description: "MENU_ITEM_DESC_ID_PREFACE",
			author: "AUTHOR_TOMER_LICHTASH",
		},
	},
	{
		id: "melshack",
		type: "article",
		meta: {
			url: "/docs/mels-hack",
		},
		keys: {
			title: "MENU_ITEM_LABEL_ID_MELSHACK",
			// description: "MENU_ITEM_DESC_ID_MELSHACK",
			author: "AUTHOR_DAVID_FRANKIEL",
		},
	},
	{
		id: "page1",
		type: "page",
		meta: {
			url: "/docs/resources",
			icon: "list",
		},
		keys: {
			title: "MENU_ITEM_LABEL_ID_RESOURCES",
			description: "MENU_ITEM_DESC_ID_RESOURCES",
		},
	},
	{
		id: "about",
		type: "page",
		meta: {
			url: "/about",
		},
		keys: {
			title: "MENU_ITEM_LABEL_ID_ABOUT",
			description: "MENU_ITEM_DESC_ID_ABOUT",
			cta_label: "MENU_ITEM_LABEL_EXCERPT_SHOW_MORE",
		},
	},
	{
		id: "about-mobile",
		type: "page",
		meta: {
			url: "/about",
		},
		keys: {
			title: "MENU_ITEM_LABEL_ID_ABOUT",
			description: "MENU_ITEM_DESC_SHORT_ID_ABOUT",
			cta_label: "MENU_ITEM_LABEL_EXCERPT_SHOW_MORE",
		},
	},
	{
		id: "blog",
		type: "page",
		meta: {
			url: "/posts",
		},
		keys: {
			title: "MENU_ITEM_LABEL_ID_BLOG",
			description: "MENU_ITEM_DESC_ID_BLOG",
			cta_label: "MENU_ITEM_LABEL_EXCERPT_SHOW_MORE",
		},
	},
	{
		id: "contribute",
		type: "page",
		meta: {
			url: "/contribute",
		},
		keys: {
			title: "MENU_ITEM_LABEL_ID_CONTRIBUTE",
			description: "MENU_ITEM_DESC_ID_CONTRIBUTE",
			cta_label: "MENU_ITEM_LABEL_EXCERPT_SHOW_MORE",
		},
	},
	{
		id: "contact",
		type: "page",
		meta: {
			url: "/contact",
			icon: "github",
		},
		keys: {
			title: "MENU_ITEM_LABEL_ID_CONTACT",
			description: "MENU_ITEM_DESC_ID_CONTACT",
		},
	},
	{
		id: "twitter",
		type: "link",
		meta: {
			url: "https://twitter.com/aboutmelsloop",
			icon: "twitter",
		},
		keys: {
			title: "MENU_ITEM_LABEL_ID_TWITTER",
			description: "MENU_ITEM_DESC_ID_TWITTER",
		},
	},
	{
		id: "github",
		type: "link",
		meta: {
			url: "https://github.com/tomerlichtash/mels-loop-nextjs",
			icon: "github",
		},
		keys: {
			title: "MENU_ITEM_LABEL_ID_GITHUB",
			description: "MENU_ITEM_DESC_ID_GITHUB",
		},
	},
];
