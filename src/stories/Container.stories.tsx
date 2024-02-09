import type { Meta, StoryObj } from '@storybook/react';
import Container from '../components/container/Container';
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport';

const meta = {
	title: 'Container',
	component: Container,
	parameters: {
		viewport: {
			viewports: INITIAL_VIEWPORTS,
		},
	},
	tags: ['autodocs'],
	argTypes: {
		sticky: {
			type: 'boolean',
		},
		position: {
			options: ['top', 'bottom'],
			control: { type: 'select' },
		},
		spaceBetween: {
			type: 'boolean',
		},
		alignItemsCenter: {
			type: 'boolean',
		},
		fullWidth: {
			type: 'boolean',
		},
		horizontalGutter: {
			type: 'boolean',
		},
		asChild: {
			type: 'boolean',
		},
	},
} satisfies Meta<typeof Container>;

export default meta;
type Story = StoryObj<typeof meta>;

const BaseStory: Story = {
	args: {
		sticky: false,
		position: 'top',
		spaceBetween: true,
		alignItemsCenter: true,
		fullWidth: true,
		horizontalGutter: true,
		asChild: true,
		children: (
			<>
				<div>Side1</div>
				<div>Side2</div>
			</>
		),
	},
	render: function Render({
		sticky,
		position,
		spaceBetween,
		alignItemsCenter,
		fullWidth,
		horizontalGutter,
		children,
		asChild,
	}) {
		return (
			<Container
				asChild={asChild}
				data-fixed-position={sticky}
				data-position={position}
				data-space-between={spaceBetween}
				data-align-items-center={alignItemsCenter}
				data-full-width={fullWidth}
				data-horizontal-gutter={horizontalGutter}
			>
				<header>{children}</header>
			</Container>
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
