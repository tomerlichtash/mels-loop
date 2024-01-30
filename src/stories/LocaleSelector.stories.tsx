import type { Meta, StoryObj } from "@storybook/react";
import LocaleSelector from "../components/ui/LocaleSelector/LocaleSelector";
import { INITIAL_VIEWPORTS } from "@storybook/addon-viewport";

const meta = {
	title: "Site/LocaleSelector",
	component: LocaleSelector,
	parameters: {
		viewport: {
			viewports: INITIAL_VIEWPORTS,
		},
	},
	tags: ["autodocs"],
	argTypes: {},
} satisfies Meta<typeof LocaleSelector>;

export default meta;
type Story = StoryObj<typeof meta>;

const Desktop: Story = {
	args: {
		type: "single",
		value: "en",
		options: [
			{
				id: "en",
				label: "EN",
				title: "English",
			},
			{
				id: "he",
				label: "ע",
				title: "עברית",
			},
		],
		onSelect: (id: string) => {
			console.log("toggle from story", id);
		},
	},
	render: function Render({ type, value, options, onSelect }) {
		return (
			<LocaleSelector
				type={type}
				value={value}
				options={options}
				onSelect={onSelect}
			/>
		);
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
