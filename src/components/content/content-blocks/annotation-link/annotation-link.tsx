import React from "react";
import { ContentComponentProps } from "../../../../interfaces/models";
import styles from "./_annotation-link.module.scss";
import classNames from "classnames";

const AnnotationLink = ({
	componentData,
	className,
}: ContentComponentProps): JSX.Element => {
	const { node } = componentData;
	const annotationPrefix = node.sequence <= 9 ? "0" : "";
	return (
		<span className={classNames(styles.root, className)}>
			<span
				className={styles.content}
				data-prefix={annotationPrefix}
				data-seq={node.sequence}
			></span>
		</span>
	);
};

export default AnnotationLink;
