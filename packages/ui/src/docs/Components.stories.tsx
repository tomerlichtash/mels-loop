import { EyeIcon, MagnifyingGlassIcon } from '@phosphor-icons/react/ssr';
import type { Meta, StoryObj } from '@storybook/react';
import { type CSSProperties, useState } from 'react';

import { Alert } from '../primitives/Alert/Alert';
import { Badge } from '../primitives/Badge/Badge';
import { Blockquote } from '../primitives/Blockquote/Blockquote';
import { Breadcrumbs } from '../primitives/Breadcrumbs';
import { Button } from '../primitives/Button/Button';
import { Card, CardBody, CardHeader } from '../primitives/Card';
import { Chip } from '../primitives/Chip/Chip';
import { Code } from '../primitives/Code/Code';
import { CodeBlock } from '../primitives/CodeBlock/CodeBlock';
import { Combobox, type ComboboxOption } from '../primitives/Combobox/Combobox';
import { Dialog } from '../primitives/Dialog';
import { Loader } from '../primitives/Loader/Loader';
import { Separator } from '../primitives/Separator/Separator';
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeaderCell,
	TableRow,
} from '../primitives/Table';
import { Text } from '../primitives/Text/Text';
import { TextArea } from '../primitives/TextArea/TextArea';
import { TextField } from '../primitives/TextField/TextField';
import { ToggleButton } from '../primitives/ToggleButton';
import { ToggleGroup } from '../primitives/ToggleGroup';
import { Tooltip } from '../primitives/Tooltip/Tooltip';

// --- Styles ---

const sectionStyle: CSSProperties = {
	display: 'flex',
	flexDirection: 'column',
	gap: '12px',
};

const sectionTitleStyle: CSSProperties = {
	margin: 0,
	fontSize: '11px',
	fontWeight: 600,
	textTransform: 'uppercase',
	letterSpacing: '0.08em',
	color: 'var(--ml-text-muted-color)',
	borderBottom: '1px solid var(--ml-border-color)',
	paddingBottom: '6px',
};

const rowStyle: CSSProperties = {
	display: 'flex',
	flexWrap: 'wrap',
	alignItems: 'center',
	gap: '8px',
};

const gridStyle: CSSProperties = {
	display: 'grid',
	gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
	gap: '32px',
	padding: '24px',
	fontFamily: 'var(--ml-typography-body-font-family)',
};

// --- Mock data ---

const comboboxOptions: ComboboxOption[] = [
	{ value: 'react', label: 'React' },
	{ value: 'vue', label: 'Vue' },
	{ value: 'angular', label: 'Angular' },
	{ value: 'svelte', label: 'Svelte' },
];

const breadcrumbItems = [
	{ label: 'Home', href: '/' },
	{ label: 'Components', href: '/components' },
	{ label: 'Style Guide' },
];

const toggleGroupItems = [
	{ value: 'bold', label: 'B', 'aria-label': 'Bold' },
	{ value: 'italic', label: 'I', 'aria-label': 'Italic' },
	{ value: 'underline', label: 'U', 'aria-label': 'Underline' },
];

// --- Stateful wrappers ---

function ComboboxDemo() {
	const [value, setValue] = useState('');
	return (
		<Combobox
			options={comboboxOptions}
			value={value}
			onValueChange={setValue}
			placeholder="Select framework..."
			size="sm"
		/>
	);
}

function ToggleButtonDemo() {
	const [pressed, setPressed] = useState(false);
	return (
		<ToggleButton
			pressed={pressed}
			onPressedChange={setPressed}
			aria-label="Toggle preview"
		>
			<EyeIcon />
		</ToggleButton>
	);
}

function ToggleGroupDemo() {
	const [value, setValue] = useState('bold');
	return (
		<ToggleGroup
			value={value}
			items={toggleGroupItems}
			onValueChange={setValue}
			aria-label="Text formatting"
		/>
	);
}

function DialogDemo() {
	const [open, setOpen] = useState(false);
	return (
		<>
			<Button size="sm" variant="outlined" onClick={() => setOpen(true)}>
				Open Dialog
			</Button>
			<Dialog open={open} onOpenChange={setOpen} title="Example Dialog">
				<div style={{ padding: '16px' }}>
					<Text>This is a dialog.</Text>
				</div>
			</Dialog>
		</>
	);
}

// --- Helpers ---

function Section({
	title,
	children,
}: {
	title: string;
	children: React.ReactNode;
}) {
	return (
		<div style={sectionStyle}>
			<h3 style={sectionTitleStyle}>{title}</h3>
			{children}
		</div>
	);
}

// --- Story ---

