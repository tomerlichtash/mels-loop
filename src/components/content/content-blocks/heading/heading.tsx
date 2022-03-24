import React from "react";
import { ContentComponentProps } from "../../../../interfaces/models";
import { ContentIterator } from "../../content-iterator";

export const Heading = ({
	componentData,
	className,
}: ContentComponentProps): JSX.Element => {
	const { node } = componentData;
	const level = node.level || 1;

	const Title = `h${level}` as keyof JSX.IntrinsicElements;

	return (
		<Title className={className} key={node.key}>
			<ContentIterator componentData={componentData} className={className} />
		</Title>
	);
};

export default Heading;
