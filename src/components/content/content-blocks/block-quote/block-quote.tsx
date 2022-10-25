import React from "react";
import { ContentComponent } from "../../index";
import {
	IMLParsedNode,
	ContentComponentProps,
} from "../../../../interfaces/models";
import { mlUtils } from "../../../../lib/ml-utils";
import { useComponentAttributes } from "../../../use-component-attributes";
import { st, classes } from "./block-quote.st.css";

export const BlockQuote = ({
	componentData,
	className,
}: ContentComponentProps): JSX.Element => {
	const { node } = componentData;
	const { attributes } = useComponentAttributes(node);
	const elements: IMLParsedNode[] = Array.isArray(node.children)
		? node.children
		: [];
	return (
		<blockquote className={st(classes.root, className)} key={node.key} {...attributes}>
			<p key={mlUtils.uniqueId()}>
				{elements.map((node) => {
					return <ContentComponent key={node.key} componentData={{ node }} />;
				})}
			</p>
		</blockquote>
	);
};

export default BlockQuote;
