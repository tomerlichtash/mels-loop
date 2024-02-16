import React from 'react';
import { ContentComponent } from '../contentComponent';
import { IMLParsedNode, ContentComponentProps } from 'types/models';
import { Paragraph } from 'components/index';

export const ParagraphContentBlock = ({
	componentData,
}: ContentComponentProps): JSX.Element => {
	const { node } = componentData;
	const { key, children } = node;
	const elements: IMLParsedNode[] = Array.isArray(children) ? children : [];
	return (
		<>
			<Paragraph key={key}>
				{elements.map((node) => (
					<ContentComponent key={node.key} componentData={{ node }} />
				))}
			</Paragraph>
		</>
	);
};

export default ParagraphContentBlock;
