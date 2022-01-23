import React from "react";
import { ContentComponentProps } from "../../../interfaces/models";
import ContentIterator from "../contentIterator";
import { classes } from "./list-item.st.css";

export const ListItem = (props: ContentComponentProps): JSX.Element => {
	return (
		<li className={classes.root}>
			<ContentIterator
				data={{
					...props.data,
				}}
			/>
		</li>
	);
};

export default ListItem;
