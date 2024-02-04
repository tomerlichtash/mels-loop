import React from 'react';
import styles from './Strip.module.scss';
import classNames from 'classnames';

type StripProps = {
	className?: string;
};

const Strip = ({ className }: StripProps) => (
	<div className={classNames(styles.root, className)}></div>
);

export default Strip;
