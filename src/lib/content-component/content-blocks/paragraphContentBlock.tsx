import React from 'react';
import { Paragraph } from '@melsloop/ml-components';
import { renderNodes } from '../helpers/renderNodes';
import type { ContentComponentProps } from '../types';

export const ParagraphContentBlock = ({
	componentData
}: ContentComponentProps): JSX.Element => {
	const { node } = componentData;
	const { key, children } = node;
	return <Paragraph key={key}>{renderNodes(children)}</Paragraph>;
};

export default ParagraphContentBlock;
