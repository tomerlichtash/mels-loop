import React from "react";
import { ContentComponentProps } from "../../../../interfaces/models";
import { ContentIterator } from "../../content-iterator";
import { style, classes } from "./heading.st.css";

export const Heading = ({
	componentData,
	className,
}: ContentComponentProps): JSX.Element => {
	const p = componentData.node;
	const level = p.level || 1;

	const Title = `h${level}` as keyof JSX.IntrinsicElements;

	return (
		<Title className={style(classes.root, className)} key={p.key}>
			<ContentIterator componentData={componentData} />
		</Title>
	);
};

export default Heading;
