import React from 'react';
import { ContentComponentProps } from 'types/models';

export const TextContentBlock = ({
	componentData,
}: ContentComponentProps): JSX.Element => {
	const { node } = componentData;
	const { text } = node;
	return <span>{text}</span>;
};

export default TextContentBlock;
