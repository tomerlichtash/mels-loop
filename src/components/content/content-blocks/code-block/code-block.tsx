import React from "react";
import { ContentComponentProps } from "../../../../interfaces/models";

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
		<div className="code-snippet">
			<pre className="pre">
				<code className="code" key={node.key}>
					{node.text}
				</code>
			</pre>
		</div>
	);
};

export default CodeBlock;
