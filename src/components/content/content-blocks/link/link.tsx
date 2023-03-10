import React from "react";
import { ContentComponentProps } from "../../../../interfaces/models";
import ContentIterator from "../../content-iterator";

export interface ILinkProps extends ContentComponentProps {
	onClick?: (evt: React.MouseEvent) => boolean;
}

export const Link = ({
	componentData,
	onClick,
	className,
}: ILinkProps): JSX.Element => {
	const { node } = componentData;
	const isHash = node.target && node.target[0] === "#";
	const targetAttrs = isHash
		? {}
		: {
				target: "_blank",
				rel: "noreferrer",
		  };
	return (
		<a className="link" href={node.target} onClick={onClick} {...targetAttrs}>
			<ContentIterator componentData={componentData} className="href" />
		</a>
	);
};

export default Link;
