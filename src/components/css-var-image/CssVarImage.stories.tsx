import type { Meta, StoryObj } from '@storybook/react';
import CssVarImage from './CssVarImage';

const meta = {
	title: 'UI/CssVarImage',
	component: CssVarImage,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
	argTypes: {},
} satisfies Meta<typeof CssVarImage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
	args: {
		varName: 'some-var',
		size: '400px',
	},
	render: function Render({ varName, size }) {
		return (
			<>
				<style>{`:root{--ml-some-var: url(http://dummyimage.com/500x500/a6a49c/20201e&text=Image)}`}</style>
				<CssVarImage
					varName={varName}
					size={size}
				/>
			</>
		);
	},
};
