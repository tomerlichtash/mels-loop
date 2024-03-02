import type { Meta, StoryObj } from '@storybook/react';
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport';
import TextLink from 'components/text-link/TextLink';

const meta = {
	title: 'UI/TextLink',
	component: TextLink,
	parameters: {
		viewport: {
			viewports: INITIAL_VIEWPORTS,
		},
	},
	tags: ['autodocs'],
	argTypes: {},
} satisfies Meta<typeof TextLink>;

export default meta;
type Story = StoryObj<typeof meta>;

const Desktop: Story = {
	args: {
		linked: false,
		href: 'http://example.com',
		variant: 'h1',
	},
	render: function Render({ href, linked, variant }) {
		return (
			<TextLink href={href} linked={linked} variant={variant}>
				Text Link
			</TextLink>
		);
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
