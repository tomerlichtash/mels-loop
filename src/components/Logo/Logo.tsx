import React from 'react';
import classNames from 'classnames';
import styles from './Logo.module.css';

const Logo = ({ className }: { className?: string }) => (
	<div className={classNames(styles.root, className)}></div>
);

export default Logo;
