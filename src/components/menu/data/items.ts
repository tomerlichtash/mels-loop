import { PUBLIC_PROJECT_GITHUB_ADDRESS } from "../../../consts";

export const MenuItems = [
	{
		id: "preface",
		type: "article",
		url: "/docs/the-story-of-mel/pages/preface",
		icon: "file",
		locale: {
			title: "MENU_ITEM_LABEL_ID_PREFACE",
			author: "AUTHOR_TOMER_LICHTASH",
		},
	},
	{
		id: "mel-kaye-bio",
		type: "article",
		url: "/docs/the-story-of-mel/pages/mel-kaye-cv",
		icon: "file",
		locale: {
			title: "MENU_ITEM_LABEL_ID_MEL_KAYE_BIO",
			author: "AUTHOR_TOMER_LICHTASH",
		},
	},
	{
		id: "mels-hack-the-missing-bits",
		type: "article",
		url: "/docs/the-story-of-mel/pages/mels-hack-the-missing-bits",
		icon: "file",
		locale: {
			title: "MENU_ITEM_LABEL_ID_MELS_HACK_THE_MISSING_BITS",
			author: "AUTHOR_DAVID_FRENKIEL",
		},
	},
	{
		id: "resources",
		type: "page",
		url: "/docs/the-story-of-mel/pages/resources",
		icon: "list",
		locale: {
			title: "MENU_ITEM_LABEL_ID_RESOURCES",
			description: "MENU_ITEM_DESC_ID_RESOURCES",
		},
	},
	{
		id: "about",
		type: "page",
		url: "/about",
		locale: {
			title: "MENU_ITEM_LABEL_ID_ABOUT",
			description: "MENU_ITEM_DESC_ID_ABOUT",
			buttonLabel: "MENU_ITEM_LABEL_EXCERPT_SHOW_MORE",
		},
	},
	{
		id: "about-mobile",
		type: "page",
		url: "/about",
		locale: {
			title: "MENU_ITEM_LABEL_ID_ABOUT",
			description: "MENU_ITEM_DESC_SHORT_ID_ABOUT",
			buttonLabel: "MENU_ITEM_LABEL_EXCERPT_SHOW_MORE",
		},
	},
	{
		id: "blog",
		type: "page",
		url: "/posts",
		locale: {
			title: "MENU_ITEM_LABEL_ID_BLOG",
			description: "MENU_ITEM_DESC_ID_BLOG",
			buttonLabel: "MENU_ITEM_LABEL_EXCERPT_SHOW_MORE",
		},
	},
	{
		id: "contribute",
		type: "page",
		url: "/contribute",
		locale: {
			title: "MENU_ITEM_LABEL_ID_CONTRIBUTE",
			description: "MENU_ITEM_DESC_ID_CONTRIBUTE",
			buttonLabel: "MENU_ITEM_LABEL_EXCERPT_SHOW_MORE",
		},
	},
	{
		id: "contribute-mobile",
		type: "page",
		url: "/contribute",
		locale: {
			title: "MENU_ITEM_LABEL_ID_CONTRIBUTE",
			description: "MENU_ITEM_DESC_SHORT_ID_CONTRIBUTE",
			buttonLabel: "MENU_ITEM_LABEL_EXCERPT_SHOW_MORE",
		},
	},
	{
		id: "contact",
		type: "page",
		url: "/contact",
		icon: "pencil",
		locale: {
			title: "MENU_ITEM_LABEL_ID_CONTACT",
			description: "MENU_ITEM_DESC_ID_CONTACT",
		},
	},
	{
		id: "twitter",
		type: "external",
		url: "https://twitter.com/aboutmelsloop",
		icon: "twitter",
		locale: {
			title: "MENU_ITEM_LABEL_ID_TWITTER",
			description: "MENU_ITEM_DESC_ID_TWITTER",
		},
	},
	{
		id: "github",
		type: "external",
		url: PUBLIC_PROJECT_GITHUB_ADDRESS,
		icon: "github",
		target: "_blank",
		locale: {
			title: "MENU_ITEM_LABEL_ID_GITHUB",
			description: "MENU_ITEM_DESC_ID_GITHUB",
		},
	},
];
