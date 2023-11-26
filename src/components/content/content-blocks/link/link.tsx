import React from "react";
import { ContentComponentProps } from "../../../../interfaces/models";
import ContentIterator from "../../content-iterator";
import styles from "./link.module.scss";
import classNames from "classnames";

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
		<a
			className={styles.root}
			href={node.target}
			onClick={onClick}
			{...targetAttrs}
		>
			<ContentIterator componentData={componentData} className={styles.root} />
		</a>
	);
};

export default Link;
