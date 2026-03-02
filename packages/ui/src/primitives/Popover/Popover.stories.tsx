import type { Meta, StoryObj } from '@storybook/react';

import { Button } from '../Button/Button';
import { Text } from '../Text/Text';
import { Popover } from './Popover';

const meta: Meta<typeof Popover> = {
	title: 'Overlay/Popover',
	component: Popover,
};

export default meta;
type Story = StoryObj<typeof Popover>;

export const Default: Story = {
	render: () => (
		<div style={{ padding: '100px', textAlign: 'center' }}>
			<Popover trigger={<Button>Toggle Popover</Button>}>
				<Text variant="body2">Popover content goes here.</Text>
			</Popover>
		</div>
	),
};
