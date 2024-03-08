import type { Meta, StoryObj } from '@storybook/react';
import ErrorMessage from './ErrorMessage';

const meta = {
	title: 'UI/ErrorMessage',
	component: ErrorMessage,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
	argTypes: {},
} satisfies Meta<typeof ErrorMessage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
	args: {
		message: 'Some error occured',
		issueTrackerUrl: 'http://example.com',
	},
	render: function Render({ message, issueTrackerUrl }) {
		return (
			<ErrorMessage
				message={message}
				issueTrackerUrl={issueTrackerUrl}
			>
				Report
			</ErrorMessage>
		);
	},
};

// export const FromChildren: Story = {
// 	args: {
// 		message: 'Some error occured',
// 	},
// 	render: function Render({ message }) {
// 		return <ErrorMessage>{message}</ErrorMessage>;
// 	},
// };
