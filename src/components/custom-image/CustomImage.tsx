import React from 'react';
import styles from './CustomImage.module.scss';
import type { CustomImageProps } from './types';

export const CustomImage = ({ src }: CustomImageProps): JSX.Element => (
	<img className={styles.root} src={src} />
);

export default CustomImage;
