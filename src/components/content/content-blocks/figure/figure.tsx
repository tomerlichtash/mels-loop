import React from "react";
import { ContentComponent } from "../../index";
import {
	IMLParsedNode,
	ContentComponentProps,
} from "../../../../interfaces/models";
import { mlUtils } from "../../../../lib/ml-utils";
import { useComponentAttributes } from "../../useComponentAttributes";

export const Figure = ({
	componentData,
	className,
}: ContentComponentProps): JSX.Element => {
	const { node } = componentData;
	const { attributes } = useComponentAttributes(node);
	const elements: IMLParsedNode[] = Array.isArray(node.children)
		? node.children
		: [];
	return (
		<figure className="figure" key={node.key} {...attributes}>
			{node.elementId && <a id={node.elementId}></a>}
			<div className="figure-content" key={mlUtils.uniqueId()}>
				{elements.map((node) => {
					return <ContentComponent key={node.key} componentData={{ node }} />;
				})}
			</div>
		</figure>
	);
};

export default Figure;
