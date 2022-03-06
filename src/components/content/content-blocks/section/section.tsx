import React from "react";
import { ContentComponent } from "../../index";
import {
	IMLParsedNode,
	ContentComponentProps,
} from "../../../../interfaces/models";
import { classes } from "./section.st.css";

export const Section = (props: ContentComponentProps): JSX.Element => {
	const p = props.componentData.node;
	const elements: IMLParsedNode[] = Array.isArray(p.children) ? p.children : [];
	return (
		<div className={classes.root} key={p.key}>
			{elements.map((node) => {
				return <ContentComponent key={node.key} componentData={{ node }} />;
			})}
		</div>
	);
};

export default Section;
