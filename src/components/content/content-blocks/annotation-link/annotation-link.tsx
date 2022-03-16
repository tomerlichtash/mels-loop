import React from "react";
import { ContentComponentProps } from "../../../../interfaces/models";

export const AnnotationLink = (props: ContentComponentProps): JSX.Element => {
	const p = props.componentData.node;
	return (
		<span>
		<span>&lt;</span><span>{p.sequence}</span><span>&gt;</span>
		</span>
	);
};

export default AnnotationLink;
