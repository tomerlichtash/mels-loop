import React from 'react';
import { ContentComponentProps } from 'types/models';
import { ContentIterator } from '../contentIterator';
import { ListItem, Text } from 'components/index';

export const ListItemContentBlock = ({ componentData }: ContentComponentProps): JSX.Element => {
	return (
		<ListItem>
			<Text variant="body1">
				<ContentIterator componentData={componentData} />
			</Text>
		</ListItem>
	);
};

export default ListItemContentBlock;
