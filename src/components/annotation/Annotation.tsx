import React from 'react';
import styles from './Annotation.module.scss';
import { leadingZero } from '../helpers';
import type { AnnotationProps } from './types';

const Annotation = ({ index }: AnnotationProps): JSX.Element => (
	<span className={styles.root}>
		<span
			className={styles.content}
			data-prefix={leadingZero(index)}
			data-seq={index}
		></span>
	</span>
);

export default Annotation;
