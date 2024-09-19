import React from 'react';
import { CodeBlock } from '@melsloop/ml-components';
import type { ContentComponentProps } from '../types';

export const CodeBlockContentBlock = ({
	componentData
}: ContentComponentProps): JSX.Element => {
	const { node } = componentData;
	return <CodeBlock key={node.key}>{node.text}</CodeBlock>;
};
