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

	if (children.length === 1 && children[0].type === "text") {
		return (
			<p key={node.key} className={className} data-line-index={node.line}>
				{node.children[0].text}
			</p>
		);
	}

	return (
		<p key={node.key} className={className} data-line-index={node.line}>
			{children.map((node) => {
				return (
					<ContentComponent
						key={node.key}
						className={className}
						componentData={{ node }}
					/>
				);
			})}
		</p>
	);
};

export default Paragraph;
