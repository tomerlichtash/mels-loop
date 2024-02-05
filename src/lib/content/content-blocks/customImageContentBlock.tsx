import React from 'react';
import { ContentComponentProps } from 'types/models';
import { CustomImage } from 'components';

export const CustomImageContentBlock = ({
	componentData,
}: ContentComponentProps): JSX.Element => (
	<CustomImage src={componentData.node.target} />
);

export default CustomImageContentBlock;
