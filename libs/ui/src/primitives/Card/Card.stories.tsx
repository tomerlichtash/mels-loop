import type { Meta, StoryObj } from '@storybook/react';
import type { ComponentProps } from 'react';

import { Button } from '../Button/Button';
import {
	CardActions,
	CardBody,
	CardContent,
	CardFooter,
	CardGrid,
	CardHeader,
	CardMedia,
	CardSkeleton,
} from '.';
import { Card } from './Card';

type CardStoryArgs = ComponentProps<typeof Card> & {
	mediaSrc?: string;
	mediaOverlayText?: string;
	headerText?: string;
	bodyText?: string;
	footerText?: string;
	withActions?: boolean;
	loading?: boolean;
	numOfItems?: number;
	lines?: 1 | 2 | 3 | 4 | 5;
};

const meta: Meta<CardStoryArgs> = {
	title: 'Primitives/Card',
	component: Card,
	argTypes: {
		children: { control: false },
		variant: {
			control: 'select',
			options: ['outlined', 'inset'],
		},
		radius: {
			control: 'select',
			options: ['none', 'sm', 'md', 'lg'],
		},
		padding: {
			control: 'select',
			options: ['none', 'sm', 'md', 'lg'],
		},
		shadow: {
			control: 'select',
			options: ['none', 'xs', 'sm', 'md', 'lg'],
		},
		interactive: { control: 'boolean' },
		selected: { control: 'boolean' },
		disabled: { control: 'boolean' },
		direction: {
			control: 'select',
			options: ['vertical', 'horizontal'],
		},
		mediaSrc: { control: 'text' },
		mediaOverlayText: { control: 'text' },
		headerText: { control: 'text' },
		bodyText: { control: 'text' },
		footerText: { control: 'text' },
		withActions: { control: 'boolean' },
		loading: { control: 'boolean' },
		href: { control: 'text' },
	},
	render: ({
		mediaSrc,
		mediaOverlayText,
		headerText,
		bodyText,
		footerText,
		withActions,
		direction,
		loading,
		...args
	}) => {
		if (loading) {
			return (
				<CardSkeleton
					withMedia={!!mediaSrc}
					withActions={withActions}
					{...args}
				/>
			);
		}

		const content = (
			<>
				{headerText && <CardHeader>{headerText}</CardHeader>}
				{bodyText && <CardBody>{bodyText}</CardBody>}
				{withActions && (
					<CardActions>
						<Button variant="text" size="sm">
							Cancel
						</Button>
						<Button size="sm">Confirm</Button>
					</CardActions>
				)}
				{footerText && <CardFooter>{footerText}</CardFooter>}
			</>
		);

		return (
			<Card direction={direction} {...args}>
				{mediaSrc && (
					<CardMedia
						src={mediaSrc}
						alt="Card image"
						horizontal={direction === 'horizontal'}
						overlay={mediaOverlayText || undefined}
					/>
				)}
				{direction === 'horizontal' ? (
					<CardContent>{content}</CardContent>
				) : (
					content
				)}
			</Card>
		);
	},
};

export default meta;
type Story = StoryObj<CardStoryArgs>;

export const Default: Story = {
	args: {
		variant: 'outlined',
		radius: 'md',
		padding: 'md',
		interactive: false,
		selected: false,
		direction: 'vertical',
		mediaSrc: 'https://dummyimage.com/600x200/cccccc/999999&text=Card+Image',
		mediaOverlayText: '',
		headerText: 'Card Title',
		bodyText:
			'This is the card body with the main content. It can contain text, images, or any other elements needed for your layout.',
		footerText: '',
		withActions: false,
		loading: false,
		href: '',
	},
};

const gridArgTypes = {
	variant: { table: { disable: true } },
	radius: { table: { disable: true } },
	padding: { table: { disable: true } },
	shadow: { table: { disable: true } },
	interactive: { table: { disable: true } },
	selected: { table: { disable: true } },
	direction: { table: { disable: true } },
	mediaSrc: { table: { disable: true } },
	mediaOverlayText: { table: { disable: true } },
	headerText: { table: { disable: true } },
	bodyText: { table: { disable: true } },
	footerText: { table: { disable: true } },
	withActions: { table: { disable: true } },
	loading: { table: { disable: true } },
	href: { table: { disable: true } },
	numOfItems: { control: { type: 'number' as const, min: 1, max: 24 } },
};

export const Grid: Story = {
	argTypes: gridArgTypes,
	args: { numOfItems: 6 },
	render: ({ numOfItems = 6 }: CardStoryArgs) => (
		<CardGrid gap="md">
			{Array.from({ length: numOfItems }, (_, i) => (
				<Card key={i} variant="outlined">
					<CardMedia
						src={`https://dummyimage.com/400x200/cccccc/999999&text=Card+${i + 1}`}
						alt={`Card ${i + 1}`}
					/>
					<CardHeader>{`Card ${i + 1}`}</CardHeader>
					<CardBody>Sample card content for grid layout.</CardBody>
				</Card>
			))}
		</CardGrid>
	),
};

const masonryTexts = [
	'Typography evolved from hand-carved letterforms to digital typefaces. Each era brought innovations in written communication.',
	'Color theory influences how we perceive visual content. The color wheel provides a framework for understanding relationships between colors. Complementary colors create high contrast, while analogous colors produce harmonious combinations.',
	'Responsive design adapts content to any screen size using flexible grids and media queries.',
	'Visual hierarchy guides how information is organized. By manipulating size, color, and spacing, designers direct attention to the most important elements first. White space gives elements room to breathe.',
	'Animation provides feedback and creates continuity between states. Easing functions determine the acceleration curve of transitions. Duration matters — interactions should feel responsive.',
	'Design systems build consistent interfaces at scale. Tokens define atomic values for colors, spacing, and typography. Components are built from tokens ensuring changes propagate consistently across the entire system.',
	'Accessibility ensures digital products work for everyone regardless of ability or context.',
	'Grid systems provide structure and consistency, helping create predictable layouts. Modern CSS features like container queries continue to expand what is possible in responsive design.',
];

export const Masonry: Story = {
	argTypes: {
		...gridArgTypes,
		lines: {
			control: 'select',
			options: [1, 2, 3, 4, 5],
		},
	},
	args: { numOfItems: 8 },
	render: ({ numOfItems = 8, lines }: CardStoryArgs) => (
		<CardGrid layout="masonry" gap="md">
			{Array.from({ length: numOfItems }, (_, i) => (
				<Card key={i} variant="outlined">
					<CardHeader>{`Card ${i + 1}`}</CardHeader>
					<CardBody lines={lines || undefined}>
						{masonryTexts[i % masonryTexts.length]}
					</CardBody>
				</Card>
			))}
		</CardGrid>
	),
};
