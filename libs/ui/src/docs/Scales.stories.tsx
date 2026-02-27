import type { Meta, StoryObj } from '@storybook/react';

const spacingSteps = [
	['--ml-space-xs', 'xs', '0.25rem'],
	['--ml-space-sm', 'sm', '0.5rem'],
	['--ml-space-md', 'md', '1rem'],
	['--ml-space-lg', 'lg', '1.5rem'],
	['--ml-space-xl', 'xl', '2rem'],
	['--ml-space-2xl', '2xl', '3rem'],
	['--ml-space-3xl', '3xl', '4rem'],
];

const radiusSteps = [
	['--ml-radius-none', 'none', '0'],
	['--ml-radius-sm', 'sm', '3px'],
	['--ml-radius-md', 'md', '6px'],
	['--ml-radius-lg', 'lg', '12px'],
	['--ml-radius-pill', 'pill', '999px'],
	['--ml-radius-full', 'full', '50%'],
];

const shadowSteps = [
	['--ml-shadow-xs', 'xs'],
	['--ml-shadow-sm', 'sm'],
	['--ml-shadow-md', 'md'],
	['--ml-shadow-lg', 'lg'],
];

const durationSteps = [
	['--ml-duration-fast', 'fast', '150ms'],
	['--ml-duration-normal', 'normal', '200ms'],
	['--ml-duration-slow', 'slow', '250ms'],
];

