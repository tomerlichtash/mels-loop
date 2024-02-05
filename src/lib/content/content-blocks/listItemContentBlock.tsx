import React from 'react';
import { ContentComponentProps } from 'types/models';
import { ContentIterator } from '../contentIterator';
import { ListItem } from 'components';

export const ListItemContentBlock = ({
	componentData,
}: ContentComponentProps): JSX.Element => {
	return (
		<ListItem>
			<ContentIterator componentData={componentData} />
		</ListItem>
	);
};

export default ListItemContentBlock;
