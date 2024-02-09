import React from 'react';
import { ContentIterator } from '../contentIterator';
import type { ContentComponentProps } from 'types/models';
import { Term } from 'components';

export const TermLinkContentBlock = ({
	componentData,
}: ContentComponentProps): JSX.Element => {
	return (
		<Term>
			<ContentIterator componentData={componentData} />
		</Term>
	);
};
