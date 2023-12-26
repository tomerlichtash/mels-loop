import React from "react";
import ContentIterator from "../../dynamic-content-browser/content-iterator";
import styles from "./term-link.module.scss";
import type { ContentComponentProps } from "../../../../interfaces/models";

export const TermLink = ({
	componentData,
}: ContentComponentProps): JSX.Element => {
	return (
		<span className={styles.root}>
			<span className={styles.popoverTrigger}>
				<ContentIterator componentData={componentData} />
			</span>
		</span>
	);
};

export default TermLink;
