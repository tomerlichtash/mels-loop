import React from 'react';
import { ContentIterator } from '../ContentIterator';
import { Term, Link } from '@melsloop/ml-components';
import type { ContentComponentProps } from '../types';

export const TermLinkContentBlock = ({
	componentData
}: ContentComponentProps): JSX.Element => {
	return (
		<Term>
			<ContentIterator componentData={componentData} />
		</Term>
	);
};
