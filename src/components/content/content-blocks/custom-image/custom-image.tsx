import React from "react";
import { ContentComponentProps } from "../../../../interfaces/models";

export const CustomImage = (props: ContentComponentProps): JSX.Element => {
	const { node } = props.componentData;
	const { target } = node;

	return <img className="image" src={target} />;
};

export default CustomImage;
