import React from "react";
import { ContentComponentProps } from "../../../../interfaces/models";
// import Image from "next/image";
// import { ContentComponent } from "../../index";
// import { CloudinaryContext, Transformation, Image } from "cloudinary-react";
// import { cloudName } from "../../../../config/cloudinary/config";
import { classes } from "./figure.st.css";

export const Figure = (props: ContentComponentProps): JSX.Element => {
	const node = props.componentData.node;
	const { target } = node;
	// const publicId = target.split("?")[0];
	// const imgParamsStr = target.split("?")[1];

	// let paramObj = JSON.parse(imgParamsStr);
	// let imgParams = {
	// 	width: 800,
	// 	height: 0,
	// 	title: publicId,
	// };

	// if (imgParamsStr) {
	// 	if (paramObj.width) {
	// 		imgParams.width = paramObj.width;
	// 	}
	// 	if (paramObj.height) {
	// 		imgParams.height = paramObj.height;
	// 	}
	// 	if (paramObj.title) {
	// 		imgParams.title = paramObj.title.replace("%20", " ");
	// 	}
	// }

	// const { width, height, title } = imgParams;

	return (
		// <CloudinaryContext cloudName={cloudName}>
		<figure className={classes.root}>
			<img src={target}  />
			{/* <Image publicId={publicId} title={title} arial-label={title}>
				{width && height && (
					<Transformation width={width} height={height} crop="scale" />
				)}
				{width && !height && <Transformation width={width} crop="scale" />}
				{!width && height && <Transformation height={height} crop="scale" />}
				{!width && !height && <Transformation crop="scale" />}
			</Image> */}
		</figure>
		// </CloudinaryContext>
	);
};

export default Figure;
