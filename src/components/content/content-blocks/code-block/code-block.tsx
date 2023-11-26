import React from "react";
import { ContentComponentProps } from "../../../../interfaces/models";
import styles from "./code-block.module.scss";

/**
 * Displays a code block (preformatted code)
 * @returns
 */
export const CodeBlock = ({
	componentData,
	className,
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

export default CodeBlock;
