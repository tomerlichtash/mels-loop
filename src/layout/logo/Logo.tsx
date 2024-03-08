import React from 'react';
import styles from './Logo.module.scss';
import classNames from 'classnames';

type LogoProps = {
	mode: string;
	className?: string;
};

const Logo = ({ mode, className }: LogoProps) => {
	return (
		<div
			data-mode={mode}
			className={classNames(styles.root, className)}
		/>
	);
};

export default Logo;
export type { LogoProps };
