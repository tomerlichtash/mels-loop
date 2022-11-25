import { IMenuItem, IMenuSection } from "../interfaces/menu";
import { PUBLIC_PROJECT_GITHUB_ADDRESS } from "../consts";

export const MenuSections: IMenuSection[] = [
	{
		id: "codex",
		type: "group",
		meta: {
			layout: "one",
		},
		keys: {
			title: "Codex",
		},
		children: [
			"the-story-of-mel",
			"unix-koans",
		],
	},
	{
		id: "articles1",
		type: "group",
		meta: {
			layout: "one",
		},
		keys: {
			title: "MENU_SECTION_LABEL_ARTICLES",
		},
		children: [
			"preface",
			"mels-hack-the-missing-bits",
			"resources"
		],
	},
	{
		id: "info",
		type: "single",
		meta: {
			layout: "two",
		},
		keys: {},
		children: ["about"],
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
		children: ["contact", "twitter", "github"],
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
		children: [
			"preface",
			"mels-hack-the-missing-bits",
			"resources"
		],
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
		children: ["about-mobile", "blog"],
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
		id: "the-story-of-mel",
		type: "codex",
		meta: {
			url: "/docs/the-story-of-mel",
		},
		keys: {
			title: "THE_STORY_OF_MEL",
			author: "ED_NATHER",
		},
	},
	{
		id: "unix-koans",
		type: "codex",
		meta: {
			url: "/docs/unix-koans",
		},
		keys: {
			title: "UNIX_KOANS",
			author: "ERIC_STEVEN_RAYMOND",
		},
	},
	{
		id: "preface",
		type: "article",
		meta: {
			url: "/docs/the-story-of-mel/pages/preface",
		},
		keys: {
			title: "MENU_ITEM_LABEL_ID_PREFACE",
			author: "AUTHOR_TOMER_LICHTASH",
		},
	},
	{
		id: "mels-hack-the-missing-bits",
		type: "article",
		meta: {
			url: "/docs/the-story-of-mel/pages/mels-hack-the-missing-bits",
		},
		keys: {
			title: "MENU_ITEM_LABEL_ID_MELS_HACK_THE_MISSING_BITS",
			author: "AUTHOR_DAVID_FRENKIEL",
		},
	},
	{
		id: "resources",
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
		id: "contribute-mobile",
		type: "page",
		meta: {
			url: "/contribute",
		},
		keys: {
			title: "MENU_ITEM_LABEL_ID_CONTRIBUTE",
			description: "MENU_ITEM_DESC_SHORT_ID_CONTRIBUTE",
			cta_label: "MENU_ITEM_LABEL_EXCERPT_SHOW_MORE",
		},
	},
	{
		id: "contact",
		type: "page",
		meta: {
			url: "/contact",
			icon: "pencil",
		},
		keys: {
			title: "MENU_ITEM_LABEL_ID_CONTACT",
			description: "MENU_ITEM_DESC_ID_CONTACT",
		},
	},
	{
		id: "twitter",
		type: "external",
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
		type: "external",
		meta: {
			url: PUBLIC_PROJECT_GITHUB_ADDRESS,
			icon: "github",
		},
		keys: {
			title: "MENU_ITEM_LABEL_ID_GITHUB",
			description: "MENU_ITEM_DESC_ID_GITHUB",
		},
	},
];
