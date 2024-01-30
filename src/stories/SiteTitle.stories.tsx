import type { Meta, StoryObj } from "@storybook/react";
// import "!style-loader!css-loader!sass-loader!./../../src/styles/app.scss";
import SiteTitle from "../components/ui/SiteTitle";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
	title: "Site/SiteTitle",
	component: SiteTitle,
	parameters: {
		// Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
		layout: "centered",
	},
	// This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
	tags: ["autodocs"],
	// More on argTypes: https://storybook.js.org/docs/api/argtypes
	argTypes: {},
} satisfies Meta<typeof SiteTitle>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Primary: Story = {
	args: {
		title: "title",
		subtitle: "subtitle",
		linked: false,
	},
	render: function Render(args) {
		return <SiteTitle {...args} />;
	},
};
