import React from "react";
import { ContentComponentProps } from "../../../../interfaces/models";
import { classes } from "./annotation-link.st.css";

export const AnnotationLink = (props: ContentComponentProps): JSX.Element => {
	const p = props.componentData.node;
	return (
		<>
			<sup className={classes.root}>{p.sequence}</sup>
		</>
	);
};

export default AnnotationLink;
