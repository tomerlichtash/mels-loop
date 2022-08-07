import React from "react";
import { ContentComponent } from "../../index";
import {
	IMLParsedNode,
	ContentComponentProps,
} from "../../../../interfaces/models";
import { st, classes } from "./block-quote.st.css";

export const BlockQuote = ({
	componentData,
	className,
}: ContentComponentProps): JSX.Element => {
	const { node } = componentData;
	const elements: IMLParsedNode[] = Array.isArray(node.children)
		? node.children
		: [];
	return (
		<blockquote className={st(classes.root, className)} key={node.key}>
			{elements.map((node) => {
				return <ContentComponent key={node.key} componentData={{ node }} />;
			})}
		</blockquote>
	);
};

export default BlockQuote;
