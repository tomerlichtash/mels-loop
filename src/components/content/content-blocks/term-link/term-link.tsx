import React from "react";
import { ContentComponentProps } from "../../../../interfaces/models";
import ContentIterator from "../../content-iterator";

export const TermLink = ({
	componentData,
}: ContentComponentProps): JSX.Element => {
	return (
		<ContentIterator componentData={componentData} className="term-link" />
	);
};

export default TermLink;
