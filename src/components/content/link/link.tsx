import { IContentComponentInitData } from "../../../interfaces/models";
import ContentIterator from "../contentIterator";
import React from "react";
import { classes } from "./link.st.css";

export const Link = (props: {
	data: IContentComponentInitData;
}): JSX.Element => {
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
