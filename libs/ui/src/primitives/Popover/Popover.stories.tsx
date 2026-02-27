import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

import { Button } from '../Button/Button';
import { Text } from '../Text/Text';
import { Popover } from './Popover';

const meta: Meta<typeof Popover> = {
	title: 'Primitives/Popover',
	component: Popover,
};

export default meta;
type Story = StoryObj<typeof Popover>;

function PopoverDemo() {
	const [open, setOpen] = useState(false);
	return (
		<div style={{ padding: '100px', textAlign: 'center' }}>
			<Popover
				open={open}
				trigger={<Button onClick={() => setOpen(!open)}>Toggle Popover</Button>}
			>
				<Text variant="body2">Popover content goes here.</Text>
			</Popover>
		</div>
	);
}

export const Default: Story = {
	render: () => <PopoverDemo />,
};
