import type { Meta, StoryObj } from "@storybook/react";
import Logo from "../components/ui/Logo";
import { INITIAL_VIEWPORTS } from "@storybook/addon-viewport";

const meta = {
	title: "Logo",
	component: Logo,
	parameters: {
		viewport: {
			viewports: INITIAL_VIEWPORTS,
		},
	},
	tags: ["autodocs"],
	argTypes: {},
} satisfies Meta<typeof Logo>;

export default meta;
type Story = StoryObj<typeof meta>;

const BaseStory: Story = {
	args: {},
	render: function Render({}) {
		return <Logo />;
	},
};

export const Desktop: Story = BaseStory;

export const Mobile: Story = {
	...BaseStory,
	parameters: {
		viewport: {
			defaultViewport: "iphonex",
		},
	},
};
