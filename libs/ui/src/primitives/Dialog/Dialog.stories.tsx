import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

import { Button } from '../Button/Button';
import { Text } from '../Text/Text';
import { Dialog } from './Dialog';

const meta: Meta<typeof Dialog> = {
	title: 'Primitives/Dialog',
	component: Dialog,
};

export default meta;
type Story = StoryObj<typeof Dialog>;

function DialogDemo() {
	const [open, setOpen] = useState(false);
	return (
		<>
			<Button onClick={() => setOpen(true)}>Open Dialog</Button>
			<Dialog open={open} onOpenChange={setOpen} title="Example Dialog">
				<Text variant="h3">Dialog Title</Text>
				<Text variant="body2">This is a dialog with some content inside.</Text>
			</Dialog>
		</>
	);
}

export const Default: Story = {
	render: () => <DialogDemo />,
};
