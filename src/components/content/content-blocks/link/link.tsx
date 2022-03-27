import React from "react";
import { ContentComponentProps } from "../../../../interfaces/models";
import { ContentIterator } from "../../content-iterator";

export interface ILinkProps extends ContentComponentProps {
	onClick?: (evt: React.MouseEvent) => boolean;
}

export const Link = (props: ILinkProps): JSX.Element => {
	const className = props.className;
	return (
		<a
			className={className}
			href={props.componentData.node.target}
			target="_blank"
			rel="noreferrer"
			onClick={props.onClick}
		>
			<ContentIterator componentData={props.componentData} className={className} />
		</a>
	);
};

export default Link;
