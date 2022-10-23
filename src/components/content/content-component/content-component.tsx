import React from "react";
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
	CodeBlock,
	Table,
	CustomImage,
} from "../content-blocks";
import ContentIterator from "../content-iterator";
import LinkSelector from "../link-selector";
import { st, classes } from "./content-component.st.css";

const ROOT_CLASS_TYPES: Set<MLNODE_TYPES> = new Set<MLNODE_TYPES>([
	MLNODE_TYPES.TR
])

export const ContentComponent = ({
	componentData,
	className,
}: ContentComponentProps): JSX.Element => {
	const { node } = componentData;
	const { key, type } = node;
	const useClassname = !ROOT_CLASS_TYPES.has(type);
	const stylableClassName =  st(classes.root, { type }, 
		useClassname? className : "");

	if (!key) {
		console.warn("missing key on", node);
	}

	switch (type) {
		case MLNODE_TYPES.PARAGRAPH:
			return (
				<Paragraph
					key={key}
					componentData={componentData}
					className={stylableClassName}
				/>
			);
		case MLNODE_TYPES.LINE:
			return (
				<Line
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
					className={stylableClassName}
				/>
			);
		//case MLNODE_TYPES.CAPTION:
		//	return (
		//		<ContentIterator
		//			key={key}
		//			componentData={{ tag: type, ...componentData }}
		//			className={st(
		//				classes.root,
		//				{ type, customFigCaption: true },
		//				useClassname ? className : ""
		//			)}
		//		/>
		//	);
		case MLNODE_TYPES.CODEBLOCK:
			return (
				<CodeBlock key={key} componentData={componentData} className={stylableClassName} />
			)
		case MLNODE_TYPES.BLOCKQUOTE:
			return (
				<BlockQuote
					key={key}
					componentData={componentData}
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
					className={st(classes.root, { type, listType }, className)}
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
		case MLNODE_TYPES.TABLE:
			return (
				<Table
					key={key}
					componentData={componentData}
					className={stylableClassName}
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
						className={st(
							classes.root,
							{
								type: `heading_${componentData.node.level}`,
							},
							className
						)}
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
