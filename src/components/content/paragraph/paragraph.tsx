import React from "react";
import { IContentComponentInitData } from "../../../interfaces/models";
import ContentComponent from "../contentComponent";
import { classes } from "./paragraph.st.css";

export const Paragraph = (props: {
	data: IContentComponentInitData;
}): JSX.Element => {
	const p = props.data.data;

	return (
		<p key={p.key} className={classes.root} data-line-index={p.line}>
			{(p.children || []).map((node) => {
				return (
					<ContentComponent
						key={node.key}
						data={{
							data: node,
							locale: props.data.locale,
						}}
					/>
				);
			})}
		</p>
	);
};

export default Paragraph;
