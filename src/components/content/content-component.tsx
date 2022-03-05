import React, { useContext } from "react";
import {
	ContentComponentProps,
	IMLParsedNode,
	MLNODE_TYPES,
	NODE_LIST_TYPES,
	PageContentAttributes,
} from "../../interfaces/models";
import {
	Link,
	Heading,
	ListItem,
	Paragraph,
	Section,
	Figure,
	PopoverLink,
} from "./content-blocks";
import { ContentIterator } from "./content-iterator";
import CustomImage from "./content-blocks/custom-image";
import { ReactPageContext } from "../page/page-context";
import { style, classes } from "./content-component.st.css";

export const ContentComponent = (props: ContentComponentProps): JSX.Element => {
	const data = props.componentData;
	const node: IMLParsedNode = data.node;
	const { key, type } = node;
	const pageContext = useContext(ReactPageContext);
	const { className } = props;
	debugger;
	if (!key) {
		console.warn("missing key on", node);
	}

	switch (type) {
		case MLNODE_TYPES.SECTION:
			return (
				<Section
					key={key}
					componentData={data}
					// className={style(classes.root, className)}
				/>
			);
		case MLNODE_TYPES.PARAGRAPH:
			return (
				<Paragraph
					key={key}
					componentData={data}
					className={style(
						classes.root,
						{ type: "paragraph" },
						classes.paragraph,
						className
					)}
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
					componentData={{ tag: type, ...data }}
					className={className}
				/>
			);
		case MLNODE_TYPES.BLOCKQUOTE:
			return (
				<ContentIterator
					key={key}
					componentData={{ tag: MLNODE_TYPES.BLOCKQUOTE, ...data }}
					className={className}
				/>
			);
		case MLNODE_TYPES.TEXT:
			const { text } = node;
			return (
				<span
					key={key}
					className={style(classes.text, { type: "text" }, className)}
				>
					{text}
				</span>
			);
		case MLNODE_TYPES.LIST:
			const { ordered } = node;
			return (
				<ContentIterator
					key={key}
					className={className}
					componentData={{
						tag: ordered ? NODE_LIST_TYPES.ORDERED : NODE_LIST_TYPES.UNORDERED,
						...data,
					}}
				/>
			);
		case MLNODE_TYPES.LIST_ITEM:
			return <ListItem key={key} componentData={data} className={className} />;
		case MLNODE_TYPES.LINK:
			return pageContext.hasAttribute(PageContentAttributes.Story) ? (
				<PopoverLink key={key} componentData={data} className={className} />
			) : (
				<Link key={key} componentData={data} className={className} />
			);
		case MLNODE_TYPES.IMAGE:
			return (
				<CustomImage key={key} componentData={data} className={className} />
			);
		case MLNODE_TYPES.FIGURE:
			debugger;
			return (
				<Figure
					key={key}
					componentData={data}
					className={style(
						classes.root,
						{ type: "figure" },
						classes.figure,
						className
					)}
				/>
			);
		default:
			if (/heading/i.test(type)) {
				return <Heading key={key} componentData={data} className={className} />;
			}
			return (
				<div className={classes.error} key={key}>
					<pre className={classes.error}>Type {data.node.type} not found</pre>
				</div>
			);
	}
};

export default ContentComponent;
