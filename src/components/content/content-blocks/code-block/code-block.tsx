import React from "react";
import { ContentComponentProps } from "../../../../interfaces/models";
import styles from "./code-block.module.scss";

export const CodeBlock = ({
	componentData,
}: ContentComponentProps): JSX.Element => {
	const { node } = componentData;

	return (
		<div className={styles.root}>
			<pre className={styles.pre}>
				<code className={styles.code} key={node.key}>
					{node.text}
				</code>
			</pre>
		</div>
	);
};
