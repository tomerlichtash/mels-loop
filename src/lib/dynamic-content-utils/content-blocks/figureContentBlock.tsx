import React from 'react';
import { ContentComponent } from '../index';
import { IMLParsedNode, ContentComponentProps } from 'types/models';
import { useComponentAttrs } from '../../../hooks/useComponentAttrs';
import { Figure } from 'components/index';

export const FigureContentBlock = ({
	componentData,
}: ContentComponentProps): JSX.Element => {
	const { node } = componentData;
	const { attributes } = useComponentAttrs(node);

	const elements: IMLParsedNode[] = Array.isArray(node.children)
		? node.children
		: [];
	return (
		<Figure elementId={node.elementId} {...attributes}>
			{elements.map((node) => {
				return <ContentComponent key={node.key} componentData={{ node }} />;
			})}
		</Figure>
	);
};
