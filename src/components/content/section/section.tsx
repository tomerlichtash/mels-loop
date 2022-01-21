import React from "react";
import ContentComponent from "../contentComponent";
import {
	IContentComponentInitData,
	IMLParsedNode,
} from "../../../interfaces/models";
import { classes } from "./section.st.css";

export const Section = (props: {
	data: IContentComponentInitData;
}): JSX.Element => {
	const p = props.data.data;
	const elements: IMLParsedNode[] = Array.isArray(p.children) ? p.children : [];

	return (
		<div className={classes.root} key={p.key}>
			{elements.map((node) => {
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
		</div>
	);
};

export default Section;
