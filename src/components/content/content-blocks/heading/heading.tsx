import React from "react";
import { ContentComponentProps } from "../../../../interfaces/models";
import { ContentIterator } from "../../content-iterator";
import { classes } from "./heading.st.css";

export const Heading = (props: ContentComponentProps): JSX.Element => {
	const data = props.componentData;
	const p = data.node;
	const level = p.level || 1;

	const Title = `h${level}` as keyof JSX.IntrinsicElements;

	return (
		<Title className={classes.root} key={p.key}>
			<ContentIterator componentData={data} />
		</Title>
	);
};

export default Heading;
