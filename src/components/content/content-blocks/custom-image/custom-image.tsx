import React from "react";
import { ContentComponentProps } from "../../../../interfaces/models";
import styles from "./custom-image.module.scss";

export const CustomImage = (props: ContentComponentProps): JSX.Element => {
	const { node } = props.componentData;
	const { target } = node;

	return <img className={styles.root} src={target} />;
};

export default CustomImage;
