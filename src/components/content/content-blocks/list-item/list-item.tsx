import React from "react";
import { ContentComponentProps } from "../../../../interfaces/models";
import { ContentIterator } from "../../content-iterator";
import { classes } from "./list-item.st.css";

export const ListItem = (props: ContentComponentProps): JSX.Element => {
	return (
		<li className={classes.root}>
			<ContentIterator
				componentData={{
					...props.componentData,
				}}
				className={props.className}
			/>
		</li>
	);
};

export default ListItem;
