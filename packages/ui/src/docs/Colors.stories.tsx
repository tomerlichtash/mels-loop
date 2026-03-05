import type { Meta, StoryObj } from '@storybook/react';

const Swatch = ({ color, label }: { color: string; label: string }) => (
	<div
		style={{
			display: 'flex',
			flexDirection: 'column',
			alignItems: 'center',
			gap: 4,
		}}
	>
		<div
			style={{
				width: 48,
				height: 48,
				borderRadius: 6,
				backgroundColor: color,
				border: '1px solid var(--ml-border-color)',
			}}
		/>
		<span style={{ fontSize: 11, color: 'var(--ml-text-muted-color)' }}>
			{label}
		</span>
	</div>
);

const IntentRow = ({ name }: { name: string }) => {
	const variants = [
		'subtle',
		'muted',
		'',
		'alt',
		'deep',
		'contrast',
		'highlight',
	];
	return (
		<div style={{ marginBottom: 32 }}>
			<h3
				style={{
					margin: '0 0 12px',
					textTransform: 'capitalize' as const,
					color: 'var(--ml-heading-color)',
				}}
			>
				{name}
			</h3>
			<div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
				{variants.map((v) => {
					const token = v ? `--ml-color-${name}-${v}` : `--ml-color-${name}`;
					const label = v || 'main';
					return <Swatch key={label} color={`var(${token})`} label={label} />;
				})}
			</div>
		</div>
	);
};

const intents = [
	'primary',
	'secondary',
	'success',
	'error',
	'warning',
	'info',
	'surface',
];

const neutrals = [
	['--ml-white', 'white'],
	['--ml-cream-100', 'cream-100'],
	['--ml-cream-200', 'cream-200'],
	['--ml-cream-300', 'cream-300'],
	['--ml-gray-100', 'gray-100'],
	['--ml-gray-200', 'gray-200'],
	['--ml-gray-300', 'gray-300'],
	['--ml-gray-400', 'gray-400'],
	['--ml-gray-500', 'gray-500'],
];

const brand = [
	['--ml-pink', 'pink'],
	['--ml-pink-light', 'pink-light'],
	['--ml-mauve', 'mauve'],
	['--ml-purple', 'purple'],
	['--ml-indigo', 'indigo'],
	['--ml-blue', 'blue'],
	['--ml-blue-dark', 'blue-dark'],
	['--ml-navy', 'navy'],
	['--ml-navy-deep', 'navy-deep'],
];

const textLevels = [
	['--ml-text-color', 'Default'],
	['--ml-text-subtle-color', 'Subtle'],
	['--ml-text-muted-color', 'Muted'],
];

const gradientTokens = [
	['--ml-gradient-start', 'start'],
	['--ml-gradient-end', 'end'],
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

function ColorsPage() {
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
				Color System
			</h1>
			<p style={{ margin: '0 0 32px', color: 'var(--ml-text-subtle-color)' }}>
				Three-layer architecture: <strong>Palette</strong> (raw oklch) →{' '}
				<strong>Intent</strong> (brand, status, surface) →{' '}
				<strong>Semantic</strong> (component tokens). Toggle theme in toolbar.
			</p>

			<Section title="Intents">
				<p
					style={{
						margin: '0 0 16px',
						fontSize: 14,
						color: 'var(--ml-text-subtle-color)',
					}}
				>
					Each intent has 7 variants: subtle, muted, main, alt, deep, contrast,
					highlight.
				</p>
				{intents.map((name) => (
					<IntentRow key={name} name={name} />
				))}
			</Section>

			<Section title="Palette — Neutrals">
				<div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
					{neutrals.map(([token, label]) => (
						<Swatch key={label} color={`var(${token})`} label={label} />
					))}
				</div>
			</Section>

			<Section title="Palette — Brand">
				<div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
					{brand.map(([token, label]) => (
						<Swatch key={label} color={`var(${token})`} label={label} />
					))}
				</div>
			</Section>

			<Section title="Text Emphasis">
				<div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
					{textLevels.map(([token, label]) => (
						<span key={label} style={{ fontSize: 16, color: `var(${token})` }}>
							{label} — The quick brown fox jumps over the lazy dog.
						</span>
					))}
				</div>
			</Section>

			<Section title="Brand Gradient">
				<div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
					<div>
						<div
							style={{
								fontSize: 12,
								color: 'var(--ml-text-muted-color)',
								marginBottom: 8,
							}}
						>
							Horizontal
						</div>
						<div
							style={{
								height: 8,
								borderRadius: 'var(--ml-radius-pill)',
								background:
									'linear-gradient(to right, var(--ml-gradient-start), var(--ml-gradient-end))',
							}}
						/>
					</div>
					<div>
						<div
							style={{
								fontSize: 12,
								color: 'var(--ml-text-muted-color)',
								marginBottom: 8,
							}}
						>
							Diagonal
						</div>
						<div
							style={{
								height: 120,
								borderRadius: 'var(--ml-radius-md)',
								background:
									'linear-gradient(135deg, var(--ml-gradient-start), var(--ml-gradient-end))',
							}}
						/>
					</div>
					<div>
						<div
							style={{
								fontSize: 12,
								color: 'var(--ml-text-muted-color)',
								marginBottom: 8,
							}}
						>
							Gradient text
						</div>
						<span
							style={{
								fontSize: 'var(--ml-font-size-3xl)',
								fontWeight: 'var(--ml-font-weight-bold)',
								background:
									'linear-gradient(to right, var(--ml-gradient-start), var(--ml-gradient-end))',
								WebkitBackgroundClip: 'text',
								WebkitTextFillColor: 'transparent',
								backgroundClip: 'text',
							}}
						>
							Mel's Loop
						</span>
					</div>
					<div style={{ display: 'flex', gap: 12 }}>
						{gradientTokens.map(([token, label]) => (
							<Swatch key={label} color={`var(${token})`} label={label} />
						))}
					</div>
				</div>
			</Section>
		</div>
	);
}

const meta: Meta = {
	title: 'Style Guide/Colors',
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
	render: () => <ColorsPage />,
};
