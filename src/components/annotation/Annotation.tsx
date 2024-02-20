import React from 'react';
import styles from './Annotation.module.scss';
import { leadingZero } from './helpers';
import classNames from 'classnames';

type AnnotationProps = {
	index: number;
	className?: string;
};

const Annotation = ({ index, className }: AnnotationProps): JSX.Element => (
	<span className={classNames(styles.root, className)}>
		<span
			className={styles.content}
			data-prefix-content={leadingZero(index)}
			data-seq={index}
		></span>
	</span>
);

export default Annotation;
export type { AnnotationProps };
