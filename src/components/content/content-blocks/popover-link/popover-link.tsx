import React from "react";
import { ContentComponentProps } from "../../../../interfaces/models";
import { ContentIterator } from "../../content-iterator";
import { classes } from "./popover-link.st.css";

export const PopoverLink = (props: ContentComponentProps): JSX.Element => {
	const p = props.componentData.node;
	return (
		<a
			className={classes.root}
			href={p.target}
			target="_blank"
			rel="noreferrer"
		>
			<ContentIterator componentData={props.componentData} />
		</a>
	);
};

export default PopoverLink;
