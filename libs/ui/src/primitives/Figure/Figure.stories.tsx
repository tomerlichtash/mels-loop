import type { Meta, StoryObj } from '@storybook/react';

import { Figure } from './Figure';
import { FigureCaption } from './FigureCaption';

const meta: Meta<typeof Figure> = {
	title: 'Content/Figure',
	component: Figure,
};

export default meta;
type Story = StoryObj<typeof Figure>;

export const Default: Story = {
	render: () => (
		<Figure>
			<img
				src="https://placehold.co/600x300/e2e8f0/475569?text=Figure+Image"
				alt="Placeholder"
			/>
			<FigureCaption>Fig. 1. A sample figure with caption</FigureCaption>
		</Figure>
	),
};
