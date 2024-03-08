import React from 'react';
import { ContentComponentProps } from 'types/models';
import { List } from 'components/index';
import { renderNodes } from 'lib/dynamicContentHelpers';

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
