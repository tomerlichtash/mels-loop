import React from "react";
import { ContentComponentProps } from "../../../../interfaces/models";

export const AnnotationLink = ({
	componentData,
}: ContentComponentProps): JSX.Element => {
	const { node } = componentData;
	const annotationPrefix = node.sequence <= 9 ? "0" : "";
	return (
		<>
			<span className="annotation">
				<span
					className="content"
					data-prefix={annotationPrefix}
					data-seq={node.sequence}
				></span>
			</span>
		</>
	);
};

export default AnnotationLink;
