import React from "react";
import { ContentComponentProps } from "../../../../interfaces/models";
// import { ContentComponent } from "../../index";
// import { CloudinaryContext, Transformation, Image } from "cloudinary-react";
// import { cloudName } from "../../../../config/cloudinary/config";
import { classes } from "./image.st.css";

export const Image = (props: ContentComponentProps): JSX.Element => {
	const node = props.componentData.node;
	const { target } = node;


	return (
		// <CloudinaryContext cloudName={cloudName}>
			<img className={classes.root} src={target} />
	);
};

export default Image;
