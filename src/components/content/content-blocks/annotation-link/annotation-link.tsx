import React from "react";
import { ContentComponentProps } from "../../../../interfaces/models";
import styles from "./annotation-link.module.scss";

export const AnnotationLink = ({
	componentData,
}: ContentComponentProps): JSX.Element => {
	const { node } = componentData;
	const annotationPrefix = node.sequence <= 9 ? "0" : "";
	return (
		<>
			<span className={styles.root}>
				<span
					className={styles.content}
					data-prefix={annotationPrefix}
					data-seq={node.sequence}
				></span>
			</span>
		</>
	);
};

export default AnnotationLink;