const easingSteps = [
	['--ml-ease-default', 'default', 'ease'],
	['--ml-ease-out', 'out', 'ease-out'],
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

function ScalesPage() {
	return (
		<div
			style={{
				padding: 24,
				backgroundColor: 'var(--ml-background-color)',
				color: 'var(--ml-text-color)',
				minHeight: '100vh',
			}}
		>
			<h1 style={{ margin: '0 0 32px', color: 'var(--ml-heading-color)' }}>
				Design Scales
			</h1>

			<Section title="Spacing">
				<div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
					{spacingSteps.map(([token, label, value]) => (
						<div
							key={label}
							style={{ display: 'flex', alignItems: 'center', gap: 16 }}
						>
							<code
								style={{
									fontSize: 12,
									color: 'var(--ml-text-muted-color)',
									width: 100,
									textAlign: 'right',
								}}
							>
								{label} ({value})
							</code>
							<div
								style={{
									width: `var(${token})`,
									height: 24,
									backgroundColor: 'var(--ml-color-primary)',
									borderRadius: 3,
								}}
							/>
						</div>
					))}
				</div>
			</Section>

			<Section title="Border Radius">
				<div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
					{radiusSteps.map(([token, label, value]) => (
						<div
							key={label}
							style={{
								display: 'flex',
								flexDirection: 'column',
								alignItems: 'center',
								gap: 8,
							}}
						>
							<div
								style={{
									width: label === 'pill' ? 96 : 64,
									height: 64,
									backgroundColor: 'var(--ml-color-primary-subtle)',
									border: '2px solid var(--ml-color-primary)',
									borderRadius: `var(${token})`,
								}}
							/>
							<code
								style={{ fontSize: 12, color: 'var(--ml-text-muted-color)' }}
							>
								{label}
							</code>
							<span
								style={{ fontSize: 11, color: 'var(--ml-text-subtle-color)' }}
							>
								{value}
							</span>
						</div>
					))}
				</div>
			</Section>

			<Section title="Shadows">
				<div style={{ display: 'flex', gap: 32, flexWrap: 'wrap' }}>
					{shadowSteps.map(([token, label]) => (
						<div
							key={label}
							style={{
								display: 'flex',
								flexDirection: 'column',
								alignItems: 'center',
								gap: 8,
							}}
						>
							<div
								style={{
									width: 80,
									height: 80,
									backgroundColor: 'var(--ml-surface-background-color)',
									borderRadius: 'var(--ml-radius-md)',
									boxShadow: `var(${token})`,
								}}
							/>
							<code
								style={{ fontSize: 12, color: 'var(--ml-text-muted-color)' }}
							>
								{label}
							</code>
						</div>
					))}
				</div>
			</Section>

			<Section title="Durations">
				<p
					style={{
						margin: '0 0 16px',
						fontSize: 14,
						color: 'var(--ml-text-subtle-color)',
					}}
				>
					Hover each bar to see the transition speed.
				</p>
				<div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
					{durationSteps.map(([token, label, value]) => (
						<div
							key={label}
							style={{ display: 'flex', alignItems: 'center', gap: 16 }}
						>
							<code
								style={{
									fontSize: 12,
									color: 'var(--ml-text-muted-color)',
									width: 120,
									textAlign: 'right',
								}}
							>
								{label} ({value})
							</code>
							<div
								style={{
									width: 120,
									height: 32,
									backgroundColor: 'var(--ml-color-primary)',
									borderRadius: 'var(--ml-radius-md)',
									transition: `transform var(${token}) var(--ml-ease-default), background-color var(${token}) var(--ml-ease-default)`,
								}}
								onMouseEnter={(e) => {
									e.currentTarget.style.transform = 'scaleX(1.6)';
									e.currentTarget.style.backgroundColor =
										'var(--ml-color-primary-alt)';
								}}
								onMouseLeave={(e) => {
									e.currentTarget.style.transform = 'scaleX(1)';
									e.currentTarget.style.backgroundColor =
										'var(--ml-color-primary)';
								}}
							/>
						</div>
					))}
				</div>
			</Section>

			<Section title="Easing">
				<p
					style={{
						margin: '0 0 16px',
						fontSize: 14,
						color: 'var(--ml-text-subtle-color)',
					}}
				>
					Hover each row to compare easing curves at the same duration (250ms).
				</p>
				<div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
					{easingSteps.map(([token, label, value]) => (
						<div
							key={label}
							style={{ display: 'flex', alignItems: 'center', gap: 16 }}
							onMouseEnter={(e) => {
								const ball =
									e.currentTarget.querySelector<HTMLElement>('[data-ball]');
								if (ball) ball.style.transform = 'translateX(200px)';
							}}
							onMouseLeave={(e) => {
								const ball =
									e.currentTarget.querySelector<HTMLElement>('[data-ball]');
								if (ball) ball.style.transform = 'translateX(0)';
							}}
						>
							<code
								style={{
									fontSize: 12,
									color: 'var(--ml-text-muted-color)',
									width: 120,
									textAlign: 'right',
								}}
							>
								{label} ({value})
							</code>
							<div style={{ width: 260, height: 40, position: 'relative' }}>
								<div
									data-ball=""
									style={{
										width: 40,
										height: 40,
										backgroundColor: 'var(--ml-color-secondary)',
										borderRadius: 'var(--ml-radius-md)',
										transition: `transform var(--ml-duration-slow) var(${token})`,
									}}
								/>
							</div>
						</div>
					))}
				</div>
			</Section>

			<Section title="Overlay">
				<div
					style={{
						position: 'relative',
						width: 200,
						height: 120,
						borderRadius: 'var(--ml-radius-md)',
						overflow: 'hidden',
					}}
				>
					<div
						style={{
							width: '100%',
							height: '100%',
							background:
								'linear-gradient(135deg, var(--ml-color-primary), var(--ml-color-secondary))',
						}}
					/>
					<div
						style={{
							position: 'absolute',
							inset: 0,
							backgroundColor: 'var(--ml-overlay-bg)',
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'center',
						}}
					>
						<span style={{ color: 'white', fontSize: 14, fontWeight: 500 }}>
							overlay
						</span>
					</div>
				</div>
			</Section>
		</div>
	);
}

const meta: Meta = {
	title: 'Style Guide/Scales',
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
	render: () => <ScalesPage />,
};
