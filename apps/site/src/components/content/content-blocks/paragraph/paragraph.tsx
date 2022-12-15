import React from "react";
import { ContentComponent } from "../../index";
import {
	IMLParsedNode,
	ContentComponentProps,
} from "../../../../interfaces/models";
import { st, classes } from "./paragraph.st.css";

export const Paragraph = ({
	componentData,
	className,
}: ContentComponentProps): JSX.Element => {
	const { node } = componentData;
	const elements: IMLParsedNode[] = Array.isArray(node.children)
		? node.children
		: [];
	return (
		<p className={st(classes.root, className)} key={node.key}>
			{elements.map((node) => {
				return <ContentComponent key={node.key} componentData={{ node }} />;
			})}
		</p>
	);
};

export default Paragraph;
