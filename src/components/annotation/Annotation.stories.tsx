import type { Meta, StoryObj } from '@storybook/react';
import Annotation from './Annotation';

const meta = {
	title: 'UI/Annotation',
	component: Annotation,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
	argTypes: {
		index: {
			control: { type: 'number' },
		},
	},
} satisfies Meta<typeof Annotation>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
	args: {
		index: 1,
		hasPrefix: true,
	},
	render: function Render({ index, hasPrefix }) {
		return (
			<>
				Some text
				<Annotation
					index={index}
					hasPrefix={hasPrefix}
				></Annotation>
			</>
		);
	},
};
