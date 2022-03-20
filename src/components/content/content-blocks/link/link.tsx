import React from "react";
import { ContentComponentProps } from "../../../../interfaces/models";
import { ContentIterator } from "../../content-iterator";
import { classes } from "./link.st.css";

export interface ILinkProps extends ContentComponentProps {
	onClick?: (evt: React.MouseEvent) => boolean;
}

export const Link = (props: ILinkProps): JSX.Element => {
	const p = props.componentData.node;
	return (
		<a
			className={classes.root}
			href={p.target}
			target="_blank"
			rel="noreferrer"
			onClick={props.onClick}
		>
			<ContentIterator componentData={props.componentData} />
		</a>
	);
};

export default Link;
