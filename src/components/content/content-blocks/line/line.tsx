import React from "react";
import { ContentComponentProps } from "../../../../interfaces/models";
import { ContentComponent } from "../../index";
import { st, classes } from "./line.st.css";

export const Line = ({
	componentData,
	className,
}: ContentComponentProps): JSX.Element => {
	const { node } = componentData;
	const children = node.children || [];

	const { line } = node;
	const anchor = <a id={`line${line + 1}`}></a>;

	if (children.length === 0) {
		return <span className={st(classes.textLine, classes.empty)}></span>;
	}

	if (children.length === 1 && children[0].type === "text") {
		return (
			<span
				key={node.key}
				className={st(classes.root, classes.textLine, classes.className)}
				data-line-index={line + 1}
			>
				{anchor}
				{node.children[0].text}
			</span>
		);
	}

	return (
		<span
			key={node.key}
			className={st(classes.root, classes.textLine, className)}
			data-line-index={line + 1}
		>
			{anchor}
			{children.map((node) => (
				<ContentComponent
					key={node.key}
					className={className}
					componentData={{ node }}
				/>
			))}
		</span>
	);
};

export default Line;
