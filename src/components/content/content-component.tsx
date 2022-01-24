import React from "react";
import Link from "./link/link";
import { ContentComponentProps, IMLParsedNode } from "../../interfaces/models";
import Heading from "./heading";
import ListItem from "./list-item";
import Paragraph from "./paragraph";
import Section from "./section";
import ContentIterator from "./content-iterator";

export const ContentComponent = (props: ContentComponentProps): JSX.Element => {
	const data = props.data;
	const node: IMLParsedNode = data.data;
	if (!node.key) {
		console.warn("missing key on", node);
	}
	switch (node.type) {
		case "paragraph":
			return <Section key={node.key} data={data} />;
		case "line":
			return <Paragraph key={node.key} data={data} />;
		case "del":
		case "ins":
		case "strong":
		case "em":
		case "code":
			return (
				<ContentIterator
					key={node.key}
					data={{
						...data,
						tag: node.type,
					}}
				/>
			);
		case "blockquote":
			return (
				<ContentIterator
					key={node.key}
					data={{
						...data,
						tag: "blockquote",
					}}
				/>
			);
		case "text":
			return <span key={node.key}>{node.text}</span>;
		case "list":
			return (
				<ContentIterator
					key={node.key}
					data={{
						...data,
						tag: node.ordered ? "ol" : "ul",
					}}
				/>
			);
		case "list-item":
			return <ListItem key={node.key} data={data} />;
		case "link":
			return <Link key={node.key} data={data} />;
		default:
			if (/heading/i.test(node.type)) {
				return <Heading data={data} key={node.key} />;
			}
			return (
				<div className={"error"} key={node.key}>
					Type {data.data.type} not found
				</div>
			);
	}
};

export default ContentComponent;
