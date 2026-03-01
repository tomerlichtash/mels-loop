import type { Meta, StoryObj } from '@storybook/react';

import { Table } from './Table';
import { TableBody } from './TableBody';
import { TableCell } from './TableCell';
import { TableHead } from './TableHead';
import { TableHeaderCell } from './TableHeaderCell';
import { TableRow } from './TableRow';

const meta: Meta<typeof Table> = {
	title: 'Content/Table',
	component: Table,
};

export default meta;
type Story = StoryObj<typeof Table>;

export const Default: Story = {
	render: () => (
		<Table>
			<TableHead>
				<TableRow>
					<TableHeaderCell>Name</TableHeaderCell>
					<TableHeaderCell>Role</TableHeaderCell>
					<TableHeaderCell>Status</TableHeaderCell>
				</TableRow>
			</TableHead>
			<TableBody>
				<TableRow>
					<TableCell>Alice</TableCell>
					<TableCell>Engineer</TableCell>
					<TableCell>Active</TableCell>
				</TableRow>
				<TableRow>
					<TableCell>Bob</TableCell>
					<TableCell>Designer</TableCell>
					<TableCell>Active</TableCell>
				</TableRow>
				<TableRow>
					<TableCell>Charlie</TableCell>
					<TableCell>Manager</TableCell>
					<TableCell>Away</TableCell>
				</TableRow>
			</TableBody>
		</Table>
	),
};
