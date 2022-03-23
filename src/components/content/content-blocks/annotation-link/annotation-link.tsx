import React from "react";
import { ContentComponentProps } from "../../../../interfaces/models";
import { classes } from "./annotation-link.st.css";

export const AnnotationLink = ({
	componentData,
}: ContentComponentProps): JSX.Element => {
	const { node } = componentData;
	const annotationPrefix = node.sequence <= 9 ? "0" : "";
	return (
		<>
			<sup className={classes.root}>
				{annotationPrefix}
				{node.sequence}
			</sup>
		</>
	);
};

export default AnnotationLink;
