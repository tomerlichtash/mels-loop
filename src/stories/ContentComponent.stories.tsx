import type { Meta, StoryObj } from "@storybook/react";
// import "!style-loader!css-loader!sass-loader!./../../src/styles/app.scss";
import ContentComponent from "../components/content/content-component";
import {
	IContentComponentInitData,
	IMLParsedNode,
	MLNODE_TYPES,
} from "interfaces/models";
import mockAstTree from "./mocks/mockAstTree";
import { mlUtils } from "lib/ml-utils";

const mockTextNode: IMLParsedNode = {
	type: MLNODE_TYPES.HEADING,
	text: "text",
	key: "someKey",
	line: 1,
};
const mockStrongNode: IMLParsedNode = {
	type: MLNODE_TYPES.STRONG,
	text: "text",
	key: "someKey",
	line: 1,
};
const mockEmNode: IMLParsedNode = {
	type: MLNODE_TYPES.EM,
	text: "text",
	key: "someKey",
	line: 1,
};

const mockNodeType = {
	[MLNODE_TYPES.TEXT]: mockTextNode,
	[MLNODE_TYPES.STRONG]: mockStrongNode,
	[MLNODE_TYPES.EM]: mockEmNode,
};

const ddd = {
	type: "paragraph",
	line: 0,
	key: "ast-0",
	ordered: false,
	// target: null,
	// level: null,
	// text: null,
	// attributes: null,
	children: [
		{
			key: "ast-1",
			line: 0,
			type: "line",
			children: [
				{
					type: "text",
					key: "ast-2",
					line: 0,
					text: "Some text ",
				},
				{
					type: "em",
					line: 0,
					key: "ast-3",
					children: [
						{
							type: "text",
							key: "ast-4",
							line: 0,
							text: "with italics",
						},
					],
					ordered: false,
					target: null,
					level: null,
					text: null,
					attributes: null,
				},
				{
					type: "text",
					key: "ast-5",
					line: 0,
					text: " and more text",
				},
				{
					type: "link",
					line: 0,
					key: "ast-6",
					children: [
						{
							type: "text",
							key: "ast-7",
							line: 0,
							text: "^",
						},
					],
					ordered: false,
					target: "annotations/recent-article",
					level: null,
					text: null,
					attributes: null,
					displayType: "popover",
					linkType: "annotation",
					occurrenceIndex: 1,
					sequence: 1,
				},
			],
		},
	],
};

const meta = {
	title: "ContentBlocks/ContentComponent",
	component: ContentComponent,
	parameters: {
		layout: "centered",
	},
	tags: ["autodocs"],
	argTypes: {
		type: {
			control: "select",
			options: [MLNODE_TYPES.TEXT, MLNODE_TYPES.STRONG, MLNODE_TYPES.EM],
			defaultValue: MLNODE_TYPES.TEXT,
		},
	},
} satisfies Meta; //<typeof ContentComponent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Text: Story = {
	args: {
		type: meta.argTypes.type.defaultValue,
	},
	render: function Render({ type }) {
		return mockAstTree.map((node: IContentComponentInitData) => {
			return (
				<ContentComponent key={mlUtils.uniqueId()} componentData={{ node }} />
			);
		});
	},
};
