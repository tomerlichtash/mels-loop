import React from "react";
import {
	ContentComponentProps,
	MLNODE_TYPES,
	NODE_LIST_TYPES,
} from "../../interfaces/models";
import {
	Heading,
	ListItem,
	Paragraph,
	Section,
	Figure,
} from "./content-blocks";
import { ContentIterator } from "./content-iterator";
import CustomImage from "./content-blocks/custom-image";
import LinkSelector from "./content-blocks/link-selector";
import { st, classes } from "./content-component.st.css";

export const ContentComponent = ({
	componentData,
}: ContentComponentProps): JSX.Element => {
	const { node } = componentData;
	const { key, type } = node;
	const stylableClassName = st(classes.root, { type });

	if (!key) {
		console.warn("missing key on", node);
	}

	switch (type) {
		case MLNODE_TYPES.SECTION:
			return (
				<Section
					key={key}
					componentData={componentData}
					className={stylableClassName}
				/>
			);
		case MLNODE_TYPES.PARAGRAPH:
			return (
				<Paragraph
					key={key}
					componentData={componentData}
					className={stylableClassName}
				/>
			);
		case MLNODE_TYPES.DEL:
		case MLNODE_TYPES.INS:
		case MLNODE_TYPES.STRONG:
		case MLNODE_TYPES.EM:
		case MLNODE_TYPES.CODE:
			return (
				<ContentIterator
					key={key}
					componentData={{ tag: type, ...componentData }}
					className={stylableClassName}
				/>
			);
		case MLNODE_TYPES.BLOCKQUOTE:
			return (
				<ContentIterator
					key={key}
					componentData={{ tag: type, ...componentData }}
					className={stylableClassName}
				/>
			);
		case MLNODE_TYPES.TEXT:
			const { text } = node;
			return (
				<span key={key} className={stylableClassName}>
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
					className={stylableClassName}
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
					className={stylableClassName}
				/>
			);
		case MLNODE_TYPES.LINK:
			return (
				<LinkSelector
					key={key}
					componentData={componentData}
					className={stylableClassName}
				/>
			);
		case MLNODE_TYPES.IMAGE:
			return (
				<CustomImage
					key={key}
					componentData={componentData}
					className={stylableClassName}
				/>
			);
		case MLNODE_TYPES.FIGURE:
			return (
				<Figure
					key={key}
					componentData={componentData}
					className={stylableClassName}
				/>
			);
		default:
			if (/heading/i.test(type)) {
				return (
					<Heading
						key={key}
						componentData={componentData}
						className={st(classes.root, {
							type: `heading_${componentData.node.level}`,
						})}
					/>
				);
			}
			return (
				<div className={classes.error} key={key}>
					<pre className={classes.error}>Type {node.type} not found</pre>
				</div>
			);
	}
};

export default ContentComponent;
