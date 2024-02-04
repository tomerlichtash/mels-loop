import React from 'react';
import { ContentComponentProps } from '../../../types/models';
import { Annotation } from '@components/annotation/Annotation';

export const AnnotationContentBlock = ({
	componentData,
}: ContentComponentProps): JSX.Element => (
	<Annotation index={componentData.node.sequence} />
);
