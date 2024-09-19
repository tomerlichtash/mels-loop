import React from 'react';
import { ContentIterator } from '../ContentIterator';
import { Heading } from '@melsloop/ml-components';
import type { ContentComponentProps } from '../types';

export const HeadingContentBlock = ({ componentData }: ContentComponentProps): JSX.Element => {
	const { node } = componentData;
	return (
		<Heading
			level={Number(node.level) || 1}
			key={node.key}
		>
			<ContentIterator componentData={componentData} />
		</Heading>
	);
};
