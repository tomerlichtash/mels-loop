import { useEffect, useState } from 'react';
import { IMLParsedNode, NodeAttributeMap } from 'types/models';
import { mlNextBrowserUtils } from '../nextBrowserUtils';

export interface IComponentAttributeData {
	attributes: NodeAttributeMap;
}
/**
 * Returns an object with the sanitized attribute map of the node
 * Guaranteed not null
 * @param node
 * @returns
 */
export const useComponentAttrs = (
	node: IMLParsedNode
): IComponentAttributeData => {
	const [attributes, setAttributes] = useState<NodeAttributeMap>({});

	// If the node changed, reparse the attributes
	useEffect(
		() => setAttributes(mlNextBrowserUtils.extractNodeAttributes(node)),
		[node]
	);

	return {
		attributes,
	};
};
