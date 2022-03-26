import { MenuGroup } from "../components/nav/types";

export const navItems: MenuGroup[] = [
	{
		title: "NAV_ARTICLES_LABEL",
		layout: "one",
		content: [
			{
				type: "link",
				title: "PREFACE_TITLE",
				description: "PREFACE_DESCRIPTION",
				url: "/docs/preface",
			},
			{
				type: "link",
				title: "ABOUT_MELS_HACK_TITLE",
				description: "ABOUT_MELS_HACK_DESCRIPTION",
				url: "/docs/mels-hack",
			},
		],
	},
	{
		title: "NAV_RESOURCES_LABEL",
		layout: "two",
		content: [
			{
				type: "link",
				title: "Preface",
				description: "A preface to The Story of Mel by Tomer Lichtash",
				url: "/docs/preface",
			},
			{
				type: "link",
				title: "Mel's Hack",
				description: "About Mel's hack by David Frankiel",
				url: "/docs/mels-hack",
			},
		],
	},
];
