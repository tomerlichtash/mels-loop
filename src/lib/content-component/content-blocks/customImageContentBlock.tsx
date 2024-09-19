import React from 'react';
import type { ContentComponentProps } from '../types';
// import { CustomImage } from 'components/index';

export const CustomImageContentBlock = ({
	componentData
}: ContentComponentProps): JSX.Element => <img src={componentData.node.target} />;

export default CustomImageContentBlock;
