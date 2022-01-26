import React from "react";
import { ContentComponentProps } from "../../../interfaces/models";
import ContentIterator from "../content-iterator";
import { classes } from "./link.st.css";

export const Link = (props: ContentComponentProps): JSX.Element => {
	const p = props.data.data;
	return (
		<a
			className={classes.root}
			href={p.target}
			target="_blank"
			rel="noreferrer"
		>
			<ContentIterator data={props.data} />
		</a>
	);
};

export default Link;
