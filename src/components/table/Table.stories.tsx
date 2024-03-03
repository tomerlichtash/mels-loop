import type { Meta, StoryObj } from '@storybook/react';
import Table from './Table';

const meta = {
	title: 'Semantic/Table',
	component: Table,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
	argTypes: {},
} satisfies Meta<typeof Table>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
	args: {},
	render: function Render() {
		return (
			<Table>
				<tr>
					<td>MSB</td>
					<th>AAA</th>
					<th>X</th>
					<th>CCC</th>
					<td>LSB</td>
				</tr>
				<tr>
					<td></td>
					<td>Data</td>
					<td>Index</td>
					<td>Opcode</td>
					<td></td>
				</tr>
			</Table>
		);
	},
};
