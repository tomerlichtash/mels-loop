import React from "react";
import { ContentComponentProps } from "../../../../interfaces/models";
import { ContentIterator } from "../../content-iterator";
// import { classes } from "./link.st.css";

export const Link = ({
	componentData,
	className,
}: ContentComponentProps): JSX.Element => {
	const { node } = componentData;
	return (
		<a
			className={className}
			href={node.target}
			target="_blank"
			rel="noreferrer"
		>
			<ContentIterator componentData={componentData} className={className} />
		</a>
	);
};

export default Link;
