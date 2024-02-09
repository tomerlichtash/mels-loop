import type { Meta, StoryObj } from '@storybook/react';
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport';
import ThemeSelect from 'components/theme-select/ThemeSelect';

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
		theme: 'light',
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
