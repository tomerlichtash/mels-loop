// import type { Meta, StoryObj } from '@storybook/react';
// // import "!style-loader!css-loader!sass-loader!./../../src/styles/app.scss";
// import {
// 	IContentComponentInitData,
// 	// IMLParsedNode,
// 	MLNODE_TYPES,
// } from 'types/models';
// import mockAstTree from './mocks/mockAstTree';
// import { mlUtils } from 'lib/ml-utils';
// import { ContentComponent } from 'lib/content';

// // const mockTextNode: IMLParsedNode = {
// // 	type: MLNODE_TYPES.HEADING,
// // 	text: 'text',
// // 	key: 'someKey',
// // 	line: 1,
// // };
// // const mockStrongNode: IMLParsedNode = {
// // 	type: MLNODE_TYPES.STRONG,
// // 	text: 'text',
// // 	key: 'someKey',
// // 	line: 1,
// // };
// // const mockEmNode: IMLParsedNode = {
// // 	type: MLNODE_TYPES.EM,
// // 	text: 'text',
// // 	key: 'someKey',
// // 	line: 1,
// // };

// // const mockNodeType = {
// // 	[MLNODE_TYPES.TEXT]: mockTextNode,
// // 	[MLNODE_TYPES.STRONG]: mockStrongNode,
// // 	[MLNODE_TYPES.EM]: mockEmNode,
// // };

// const meta = {
// 	title: 'ContentBlocks/ContentComponent',
// 	component: ContentComponent,
// 	parameters: {
// 		layout: 'centered',
// 	},
// 	tags: ['autodocs'],
// 	argTypes: {
// 		type: {
// 			control: 'select',
// 			options: [MLNODE_TYPES.TEXT, MLNODE_TYPES.STRONG, MLNODE_TYPES.EM],
// 			defaultValue: MLNODE_TYPES.TEXT,
// 		},
// 	},
// } satisfies Meta; //<typeof ContentComponent>;

// export default meta;
// type Story = StoryObj<typeof meta>;

// export const Text: Story = {
// 	// args: {
// 	// 	type: meta.argTypes.type.defaultValue,
// 	// },
// 	render: function Render() {
// 		return mockAstTree.map((node: IContentComponentInitData) => {
// 			return (
// 				<ContentComponent key={mlUtils.uniqueId()} componentData={{ node }} />
// 			);
// 		});
// 	},
// };
