import React from "react";
import Link from "./link/link";
import {
	ContentComponentProps,
	IMLParsedNode,
	NODE_TYPES,
	NODE_LIST_TYPES,
} from "../../interfaces/models";
import Heading from "./heading";
import ListItem from "./list-item";
import Paragraph from "./paragraph";
import Section from "./section";
import ContentIterator from "./content-iterator";
import { classes } from "./content-iterator.st.css";

export const ContentComponent = (props: ContentComponentProps): JSX.Element => {
	const data = props.data;
	const node: IMLParsedNode = data.data;
	if (!node.key) {
		console.warn("missing key on", node);
	}
	switch (node.type) {
		case NODE_TYPES.PARAGRAPH:
			return <Section key={node.key} data={data} />;
		case NODE_TYPES.LINE:
			return <Paragraph key={node.key} data={data} />;
		case NODE_TYPES.DEL:
		case NODE_TYPES.INS:
		case NODE_TYPES.STRONG:
		case NODE_TYPES.EM:
		case NODE_TYPES.CODE:
			return (
				<ContentIterator
					key={node.key}
					data={{
						...data,
						tag: node.type,
					}}
				/>
			);
		case NODE_TYPES.BLOCKQUOTE:
			return (
				<ContentIterator
					key={node.key}
					data={{
						...data,
						tag: NODE_TYPES.BLOCKQUOTE,
					}}
				/>
			);
		case NODE_TYPES.TEXT:
			return <span key={node.key}>{node.text}</span>;
		case NODE_TYPES.LIST:
			return (
				<ContentIterator
					key={node.key}
					data={{
						...data,
						tag: node.ordered
							? NODE_LIST_TYPES.ORDERED
							: NODE_LIST_TYPES.UNORDERED,
					}}
				/>
			);
		case NODE_TYPES.LIST_ITEM:
			return <ListItem key={node.key} data={data} />;
		case NODE_TYPES.LINK:
			return <Link key={node.key} data={data} />;
		default:
			if (/heading/i.test(node.type)) {
				return <Heading data={data} key={node.key} />;
			}
			return (
				<div className={classes.error} key={node.key}>
					<pre>Type {data.data.type} not found</pre>
				</div>
			);
	}
};

export default ContentComponent;
