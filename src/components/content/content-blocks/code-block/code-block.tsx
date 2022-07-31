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
		<p className={st(classes.root)} key={node.key}>
			<code className={st(classes.root, className)}>
				{node.text}
			</code>
		</p>
	);
};

export default CodeBlock;
