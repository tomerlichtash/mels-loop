import React from "react";
import ContentIterator from "../dynamic-content-browser/content-iterator";
import { LinkSelector } from "./link-selector";
import {
	ContentComponentProps,
	MLNODE_TYPES,
	NODE_LIST_TYPES,
} from "../../../interfaces/models";

import {
	Heading,
	ListItem,
	Line,
	Paragraph,
	Figure,
	BlockQuote,
	Code,
	Table,
	CustomImage,
} from "../content-blocks";

export const ContentComponent = ({
	componentData,
	className,
}: ContentComponentProps): JSX.Element => {
	const { node } = componentData;
	const { key, type } = node;
	const contentClassName = `content-component-${type}`;

	if (!key) {
		console.warn("missing key on", node);
	}

	switch (type) {
		case MLNODE_TYPES.DEL:
		case MLNODE_TYPES.INS:
		case MLNODE_TYPES.STRONG:
		case MLNODE_TYPES.EM:
		case MLNODE_TYPES.TR:
		case MLNODE_TYPES.TD:
		case MLNODE_TYPES.TH:
		case MLNODE_TYPES.SUB:
		case MLNODE_TYPES.SUP:
		case MLNODE_TYPES.CITE:
		case MLNODE_TYPES.FIGCAPTION:
			return (
				<ContentIterator
					key={key}
					componentData={{ tag: type, ...componentData }}
					className={contentClassName}
				/>
			);
		case MLNODE_TYPES.PARAGRAPH:
			return <Paragraph key={key} componentData={componentData} />;
		case MLNODE_TYPES.LINE:
			return <Line key={key} componentData={componentData} />;
		case MLNODE_TYPES.CODE:
			return (
				<Code
					key={key}
					inline={true}
					componentData={componentData}
					className={contentClassName}
				/>
			);
		case MLNODE_TYPES.CODEBLOCK:
			return (
				<Code
					key={key}
					componentData={componentData}
					className={contentClassName}
				/>
			);
		case MLNODE_TYPES.BLOCKQUOTE:
			return <BlockQuote key={key} componentData={componentData} />;
		case MLNODE_TYPES.TEXT:
			const { text } = node;
			return (
				<span key={key} className={contentClassName}>
					{text}
				</span>
			);
		case MLNODE_TYPES.LIST:
			const { ordered } = node;
			const listType = ordered
				? NODE_LIST_TYPES.ORDERED
				: NODE_LIST_TYPES.UNORDERED;
			return (
				<ContentIterator
					key={key}
					className={`${className}-${type}`}
					// className={st(classes.root, { type, listType }, className)}
					componentData={{
						tag: listType,
						...componentData,
					}}
				/>
			);
		case MLNODE_TYPES.LIST_ITEM:
			return (
				<ListItem
					key={key}
					componentData={componentData}
					className={contentClassName}
				/>
			);
		case MLNODE_TYPES.LINK:
			return (
				<LinkSelector
					key={key}
					componentData={componentData}
					className={contentClassName}
				/>
			);
		case MLNODE_TYPES.IMAGE:
			return (
				<CustomImage
					key={key}
					componentData={componentData}
					className={contentClassName}
				/>
			);
		case MLNODE_TYPES.FIGURE:
			return (
				<Figure
					key={key}
					componentData={componentData}
					className={contentClassName}
				/>
			);
		case MLNODE_TYPES.TABLE:
			return (
				<Table
					key={key}
					componentData={componentData}
					className={contentClassName}
				/>
			);
		case MLNODE_TYPES.HR:
			return <hr />;
		default:
			if (/heading/i.test(type)) {
				return (
					<Heading
						key={key}
						componentData={componentData}
						className={`content-component-heading-${node.level}`}
						// className={st(
						// 	classes.root,
						// 	{
						// 		type: `heading_${componentData.node.level}`,
						// 	},
						// 	className
						// )}
					/>
				);
			}
			return (
				<div className="error" key={key}>
					<pre>Type {node.type} not found</pre>
				</div>
			);
	}
};

export default ContentComponent;
