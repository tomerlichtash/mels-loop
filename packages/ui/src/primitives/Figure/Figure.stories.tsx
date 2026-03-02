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
			<img src="/card-image.png" alt="Placeholder" />
			<FigureCaption>Fig. 1. A sample figure with caption</FigureCaption>
		</Figure>
	),
};
