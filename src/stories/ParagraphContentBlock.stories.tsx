import type { Meta, StoryObj } from "@storybook/react";
import ParagraphContentBlock from "../components/content/content-blocks/paragraph";
import { INITIAL_VIEWPORTS } from "@storybook/addon-viewport";
import mockParagraphData from "./mocks/mockParagraphData";

const meta = {
	title: "ContentBlocks/Paragraph",
	component: ParagraphContentBlock,
	parameters: {
		viewport: {
			viewports: INITIAL_VIEWPORTS,
		},
	},
	tags: ["autodocs"],
	argTypes: {},
} satisfies Meta<typeof ParagraphContentBlock>;

export default meta;
type Story = StoryObj<typeof meta>;

const BaseStory: Story = {
	args: {},
	render: function Render() {
		return (
			<ParagraphContentBlock
				key="mockKey"
				componentData={{ node: mockParagraphData }}
			/>
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
