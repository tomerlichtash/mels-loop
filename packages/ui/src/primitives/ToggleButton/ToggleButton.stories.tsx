import { MoonIcon, SunIcon } from '@phosphor-icons/react/ssr';
import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

import { ToggleButton } from './ToggleButton';

const meta: Meta<typeof ToggleButton> = {
	title: 'Action/ToggleButton',
	component: ToggleButton,
};

export default meta;
type Story = StoryObj<typeof ToggleButton>;

function ToggleButtonDemo() {
	const [pressed, setPressed] = useState(false);
	return (
		<ToggleButton
			pressed={pressed}
			onPressedChange={setPressed}
			aria-label="Toggle dark mode"
		>
			{pressed ? <SunIcon /> : <MoonIcon />}
		</ToggleButton>
	);
}

export const Default: Story = {
	render: () => <ToggleButtonDemo />,
};
