import React from "react";
import { ContentComponent } from "../../index";
import {
	IMLParsedNode,
	ContentComponentProps,
} from "../../../../interfaces/models";
import { st, classes } from "./section.st.css";

export const Section = ({
	componentData,
	className,
}: ContentComponentProps): JSX.Element => {
	const { node } = componentData;
	const elements: IMLParsedNode[] = Array.isArray(node.children)
		? node.children
		: [];
	return (
		<div className={st(classes.root, className)} key={node.key}>
			{elements.map((node) => {
				return (
					<ContentComponent
						key={node.key}
						componentData={{ node }}
						className={className}
					/>
				);
			})}
		</div>
	);
};

export default Section;
