import React from 'react';
import { CodeInline } from '@melsloop/ml-components';
import type { ContentComponentProps } from '../types';

export const CodeInlineContentBlock = ({
	componentData
}: ContentComponentProps): JSX.Element => {
	const { node } = componentData;
	return <CodeInline key={node.key}>{node.text}</CodeInline>;
};
