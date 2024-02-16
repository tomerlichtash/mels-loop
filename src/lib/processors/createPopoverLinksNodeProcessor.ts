import { contentUtils } from '../contentUtils';
import { DynamicContentTypes } from 'types/content';
import { MLNODE_TYPES, NODE_DISPLAY_TYPES } from 'types/nodes';
import type { IMLParsedNode } from 'types/models';
import type { MLNodeProcessorFunction } from 'types/parser';

/**
 * Marks links as popovers for the links that match the provided dynamic content types.
 * If not types are provided, glossary and annotations are assumed
 * @param types
 */
export const createPopoverLinksNodeProcessor = (
	...types: DynamicContentTypes[]
): MLNodeProcessorFunction => {
	if (!types?.length) {
		types = [DynamicContentTypes.Annotation, DynamicContentTypes.Glossary];
	}

	const linkProcessor: MLNodeProcessorFunction = (node, context) => {
		const linkData = contentUtils.urlToContentData(node.target);

		if (!types.includes(linkData.type)) {
			return node;
		}

		const nodeData: Partial<IMLParsedNode> = {
			displayType: NODE_DISPLAY_TYPES.POPOVER,
			linkType: linkData.type,
			occurrenceIndex: context.getEnumerator(`${node.line}_${node.target}`) + 1,
			sequence: context.getEnumerator(linkData.type) + 1,
		};

		return { ...node, ...nodeData };
	};

	return contentUtils.createNodeMappingFilter(linkProcessor, MLNODE_TYPES.LINK);
};
