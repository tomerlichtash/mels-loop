import React from 'react';
import { ContentComponentProps } from 'types/models';
import { Paragraph } from 'components/index';
import { renderNodes } from 'lib/dynamicContentHelpers';

export const ParagraphContentBlock = ({
	componentData,
}: ContentComponentProps): JSX.Element => {
	const { node } = componentData;
	const { key, children } = node;
	return <Paragraph key={key}>{renderNodes(children)}</Paragraph>;
};

export default ParagraphContentBlock;
