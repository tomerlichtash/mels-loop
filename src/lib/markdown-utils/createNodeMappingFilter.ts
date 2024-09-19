import { MLNODE_TYPES } from 'lib/types/nodes';
import type { IParsedNode } from 'lib/types/models';
import type { INodeProcessorContext, NodeProcessorFn } from './types';

export const stringArrayToMap = (array: Array<string>): { [key: string]: 1 } => {
	return array.reduce((acc, str) => {
		acc[str] = 1;
		return acc;
	}, {});
};

export const createNodeMappingFilter = (
	filter: NodeProcessorFn,
	...types: Array<MLNODE_TYPES>
): NodeProcessorFn => {
	if (!types?.length) {
		return (n) => n;
	}

	const typeMap = stringArrayToMap(types);

	return (node: IParsedNode, context: INodeProcessorContext) => {
		if (!node || !(node.type in typeMap)) {
			return null;
		}

		return filter(node, context);
	};
};
