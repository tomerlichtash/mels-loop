import React from "react";
import { ContentComponentProps } from "../../../../interfaces/models";
import ContentIterator from "../../dynamic-content-browser/content-iterator";
import styles from "./list-item.module.scss";

export const ListItem = (props: ContentComponentProps): JSX.Element => {
	return (
		<li className={styles.root}>
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
