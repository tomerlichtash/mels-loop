import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { LocaleSelector } from "../components/locale-selector/locale-selector";

const SampleComp = LocaleSelector;

export default {
	title: "Composite/LocaleSelector",
	component: SampleComp,
} as ComponentMeta<typeof SampleComp>;

const Template: ComponentStory<typeof SampleComp> = (args) => (
	<SampleComp {...args} />
);

export const Normal = Template.bind({});
Normal.args = {
	options: [
		{
			id: "en",
			label: "EN",
		},
		{
			id: "he",
			label: "ע",
		},
	],
	onLocaleChange: (id: string) => new Promise(() => {}),
};
