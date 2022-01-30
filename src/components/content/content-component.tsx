import React from "react";
import {
	ContentComponentProps,
	IMLParsedNode,
	NODE_TYPES,
	NODE_LIST_TYPES,
} from "../../interfaces/models";
import { Link, Heading, ListItem, Paragraph, Section } from "./content-blocks";
import { ContentIterator } from "./content-iterator";
import { classes } from "./content-component.st.css";

export const ContentComponent = (props: ContentComponentProps): JSX.Element => {
	const data = props.componentData;
	const node: IMLParsedNode = data.node;
	const { key, type } = node;

	if (!key) {
		console.warn("missing key on", node);
	}

	switch (type) {
		case NODE_TYPES.PARAGRAPH:
			return <Section key={key} componentData={data} />;
		case NODE_TYPES.LINE:
			return <Paragraph key={key} componentData={data} />;
		case NODE_TYPES.DEL:
		case NODE_TYPES.INS:
		case NODE_TYPES.STRONG:
		case NODE_TYPES.EM:
		case NODE_TYPES.CODE:
			return <ContentIterator key={key} componentData={{ tag: type, ...data }} />;
		case NODE_TYPES.BLOCKQUOTE:
			return (
				<ContentIterator
					key={key}
					componentData={{ tag: NODE_TYPES.BLOCKQUOTE, ...data }}
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
					componentData={{
						tag: ordered ? NODE_LIST_TYPES.ORDERED : NODE_LIST_TYPES.UNORDERED,
						...data,
					}}
				/>
			);
		case NODE_TYPES.LIST_ITEM:
			return <ListItem key={key} componentData={data} />;
		case NODE_TYPES.LINK:
			return <Link key={key} componentData={data} />;
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
