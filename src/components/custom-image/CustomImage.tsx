import React from 'react';
import styles from './CustomImage.module.scss';

export const CustomImage = ({ src }): JSX.Element => (
	<img className={styles.root} src={src} />
);

export default CustomImage;
