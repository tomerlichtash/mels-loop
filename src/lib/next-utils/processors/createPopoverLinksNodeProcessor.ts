import { createNodeMappingFilter } from '../../markdown-utils/createNodeMappingFilter';
import { urlToContentData } from 'lib/urlToContentData';
import { DynamicContentTypes } from 'context/types';
import { MLNODE_TYPES, NODE_DISPLAY_TYPES } from 'lib/types/nodes';
import type { IParsedNode } from 'lib/types/models';
import type { NodeProcessorFn } from '../../markdown-utils/types';

/**
 * Marks links as popovers for the links that match the provided dynamic content types.
 * If not types are provided, glossary and annotations are assumed
 * @param types
 */
export const createPopoverLinksNodeProcessor = (
	...types: DynamicContentTypes[]
): NodeProcessorFn => {
	if (!types?.length) {
		types = [DynamicContentTypes.Annotation, DynamicContentTypes.Glossary];
	}

	const linkProcessor: NodeProcessorFn = (node, context) => {
		const linkData = urlToContentData(node.target);

		if (!types.includes(linkData.type)) {
			return node;
		}

		const nodeData: Partial<IParsedNode> = {
			displayType: NODE_DISPLAY_TYPES.POPOVER,
			linkType: linkData.type,
			occurrenceIndex: context.getEnumerator(`${node.line}_${node.target}`) + 1,
			sequence: context.getEnumerator(linkData.type) + 1
		};

		return { ...node, ...nodeData };
	};

	return createNodeMappingFilter(linkProcessor, MLNODE_TYPES.LINK);
};
