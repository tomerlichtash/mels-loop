import React from 'react';
import { ContentIterator } from '../ContentIterator';
import { Text } from '@melsloop/ml-components';
import type { ContentComponentProps } from '../types';

export const ListItemContentBlock = ({
	componentData
}: ContentComponentProps): JSX.Element => {
	return (
		<li>
			<Text variant="body1">
				<ContentIterator componentData={componentData} />
			</Text>
		</li>
	);
};

export default ListItemContentBlock;
