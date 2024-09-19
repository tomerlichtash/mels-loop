import React from 'react';
import { List } from '@melsloop/ml-components';
import { renderNodes } from '../helpers/renderNodes';
import type { ContentComponentProps } from '../types';

export const ListContentBlock = ({ componentData }: ContentComponentProps): JSX.Element => {
	const { node } = componentData;
	const { key, children, ordered } = node;
	return (
		<List
			key={key}
			ordered={ordered}
		>
			{renderNodes(children)}
		</List>
	);
};

export default ListContentBlock;
