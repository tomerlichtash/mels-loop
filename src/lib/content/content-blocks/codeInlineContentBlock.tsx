import React from 'react';
import { ContentComponentProps } from 'types/models';
import { CodeInline } from 'components';

export const CodeInlineContentBlock = ({
	componentData,
}: ContentComponentProps): JSX.Element => (
	<CodeInline>{componentData.node.text}</CodeInline>
);
