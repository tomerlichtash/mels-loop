import React from "react";
import { ContentComponentProps } from "../../../../interfaces/models";
import { ContentComponent } from "../../index";
import { classes } from "./paragraph.st.css";

export const Paragraph = ({
	componentData,
	className,
}: ContentComponentProps): JSX.Element => {
	const { node } = componentData;
	const children = node.children || [];

	if (children.length === 0) {
		return <p className={classes.empty}></p>;
	}

	const { line } = node;

	if (children.length === 1 && children[0].type === "text") {
		return (
			<p key={node.key} className={className} data-line-index={line}>
				<a id={`line${line}`}></a>
				{node.children[0].text}
			</p>
		);
	}

	return (
		<p key={node.key} className={className} data-line-index={line}>
			<a id={`line${line}`}></a>
			{children.map((node) => (
				<ContentComponent
					key={node.key}
					className={className}
					componentData={{ node }}
				/>
			))}
		</p>
	);
};

export default Paragraph;
