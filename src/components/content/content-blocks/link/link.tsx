import React from "react";
import { ContentComponentProps } from "../../../../interfaces/models";
import { ContentIterator } from "../../content-iterator";

export interface ILinkProps extends ContentComponentProps {
	onClick?: (evt: React.MouseEvent) => boolean;
}

export const Link = (props: ILinkProps): JSX.Element => {
	const p = props.componentData.node;
	return (
		<a
			className={className}
			href={node.target}
			target="_blank"
			rel="noreferrer"
			onClick={props.onClick}
		>
			<ContentIterator componentData={componentData} className={className} />
		</a>
	);
};

export default Link;
