import type { Meta, StoryObj } from "@storybook/react";
import ThemeSelector from "../components/ui/ThemeSelector/ThemeSelector";
import { INITIAL_VIEWPORTS } from "@storybook/addon-viewport";

const meta = {
	title: "Site/ThemeSelector",
	component: ThemeSelector,
	parameters: {
		viewport: {
			viewports: INITIAL_VIEWPORTS,
		},
	},
	tags: ["autodocs"],
	argTypes: {},
} satisfies Meta<typeof ThemeSelector>;

export default meta;
type Story = StoryObj<typeof meta>;

const Desktop: Story = {
	args: {},
	render: function Render() {
		return <ThemeSelector />;
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
