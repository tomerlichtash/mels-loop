import React from 'react';
import { useComponentAttrs } from './useComponentAttrs/useComponentAttrs';
import { renderNodes } from './helpers/renderNodes';
import { unique } from './helpers/unique';
import type { IParsedNode } from 'lib/types/models';
import type { ContentComponentProps } from './types';

/**
 * Displays the content of a Content Node, optionally wrapping
 * them with a provided tag. Handles the case of a node with text
 * content.
 * @returns
 */
export const ContentIterator = ({
	componentData,
	className
}: ContentComponentProps): JSX.Element => {
	const { node } = componentData;
	const { attributes } = useComponentAttrs(node);

	const text = node?.text;

	// if (!text) {
	// 	console.warn('Content Iterator: node text is empty');
	// }

	if (!node) {
		console.warn('Content Iterator: no input node');
		return <div className="no-data"></div>;
	}

	const elements: IParsedNode[] = Array.isArray(node?.children) && node.children;
	const Tag = componentData.tag as keyof JSX.IntrinsicElements;

	if (!elements?.length) {
		if (Tag) {
			return (
				<Tag
					className={className}
					key={unique.id()}
					{...attributes}
				>
					{node.text || ''}
				</Tag>
			);
		}

		return (
			<span
				className={className}
				key={unique.id()}
			>
				{text || ''}
			</span>
		);
	}

	if (Tag) {
		return (
			<Tag
				key={unique.id()}
				{...attributes}
			>
				{renderNodes(elements)}
			</Tag>
		);
	}

	return <>{renderNodes(elements)}</>;
};

export default ContentIterator;
