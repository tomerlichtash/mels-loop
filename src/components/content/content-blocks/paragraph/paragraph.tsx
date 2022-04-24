import React from "react";
import { ContentComponentProps } from "../../../../interfaces/models";
import { ContentComponent } from "../../index";
import { st, classes } from "./paragraph.st.css";

export const Paragraph = ({
	componentData,
	className,
}: ContentComponentProps): JSX.Element => {
	const { node } = componentData;
	const children = node.children || [];

	const { line } = node;
	const anchor = <a id={`line${line + 1}`}></a>;

	if (children.length === 0) {
		return <p className={classes.empty}></p>;
	}

	if (children.length === 1 && children[0].type === "text") {
		return (
			<p
				key={node.key}
				className={st(classes.root, className)}
				data-line-index={line + 1}
			>
				{anchor}
				{node.children[0].text}
			</p>
		);
	}

	return (
		<p
			key={node.key}
			className={st(classes.root, className)}
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
		</p>
	);
};

export default Paragraph;
