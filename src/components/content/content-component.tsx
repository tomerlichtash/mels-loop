import React from "react";
import {
	ContentComponentProps,
	IMLParsedNode,
	MLNODE_TYPES,
	NODE_LIST_TYPES,
} from "../../interfaces/models";
import {
	Link,
	Heading,
	ListItem,
	Paragraph,
	Section,
	Figure,
} from "./content-blocks";
import { ContentIterator } from "./content-iterator";
import { classes } from "./content-component.st.css";
import CustomImage from "./content-blocks/custom-image";

export const ContentComponent = (props: ContentComponentProps): JSX.Element => {
	const data = props.componentData;
	const node: IMLParsedNode = data.node;
	const { key, type } = node;

	if (!key) {
		console.warn("missing key on", node);
	}

	switch (type) {
		case MLNODE_TYPES.SECTION:
			return <Section key={key} componentData={data} />;
		case MLNODE_TYPES.PARAGRAPH:
			return <Paragraph key={key} componentData={data} />;
		case MLNODE_TYPES.DEL:
		case MLNODE_TYPES.INS:
		case MLNODE_TYPES.STRONG:
		case MLNODE_TYPES.EM:
		case MLNODE_TYPES.CODE:
			return (
				<ContentIterator key={key} componentData={{ tag: type, ...data }} />
			);
		case MLNODE_TYPES.BLOCKQUOTE:
			return (
				<ContentIterator
					key={key}
					componentData={{ tag: MLNODE_TYPES.BLOCKQUOTE, ...data }}
				/>
			);
		case MLNODE_TYPES.TEXT:
			const { text } = node;
			return <span key={key}>{text}</span>;
		case MLNODE_TYPES.LIST:
			const { ordered } = node;
			return (
				<ContentIterator
					key={key}
					componentData={{
						tag: ordered ? NODE_LIST_TYPES.ORDERED : NODE_LIST_TYPES.UNORDERED,
						...data,
					}}
				/>
			);
		case MLNODE_TYPES.LIST_ITEM:
			return <ListItem key={key} componentData={data} />;
		case MLNODE_TYPES.LINK:
			return <Link key={key} componentData={data} />;
		case MLNODE_TYPES.IMAGE:
				return <CustomImage key={key} componentData={data} />;
		case MLNODE_TYPES.FIGURE:
			return <Figure key={key} componentData={data} />;
		default:
			if (/heading/i.test(type)) {
				return <Heading key={key} componentData={data} />;
			}
			return (
				<div className={classes.error} key={key}>
					<pre className={classes.error}>Type {data.node.type} not found</pre>
				</div>
			);
	}
};

export default ContentComponent;
