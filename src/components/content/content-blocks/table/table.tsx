import React from "react";
import { ContentComponent } from "../../index";
import {
	IMLParsedNode,
	ContentComponentProps,
} from "../../../../interfaces/models";
import { st, classes } from "./table.st.css";
import { mlUtils } from "../../../../lib/ml-utils";
import { useComponentAttributes } from "../../../use-component-attributes";

export const Table = ({
	componentData,
	className
}: ContentComponentProps): JSX.Element => {
	const { node } = componentData;
	const { attributes } = useComponentAttributes(node);
	const elements: IMLParsedNode[] = Array.isArray(node.children)
		? node.children
		: [];
	return (
		<table className={st(classes.root, className)} key={node.key} {...attributes}>
			<tbody key={mlUtils.uniqueId()}>
				{elements.map((node) => {
					return <ContentComponent key={node.key} componentData={{ node }} />;
				})}
			</tbody>
		</table>
	);
};

export default Table;
