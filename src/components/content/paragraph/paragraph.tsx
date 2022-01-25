import React from "react";
import { ContentComponentProps } from "../../../interfaces/models";
import ContentComponent from "../content-component";
import { classes } from "./paragraph.st.css";

export const Paragraph = (props: ContentComponentProps): JSX.Element => {
	const p = props.data.data;
	const children = p.children || [];
	if (children.length === 0) {
		return <p></p>;
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
						data={{
							data: node,
						}}
					/>
				);
			})}
		</p>
	);
};

export default Paragraph;
