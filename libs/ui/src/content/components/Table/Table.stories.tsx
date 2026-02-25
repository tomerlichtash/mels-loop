import type { Meta, StoryObj } from '@storybook/react';

import { Table } from './Table';

const meta: Meta<typeof Table> = {
	title: 'Content/Table',
	component: Table,
	tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Table>;

export const Default: Story = {
	render: () => (
		<Table>
			<thead>
				<tr>
					<th>Name</th>
					<th>Role</th>
					<th>Status</th>
				</tr>
			</thead>
			<tbody>
				<tr>
					<td>Alice</td>
					<td>Engineer</td>
					<td>Active</td>
				</tr>
				<tr>
					<td>Bob</td>
					<td>Designer</td>
					<td>Active</td>
				</tr>
				<tr>
					<td>Charlie</td>
					<td>Manager</td>
					<td>Away</td>
				</tr>
			</tbody>
		</Table>
	),
};
