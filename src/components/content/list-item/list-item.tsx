import { IContentComponentInitData } from "../../../interfaces/models";
import ContentIterator from "../contentIterator";
import React from "react";
import { classes } from "./list-item.st.css";

export const ListItem = (props: {
	data: IContentComponentInitData;
}): JSX.Element => {
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
