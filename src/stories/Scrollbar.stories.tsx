import type { Meta, StoryObj } from "@storybook/react";
import Scrollbar from "../components/ui/Scrollbar";
import { INITIAL_VIEWPORTS } from "@storybook/addon-viewport";

const meta = {
	title: "Scrollbar",
	component: Scrollbar,
	parameters: {
		viewport: {
			viewports: INITIAL_VIEWPORTS,
		},
	},
	tags: ["autodocs"],
	argTypes: {},
} satisfies Meta<typeof Scrollbar>;

export default meta;
type Story = StoryObj<typeof meta>;

const BaseStory: Story = {
	args: {
		children: (
			<div style={{ height: "1000px" }}>
				<div>Content</div>
			</div>
		),
	},
	render: function Render({ children }) {
		return (
			<Scrollbar height="100vh" textDirection="ltr">
				{children}
			</Scrollbar>
		);
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
