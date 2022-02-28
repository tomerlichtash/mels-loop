import React from "react";
import { ContentComponentProps } from "../../../../interfaces/models";
import { ContentComponent } from "../../index";
import { style, classes } from "./paragraph.st.css";

export const Paragraph = (props: ContentComponentProps): JSX.Element => {
	const p = props.componentData.node;
	const children = p.children || [];
	const { className } = props;

	if (children.length === 0) {
		return <p className={classes.empty}></p>;
	}

	if (children.length === 1 && children[0].type === "text") {
		return (
			<p key={p.key} className={classes.root} data-line-index={p.line}>
				{p.children[0].text}
			</p>
		);
	}

	return (
		<p key={p.key} className={classes.root} data-line-index={p.line}>
			{children.map((node) => {
				return (
					<ContentComponent
						key={node.key}
						className={className}
						componentData={{ node: node }}
					/>
				);
			})}
		</p>
	);
};

export default Paragraph;
