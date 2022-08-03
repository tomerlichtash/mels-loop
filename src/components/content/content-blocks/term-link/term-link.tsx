import React from "react";
import { ContentComponentProps } from "../../../../interfaces/models";
import ContentIterator from "../../content-iterator";
import { classes } from "./term-link.st.css";

export const TermLink = ({
	componentData,
}: ContentComponentProps): JSX.Element => {
	return (
		<ContentIterator componentData={componentData} className={classes.root} />
	);
};

export default TermLink;
