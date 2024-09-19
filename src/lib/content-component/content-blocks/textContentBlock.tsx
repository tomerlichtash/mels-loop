import React from 'react';
import type { ContentComponentProps } from '../types';

export const TextContentBlock = ({ componentData }: ContentComponentProps): JSX.Element => {
	const { node } = componentData;
	const { text } = node;
	return <span>{text}</span>;
};

export default TextContentBlock;
