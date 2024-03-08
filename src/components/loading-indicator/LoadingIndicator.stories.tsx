import type { Meta, StoryObj } from '@storybook/react';
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport';
import LoadingIndicator from 'components/loading-indicator/LoadingIndicator';

const meta = {
	title: 'UI/LoadingIndicator',
	component: LoadingIndicator,
	parameters: {
		viewport: {
			viewports: INITIAL_VIEWPORTS,
		},
	},
	tags: ['autodocs'],
	argTypes: {},
} satisfies Meta<typeof LoadingIndicator>;

export default meta;
type Story = StoryObj<typeof meta>;

const BaseStory: Story = {
	args: {
		label: 'Loading...',
		delay: 0,
	},
	render: function Render({ label }) {
		return (
			<LoadingIndicator
				label={label}
				delay={0}
			/>
		);
	},
};

export const Desktop: Story = BaseStory;

export const Mobile: Story = {
	...BaseStory,
	parameters: {
		viewport: {
			defaultViewport: 'iphonex',
		},
	},
};
