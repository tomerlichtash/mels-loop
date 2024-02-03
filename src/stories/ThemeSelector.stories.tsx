import type { Meta, StoryObj } from '@storybook/react';
import ThemeSelect from '../components/theme-select/ThemeSelect';
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport';

const meta = {
	title: 'ThemeSelect',
	component: ThemeSelect,
	parameters: {
		viewport: {
			viewports: INITIAL_VIEWPORTS,
		},
	},
	tags: ['autodocs'],
	argTypes: {},
} satisfies Meta<typeof ThemeSelect>;

export default meta;
type Story = StoryObj<typeof meta>;

const Desktop: Story = {
	args: {
		label: 'selected label',
	},
	render: function Render({ label }) {
		return <ThemeSelect label={label} theme="light" setTheme={() => {}} />;
	},
};

export const Mobile: Story = {
	...Desktop,
	parameters: {
		viewport: {
			defaultViewport: 'iphonex',
		},
	},
};