import type { Meta, StoryObj } from "@storybook/react";
import HorizontalMenu from "../components/ui/HorizontalMenu";
import { INITIAL_VIEWPORTS } from "@storybook/addon-viewport";

const meta = {
	title: "HorizontalNav",
	component: HorizontalMenu,
	parameters: {
		viewport: {
			viewports: INITIAL_VIEWPORTS,
		},
	},
	tags: ["autodocs"],
	argTypes: {},
} satisfies Meta<typeof HorizontalMenu>;

export default meta;
type Story = StoryObj<typeof meta>;

const Desktop: Story = {
	args: {},
	render: function Render() {
		return <HorizontalMenu />;
	},
};

export const Mobile: Story = {
	...Desktop,
	parameters: {
		viewport: {
			defaultViewport: "iphonex",
		},
	},
};
