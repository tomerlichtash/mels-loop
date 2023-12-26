import React from "react";
import { ContentComponent } from "../../index";
import {
	IMLParsedNode,
	ContentComponentProps,
} from "../../../../interfaces/models";
import { mlUtils } from "../../../../lib/ml-utils";
import { useComponentAttributes } from "../../useComponentAttributes";
import styles from "./table.module.scss";

export const Table = ({
	componentData,
}: ContentComponentProps): JSX.Element => {
	const { node } = componentData;
	const { attributes } = useComponentAttributes(node);
	const elements: IMLParsedNode[] = Array.isArray(node.children)
		? node.children
		: [];
	return (
		<table className={styles.root} key={node.key} {...attributes}>
			<tbody key={mlUtils.uniqueId()}>
				{elements.map((node) => {
					return <ContentComponent key={node.key} componentData={{ node }} />;
				})}
			</tbody>
		</table>
	);
};

export default Table;
