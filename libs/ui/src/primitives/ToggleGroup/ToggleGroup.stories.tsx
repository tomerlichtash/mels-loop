import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

import { ToggleGroup } from './ToggleGroup';

const meta: Meta<typeof ToggleGroup> = {
	title: 'Action/ToggleGroup',
	component: ToggleGroup,
};

export default meta;
type Story = StoryObj<typeof ToggleGroup>;

function ToggleGroupDemo() {
	const [value, setValue] = useState('a');
	return (
		<ToggleGroup
			value={value}
			items={[
				{ value: 'a', label: 'Option A' },
				{ value: 'b', label: 'Option B' },
				{ value: 'c', label: 'Option C' },
			]}
			onValueChange={setValue}
			aria-label="Demo toggle"
		/>
	);
}

export const Default: Story = {
	render: () => <ToggleGroupDemo />,
};
