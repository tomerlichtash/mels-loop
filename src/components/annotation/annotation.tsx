import React from 'react';
import styles from './Annotation.module.scss';

export const Annotation = ({ index }): JSX.Element => (
	<span className={styles.root}>
		<span
			className={styles.content}
			data-prefix={index <= 9 ? '0' : ''}
			data-seq={index}
		></span>
	</span>
);

export default Annotation;
