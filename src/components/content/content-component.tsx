import React from "react";
import {
	ContentComponentProps,
	IMLParsedNode,
	NODE_TYPES,
	NODE_LIST_TYPES,
} from "../../interfaces/models";
import {
	Link,
	Heading,
	ListItem,
	Paragraph,
	Section,
	FigureComp,
} from "./content-blocks";
import { ContentIterator } from "./content-iterator";
import { classes } from "./content-component.st.css";

export const ContentComponent = (props: ContentComponentProps): JSX.Element => {
	const data = props.data;
	const node: IMLParsedNode = data.data;
	const { key, type } = node;

	if (!key) {
		console.warn("missing key on", node);
	}

	switch (type) {
		case NODE_TYPES.PARAGRAPH:
			return <Section key={key} data={data} />;
		case NODE_TYPES.LINE:
			return <Paragraph key={key} data={data} />;
		case NODE_TYPES.DEL:
		case NODE_TYPES.INS:
		case NODE_TYPES.STRONG:
		case NODE_TYPES.EM:
		case NODE_TYPES.CODE:
			return <ContentIterator key={key} data={{ tag: type, ...data }} />;
		case NODE_TYPES.BLOCKQUOTE:
			return (
				<ContentIterator
					key={key}
					data={{ tag: NODE_TYPES.BLOCKQUOTE, ...data }}
				/>
			);
		case NODE_TYPES.TEXT:
			const { text } = node;
			return <span key={key}>{text}</span>;
		case NODE_TYPES.LIST:
			const { ordered } = node;
			return (
				<ContentIterator
					key={key}
					data={{
						tag: ordered ? NODE_LIST_TYPES.ORDERED : NODE_LIST_TYPES.UNORDERED,
						...data,
					}}
				/>
			);
		case NODE_TYPES.LIST_ITEM:
			return <ListItem key={key} data={data} />;
		case NODE_TYPES.LINK:
			return <Link key={key} data={data} />;
		case NODE_TYPES.IMAGE:
			return <FigureComp key={key} data={data} />;
		default:
			if (/heading/i.test(type)) {
				return <Heading key={key} data={data} />;
			}
			return (
				<div className={classes.error} key={key}>
					<pre className={classes.error}>Type {data.data.type} not found</pre>
				</div>
			);
	}
};

export default ContentComponent;
