import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { Button } from "../components/ui/button/button";

const SampleComp = Button;

export default {
	title: "UI/Button",
	component: SampleComp,
} as ComponentMeta<typeof SampleComp>;

const Template: ComponentStory<typeof SampleComp> = (args) => (
	<SampleComp {...args} />
);

export const Normal = Template.bind({});
Normal.args = {
	label: "Some Label",
	link: "http://melsloop.com",
};
