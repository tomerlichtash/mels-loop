import React from "react";
import { ContentComponentProps } from "../../../../interfaces/models";
import ContentIterator from "../../content-iterator";
import { st, classes } from "./link.st.css";

export interface ILinkProps extends ContentComponentProps {
	onClick?: (evt: React.MouseEvent) => boolean;
}

export const Link = ({
	componentData,
	onClick,
	className,
}: ILinkProps): JSX.Element => {
	const { node } = componentData;
	const isHash = node.target && node.target[0] === '#';
	const targetAttrs = isHash ? {} : {
		target: "_blank",
		rel:"noreferrer"
	};
	return (
		<a
			className={st(classes.root, className)}
			href={node.target}
			onClick={onClick}
			{...targetAttrs}
		>
			<ContentIterator componentData={componentData} className={classes.href} />
		</a>
	);
};

export default Link;
