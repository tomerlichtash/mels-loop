import React from 'react';
import CodeBlock from 'components/code-block/CodeBlock';
import { ContentComponentProps } from 'types/models';

export const CodeBlockContentBlock = ({
	componentData,
}: ContentComponentProps): JSX.Element => {
	const { node } = componentData;
	return <CodeBlock key={node.key}>{node.text}</CodeBlock>;
};
