// import type { Meta, StoryObj } from '@storybook/react';
// import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport';
// import mockParagraphData from './mocks/mockParagraphData';
// import { ParagraphContentBlock } from 'lib/content/content-blocks';

// const meta = {
// 	title: 'ContentBlocks/Paragraph',
// 	component: ParagraphContentBlock,
// 	parameters: {
// 		viewport: {
// 			viewports: INITIAL_VIEWPORTS,
// 		},
// 	},
// 	tags: ['autodocs'],
// 	argTypes: {},
// } satisfies Meta<typeof ParagraphContentBlock>;

// export default meta;
// type Story = StoryObj<typeof meta>;

// const BaseStory: Story = {
// 	args: {
// 		node: mockParagraphData,
// 	},
// 	render: function Render() {
// 		return (
// 			<ParagraphContentBlock
// 				key="mockKey"
// 				componentData={{ node: mockParagraphData }}
// 			/>
// 		);
// 	},
// };

// export const Desktop: Story = BaseStory;

// export const Mobile: Story = {
// 	...BaseStory,
// 	parameters: {
// 		viewport: {
// 			defaultViewport: 'iphonex',
// 		},
// 	},
// };
