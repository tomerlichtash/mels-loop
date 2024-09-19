import React from 'react';
import { Annotation } from '@melsloop/ml-components';
import type { ContentComponentProps } from '../types';

export const AnnotationContentBlock = ({
	componentData
}: ContentComponentProps): JSX.Element => <Annotation index={componentData.node.sequence} />;
