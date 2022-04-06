import React from "react";
import { ContentComponentProps } from "../../../../interfaces/models";
import { ContentIterator } from "../../content-iterator";

export interface ILinkProps extends ContentComponentProps {
	onClick?: (evt: React.MouseEvent) => boolean;
}

export const Link = (props: ILinkProps): JSX.Element => {
	const className = props.className;
	const { componentData, onClick } = props;
	const { node } = componentData;
	return (
		<a
			className={className}
			href={node.target}
			target="_blank"
			rel="noreferrer"
			onClick={onClick}
		>
			<ContentIterator componentData={componentData} className={className} />
		</a>
	);
};

export default Link;
