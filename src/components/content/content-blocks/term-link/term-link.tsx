import React from "react";
import { ContentComponentProps } from "../../../../interfaces/models";
import ContentIterator from "../../dynamic-content-browser/content-iterator";
import styles from "./term-link.module.scss";

export const TermLink = ({
	componentData,
}: ContentComponentProps): JSX.Element => {
	return (
		<span className={styles.root}>
			<ContentIterator componentData={componentData} />
		</span>
	);
};

export default TermLink;