const meta: Meta = {
	title: 'Style Guide/Components',
	parameters: {
		layout: 'fullscreen',
	},
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
	render: () => (
		<div style={gridStyle}>
			<Section title="Button">
				<div style={rowStyle}>
					<Button size="sm">Contained</Button>
					<Button size="sm" variant="outlined">
						Outlined
					</Button>
					<Button size="sm" variant="text">
						Text
					</Button>
					<Button size="sm" loading>
						Loading
					</Button>
					<Button size="sm" disabled>
						Disabled
					</Button>
				</div>
			</Section>

			<Section title="ToggleButton">
				<div style={rowStyle}>
					<ToggleButtonDemo />
					<ToggleGroupDemo />
				</div>
			</Section>

			<Section title="TextField">
				<TextField size="sm" placeholder="Default" />
				<TextField
					size="sm"
					placeholder="With icon"
					iconStart={<MagnifyingGlassIcon />}
				/>
				<TextField size="sm" label="Label" placeholder="Labeled" />
				<TextField
					size="sm"
					error
					errorMessage="Required field"
					label="Email"
					placeholder="Error"
				/>
			</Section>

			<Section title="TextArea">
				<TextArea size="sm" placeholder="Write something..." rows={2} />
			</Section>

			<Section title="Typography">
				<div
					style={{
						display: 'flex',
						flexDirection: 'column',
						gap: '4px',
					}}
				>
					<Text variant="h1">Heading 1</Text>
					<Text variant="h2">Heading 2</Text>
					<Text variant="h3">Heading 3</Text>
					<Text variant="h4">Heading 4</Text>
					<Text variant="subtitle1">Subtitle 1</Text>
					<Text variant="subtitle2">Subtitle 2</Text>
					<Text variant="body1">Body 1</Text>
					<Text variant="body2">Body 2</Text>
					<Text variant="caption">Caption</Text>
					<Text variant="label">Label</Text>
				</div>
				<div
					style={{
						display: 'flex',
						flexDirection: 'column',
						gap: '4px',
						marginTop: '8px',
					}}
				>
					<Text variant="body1" weight={700}>
						Bold
					</Text>
					<Text variant="body1" italic>
						Italic
					</Text>
					<Text variant="body1" color="muted">
						Muted
					</Text>
					<Text variant="body1" color="primary">
						Primary
					</Text>
					<Text variant="body1" color="success">
						Success
					</Text>
					<Text variant="body1" color="error">
						Error
					</Text>
					<Text variant="body1" color="warning">
						Warning
					</Text>
				</div>
			</Section>

			<Section title="Badge">
				<div style={rowStyle}>
					<Badge>Default</Badge>
					<Badge bordered>Bordered</Badge>
					<Badge radius="sm">Square</Badge>
				</div>
			</Section>

			<Section title="Combobox">
				<ComboboxDemo />
			</Section>

			<Section title="Chip">
				<div style={rowStyle}>
					<Chip size="sm">Small</Chip>
					<Chip>Medium</Chip>
					<Chip onDismiss={() => {}}>Dismissible</Chip>
					<Chip disabled>Disabled</Chip>
				</div>
			</Section>

			<Section title="Code">
				<div>
					<Text variant="body2">
						Inline <Code>{'<Code />'}</Code> example
					</Text>
				</div>
				<CodeBlock>{'const x = 42;\nconsole.log(x);'}</CodeBlock>
			</Section>

			<Section title="Blockquote">
				<Blockquote>
					The best way to predict the future is to invent it.
				</Blockquote>
			</Section>

			<Section title="Table">
				<Table>
					<TableHead>
						<TableRow>
							<TableHeaderCell>Name</TableHeaderCell>
							<TableHeaderCell>Role</TableHeaderCell>
						</TableRow>
					</TableHead>
					<TableBody>
						<TableRow>
							<TableCell>Alice</TableCell>
							<TableCell>Engineer</TableCell>
						</TableRow>
						<TableRow>
							<TableCell>Bob</TableCell>
							<TableCell>Designer</TableCell>
						</TableRow>
					</TableBody>
				</Table>
			</Section>

			<Section title="Alert">
				<Alert status="info" title="Info">
					Informational message.
				</Alert>
				<Alert status="success" title="Success">
					Operation completed.
				</Alert>
				<Alert status="warning" title="Warning">
					Please review.
				</Alert>
				<Alert status="error" title="Error">
					Something went wrong.
				</Alert>
			</Section>

			<Section title="Loader">
				<div
					style={{
						display: 'flex',
						gap: '48px',
						alignItems: 'center',
					}}
				>
					<div
						style={{
							display: 'flex',
							flexDirection: 'column',
							alignItems: 'center',
							gap: '8px',
						}}
					>
						<Loader variant="spinner" size="md" />
						<Text variant="caption" color="muted">
							Spinner
						</Text>
					</div>
					<div
						style={{
							display: 'flex',
							flexDirection: 'column',
							alignItems: 'center',
							gap: '8px',
						}}
					>
						<Loader variant="dots" size="md" />
						<Text variant="caption" color="muted">
							Dots
						</Text>
					</div>
					<div
						style={{
							display: 'flex',
							flexDirection: 'column',
							alignItems: 'center',
							gap: '8px',
						}}
					>
						<Loader variant="pulse" size="md" />
						<Text variant="caption" color="muted">
							Pulse
						</Text>
					</div>
				</div>
			</Section>

			<Section title="Breadcrumbs">
				<Breadcrumbs items={breadcrumbItems} />
			</Section>

			<Section title="Tooltip">
				<Tooltip label="Tooltip content">
					<Button size="sm" variant="outlined">
						Hover me
					</Button>
				</Tooltip>
			</Section>

			<Section title="Dialog">
				<DialogDemo />
			</Section>

			<Section title="Card">
				<Card padding="sm">
					<CardHeader>
						<Text variant="subtitle2">Card Title</Text>
					</CardHeader>
					<CardBody>
						<Text variant="body2">Card content goes here.</Text>
					</CardBody>
				</Card>
			</Section>

			<Section title="Separator">
				<div>
					<Text variant="body2">Above</Text>
					<Separator />
					<Text variant="body2">Below</Text>
				</div>
			</Section>
		</div>
	),
};
