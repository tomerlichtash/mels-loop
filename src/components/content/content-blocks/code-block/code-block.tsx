import React from "react";
import {
	ContentComponentProps,
} from "../../../../interfaces/models";
import { st, classes } from "./code-block.st.css";

/**
 * Displays a code block (preformatted code)
 * @returns 
 */
export const CodeBlock = ({
	componentData,
	className
}: ContentComponentProps): JSX.Element => {
	const { node } = componentData;
	return (
		<code className={st(classes.root, className)} key={node.key}>
			{node.text}
		</code>
	);
};

export default CodeBlock;
