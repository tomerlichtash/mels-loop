import React from 'react';
import { ContentComponent } from '../index';
import { IMLParsedNode, ContentComponentProps } from 'types/models';
import { useComponentAttrs } from '../useComponentAttrs';
import { Blockquote } from 'components';

export const BlockquoteContentBlock = ({
	componentData,
}: ContentComponentProps): JSX.Element => {
	const { node } = componentData;
	const { attributes } = useComponentAttrs(node);

	const elements: IMLParsedNode[] = Array.isArray(node.children)
		? node.children
		: [];

	return (
		<Blockquote key={node.key} {...attributes}>
			<p>
				{elements.map((node) => (
					<ContentComponent key={node.key} componentData={{ node }} />
				))}
			</p>
		</Blockquote>
	);
};
