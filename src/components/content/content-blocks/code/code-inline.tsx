import React from "react";
import { ContentComponentProps } from "../../../../interfaces/models";
import styles from "./code-inline.module.scss";

export const CodeInline = ({
	componentData,
}: ContentComponentProps): JSX.Element => {
	const { node } = componentData;
	return <code className={styles.root}>{node.text}</code>;
};
