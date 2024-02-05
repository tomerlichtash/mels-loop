import React from 'react';
import styles from './Strip.module.scss';
import classNames from 'classnames';
import type { StripProps } from './types';

const Strip = ({ className }: StripProps) => (
	<div className={classNames(styles.root, className)}></div>
);

export default Strip;
