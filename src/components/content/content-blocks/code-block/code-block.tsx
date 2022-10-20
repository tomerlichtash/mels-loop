import React from "react";
import { ContentComponentProps } from "../../../../interfaces/models";
import { st, classes } from "./code-block.st.css";

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
		<div className={st(classes.root, className)}>
			<pre className={classes.pre}>
				<code className={classes.code} key={node.key}>
					{node.text}
				</code>
			</pre>
		</div>
	);
};

export default CodeBlock;
