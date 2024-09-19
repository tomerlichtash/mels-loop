import React from 'react';
import { useComponentAttrs } from '../useComponentAttrs/useComponentAttrs';
import { Blockquote } from '@melsloop/ml-components';
import type { ContentComponentProps } from '../types';
import { renderNodes } from '../helpers/renderNodes';

export const BlockquoteContentBlock = ({
	componentData
}: ContentComponentProps): JSX.Element => {
	const { node } = componentData;
	const { attributes } = useComponentAttrs(node);
	const { key, children } = node;
	return (
		<Blockquote
			key={key}
			{...attributes}
		>
			{renderNodes(children)}
		</Blockquote>
	);
};
