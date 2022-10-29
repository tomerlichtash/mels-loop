import { useEffect, useState } from "react";
import { IMLParsedNode, NodeAttributeMap } from "../interfaces/models";
import { mlNextBrowserUtils } from "../lib/next-browser-utils";

export interface IComponentAttributeData {
	attributes: NodeAttributeMap;
}
/**
 * Returns an object with the sanitized attribute map of the node
 *
 * Guaranteed not null
 * @param node
 * @returns
 */
export const useComponentAttributes = (
	node: IMLParsedNode
): IComponentAttributeData => {
	const [attributes, setAttributes] = useState<NodeAttributeMap>({});

	// If the changed, reparse the attributes
	useEffect(() => {
		setAttributes(mlNextBrowserUtils.extractNodeAttributes(node));
	}, [node]);
	return {
		attributes,
	};
};
