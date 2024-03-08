import React from 'react';
import { ContentComponentProps } from 'types/models';
import { ContentIterator } from '../contentIterator';
import { Heading } from 'components/index';

export const HeadingContentBlock = ({ componentData }: ContentComponentProps): JSX.Element => {
	const { node } = componentData;
	return (
		<Heading
			level={node.level || 1}
			key={node.key}
		>
			<ContentIterator componentData={componentData} />
		</Heading>
	);
};
