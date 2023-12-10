import React from "react";
import { ContentComponentProps } from "../../../../interfaces/models";
import ContentIterator from "../../dynamic-content-browser/content-iterator";

export const ListItem = (props: ContentComponentProps): JSX.Element => {
	return (
		<li className="list-item">
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
