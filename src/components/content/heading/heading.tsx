import React from "react";
import { IContentComponentInitData } from "../../../interfaces/models";
import ContentIterator from "../contentIterator";
import { classes } from "./heading.st.css";

export const Heading = (props: {
	data: IContentComponentInitData;
}): JSX.Element => {
	const data = props.data,
		p = data.data,
		level = p.level || 1;

	const Title = `h${level}` as keyof JSX.IntrinsicElements;

	return (
		<Title className={classes.root} key={p.key}>
			{<ContentIterator data={data} />}
		</Title>
	);
};

export default Heading;
