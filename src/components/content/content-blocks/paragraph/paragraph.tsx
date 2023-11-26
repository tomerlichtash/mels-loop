import React from "react";
import { ContentComponent } from "../../index";
import {
	IMLParsedNode,
	ContentComponentProps,
} from "../../../../interfaces/models";

import styles from "./paragraph.module.scss";
import classNames from "classnames";

export const Paragraph = ({
	componentData,
	className,
}: ContentComponentProps): JSX.Element => {
	const { node } = componentData;
	const { key, children } = node;
	const elements: IMLParsedNode[] = Array.isArray(children) ? children : [];
	return (
		<p className={classNames(styles.root, className)} key={key}>
			{elements.map((node) => {
				return <ContentComponent key={node.key} componentData={{ node }} />;
			})}
		</p>
	);
};

export default Paragraph;
