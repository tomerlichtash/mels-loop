import React from "react";
import { ContentComponentProps } from "../../../../interfaces/models";
import { st, classes } from "./annotation-link.st.css";

export const AnnotationLink = ({
	componentData,
}: ContentComponentProps): JSX.Element => {
	const { node } = componentData;
	const annotationPrefix = node.sequence <= 9 ? "0" : "";
	return (
		<>
			<span className={st(classes.root)}>
				{annotationPrefix}
				{node.sequence}
			</span>
		</>
	);
};

export default AnnotationLink;
