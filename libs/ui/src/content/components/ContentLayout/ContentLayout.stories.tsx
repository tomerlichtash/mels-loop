import type { Meta, StoryObj } from '@storybook/react';

import { ContentLayout } from './ContentLayout';

const meta: Meta<typeof ContentLayout> = {
	title: 'Content/ContentLayout',
	component: ContentLayout,
};

export default meta;
type Story = StoryObj<typeof ContentLayout>;

const columnStyle: React.CSSProperties = {
	padding: '16px',
	background: '#f0f0f0',
	border: '1px dashed #999',
};

export const Default: Story = {
	args: {
		children: <div style={columnStyle}>Single content block</div>,
	},
};

export const EqualColumns: Story = {
	args: {
		'data-layout': 'cols',
		'data-cols-ratio': '1-1',
		children: (
			<>
				<div style={columnStyle}>Column 1</div>
				<div style={columnStyle}>Column 2</div>
			</>
		),
	},
};

export const Ratio1_2: Story = {
	name: 'Ratio 1:2',
	args: {
		'data-layout': 'cols',
		'data-cols-ratio': '1-2',
		children: (
			<>
				<div style={columnStyle}>Narrow</div>
				<div style={columnStyle}>Wide</div>
			</>
		),
	},
};

export const Ratio2_1: Story = {
	name: 'Ratio 2:1',
	args: {
		'data-layout': 'cols',
		'data-cols-ratio': '2-1',
		children: (
			<>
				<div style={columnStyle}>Wide</div>
				<div style={columnStyle}>Narrow</div>
			</>
		),
	},
};
