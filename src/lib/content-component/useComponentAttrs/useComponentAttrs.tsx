import { useEffect, useState } from 'react';
import { htmlValidator } from './htmlValidator/htmlValidator';
import type { IParsedNode } from 'lib/types/models';
import type { IComponentAttributeData, NodeAttributeMap } from './types';

/**
 * Returns an object with the sanitized attribute map of the node
 * Guaranteed not null
 * @param node
 * @returns
 */
export const useComponentAttrs = (node: IParsedNode): IComponentAttributeData => {
	const [attributes, setAttributes] = useState<NodeAttributeMap>({});

	// If the node changed, reparse the attributes
	// useEffect(() => setAttributes(mlNextBrowserUtils.extractNodeAttributes(node)), [node]);
	useEffect(
		() => setAttributes(htmlValidator.filterAttributesFor(node?.type, node?.attributes)),
		[node]
	);

	return {
		attributes
	};
};
