import React from 'react';
import { useComponentAttrs } from '../useComponentAttrs/useComponentAttrs';
import { Figure } from '@melsloop/ml-components';
import { renderNodes } from '../helpers/renderNodes';
import type { ContentComponentProps } from '../types';

export const FigureContentBlock = ({ componentData }: ContentComponentProps): JSX.Element => {
	const { node } = componentData;
	const { attributes } = useComponentAttrs(node);
	const { key, children, elementId } = node;
	return (
		<Figure
			key={key}
			figureId={elementId}
			{...attributes}
		>
			{renderNodes(children)}
		</Figure>
	);
};
