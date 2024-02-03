import React from 'react';
import { ContentIterator } from '../contentIterator';
import type { ContentComponentProps } from '../../../types/models';
import TermLink from '@components/term';

export const TermLinkContentBlock = ({
	componentData,
}: ContentComponentProps): JSX.Element => {
	return (
		<TermLink>
			<ContentIterator componentData={componentData} />
		</TermLink>
	);
};
