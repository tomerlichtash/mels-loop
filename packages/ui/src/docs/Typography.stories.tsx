import type { Meta, StoryObj } from '@storybook/react';

const variants = [
	{ name: 'h1', description: '2rem / bold / tight', group: 'Headings' },
	{ name: 'h2', description: '1.5rem / bold / tight', group: 'Headings' },
	{ name: 'h3', description: '1.25rem / semibold / snug', group: 'Headings' },
	{ name: 'h4', description: '1.125rem / semibold / snug', group: 'Headings' },
	{
		name: 'subtitle1',
		description: '1rem / medium / snug',
		group: 'Subtitles',
	},
	{
		name: 'subtitle2',
		description: '0.875rem / medium / snug',
		group: 'Subtitles',
	},
	{ name: 'body1', description: '1rem / regular / body', group: 'Body' },
	{ name: 'body2', description: '0.875rem / regular / body', group: 'Body' },
	{
		name: 'caption',
		description: '0.75rem / regular / snug',
		group: 'Utility',
	},
	{ name: 'label', description: '0.875rem / regular / none', group: 'Utility' },
];

const fontSizes = [
	['--ml-font-size-2xs', '2xs', '0.6rem'],
	['--ml-font-size-xs', 'xs', '0.7rem'],
	['--ml-font-size-sm', 'sm', '0.75rem'],
	['--ml-font-size-body', 'body', '0.875rem'],
	['--ml-font-size-md', 'md', '1rem'],
	['--ml-font-size-lg', 'lg', '1.125rem'],
	['--ml-font-size-xl', 'xl', '1.25rem'],
	['--ml-font-size-2xl', '2xl', '1.5rem'],
	['--ml-font-size-3xl', '3xl', '2rem'],
];

const fontWeights = [
	['--ml-font-weight-light', 'light', '300'],
	['--ml-font-weight-regular', 'regular', '400'],
	['--ml-font-weight-medium', 'medium', '500'],
	['--ml-font-weight-semibold', 'semibold', '600'],
	['--ml-font-weight-bold', 'bold', '700'],
];

function Section({
	title,
	children,
}: {
	title: string;
	children: React.ReactNode;
}) {
	return (
		<div style={{ marginBottom: 48 }}>
			<h2
				style={{
					margin: '0 0 16px',
					color: 'var(--ml-heading-color)',
					borderBottom: '1px solid var(--ml-border-color)',
					paddingBottom: 8,
				}}
			>
				{title}
			</h2>
			{children}
		</div>
	);
}

function VariantSample({
	name,
	description,
}: {
	name: string;
	description: string;
}) {
	const token = (prop: string) => `var(--ml-typography-${name}-${prop})`;
	return (
		<div
			style={{
				marginBottom: 24,
				borderBottom: '1px solid var(--ml-border-color)',
				paddingBottom: 24,
			}}
		>
			<div
				style={{
					display: 'flex',
					alignItems: 'baseline',
					gap: 16,
					marginBottom: 8,
				}}
			>
				<span
					style={{
						fontFamily: token('font-family'),
						fontSize: token('font-size'),
						fontWeight: token('font-weight'),
						lineHeight: token('line-height'),
						letterSpacing: token('letter-spacing'),
						color: 'var(--ml-heading-color)',
					}}
				>
					The quick brown fox
				</span>
				<code style={{ fontSize: 12, color: 'var(--ml-text-muted-color)' }}>
					{name}
				</code>
			</div>
			<div
				style={{
					fontSize: 12,
					color: 'var(--ml-text-subtle-color)',
					fontFamily: 'monospace',
				}}
			>
				{description}
			</div>
		</div>
	);
}

function TypographyPage() {
	const groups = ['Headings', 'Subtitles', 'Body', 'Utility'];
	return (
		<div
			style={{
				padding: 24,
				backgroundColor: 'var(--ml-background-color)',
				color: 'var(--ml-text-color)',
				minHeight: '100vh',
			}}
		>
			<h1 style={{ margin: '0 0 8px', color: 'var(--ml-heading-color)' }}>
				Typography
			</h1>
			<p style={{ margin: '0 0 32px', color: 'var(--ml-text-subtle-color)' }}>
				10 variants, each mapped to 5 token properties: font-family, font-size,
				font-weight, line-height, letter-spacing.
			</p>

			{groups.map((group) => (
				<Section key={group} title={group}>
					{variants
						.filter((v) => v.group === group)
						.map((v) => (
							<VariantSample
								key={v.name}
								name={v.name}
								description={v.description}
							/>
						))}
				</Section>
			))}

			<Section title="Font Scale">
				<div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
					{fontSizes.map(([token, label, value]) => (
						<div
							key={label}
							style={{ display: 'flex', alignItems: 'baseline', gap: 16 }}
						>
							<span
								style={{
									fontSize: `var(${token})`,
									color: 'var(--ml-text-color)',
								}}
							>
								The quick brown fox
							</span>
							<code
								style={{
									fontSize: 12,
									color: 'var(--ml-text-muted-color)',
									whiteSpace: 'nowrap',
								}}
							>
								{label} ({value})
							</code>
						</div>
					))}
				</div>
			</Section>

			<Section title="Font Weights">
				<div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
					{fontWeights.map(([token, label, value]) => (
						<div
							key={label}
							style={{ display: 'flex', alignItems: 'baseline', gap: 16 }}
						>
							<span
								style={{
									fontSize: 18,
									fontWeight: `var(${token})`,
									color: 'var(--ml-text-color)',
								}}
							>
								The quick brown fox
							</span>
							<code
								style={{ fontSize: 12, color: 'var(--ml-text-muted-color)' }}
							>
								{label} ({value})
							</code>
						</div>
					))}
				</div>
			</Section>
		</div>
	);
}

const meta: Meta = {
	title: 'Style Guide/Typography',
	parameters: {
		layout: 'fullscreen',
		controls: { disable: true },
		actions: { disable: true },
		options: { showPanel: false },
	},
};
export default meta;

type Story = StoryObj;

export const Default: Story = {
	render: () => <TypographyPage />,
};
