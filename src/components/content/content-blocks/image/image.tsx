import React from "react";
import { ContentComponentProps } from "../../../../interfaces/models";
import { classes } from "./image.st.css";

export const Image = (props: ContentComponentProps): JSX.Element => {
	const { node } = props.componentData;
	const { target } = node;

	return <img className={classes.root} src={target} />;
};

export default Image;
