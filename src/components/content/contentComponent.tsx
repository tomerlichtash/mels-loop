// import homeStyles from '../../styles/home.module.scss';
import React from "react";
import Link from "./link";
import {
	IContentComponentInitData,
	IMLParsedNode,
} from "../../interfaces/models";
import Heading from "./heading";
import ListItem from "./listItem";
import Paragraph from "./paragraph";
import Section from "./section";
import ContentIterator from "./contentIterator";

export const ContentComponent = (props: {
	data: IContentComponentInitData;
}): JSX.Element => {
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
			return (
				<ContentIterator
					key={node.key}
					data={{
						...data,
						tag: node.type,
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
		case "codeBlock":
			return (
				<ContentIterator
					key={node.key}
					data={{
						...data,
						tag: "code",
					}}
				/>
			);
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
