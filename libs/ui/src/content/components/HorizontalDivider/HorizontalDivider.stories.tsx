import type { Meta, StoryObj } from '@storybook/react';

import { HorizontalDivider } from './HorizontalDivider';

const meta: Meta<typeof HorizontalDivider> = {
	title: 'Content/HorizontalDivider',
	component: HorizontalDivider,
};

export default meta;
type Story = StoryObj<typeof HorizontalDivider>;

export const Default: Story = {};
