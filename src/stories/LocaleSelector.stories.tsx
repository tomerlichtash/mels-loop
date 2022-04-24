import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { LocaleSelector } from "../components/locale-selector/locale-selector";
import {
	// st,
	classes,
} from "../components/locale-selector/locale-selector.st.css";

export default {
	title: "Composite/LocaleSelector",
	component: LocaleSelector,
} as ComponentMeta<typeof LocaleSelector>;

const Template: ComponentStory<typeof LocaleSelector> = (args) => (
	<LocaleSelector {...args} className={classes.root} />
);

const options = [
	{
		id: "en",
		label: "EN",
	},
	{
		id: "he",
		label: "ע",
	},
];

export const Normal = Template.bind({});
Normal.args = {
	options,
	onLocaleChange: (id: string) => new Promise(() => id),
};
