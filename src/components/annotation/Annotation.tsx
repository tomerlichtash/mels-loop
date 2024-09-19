import React from 'react';
import classNames from 'classnames';
import styles from './Annotation.module.css';

const Annotation = ({ className }: { className?: string }) => (
	<div className={classNames(styles.root, className)}></div>
);

export default Annotation;
