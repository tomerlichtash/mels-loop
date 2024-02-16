import React from 'react';
import styles from './Logo.module.scss';
import classNames from 'classnames';
import CssVarImage from '../css-var-image/CssVarImage';

type LogoProps = {
	className?: string;
};

const Logo = ({ className }: LogoProps) => (
	<CssVarImage
		varName="logo-url"
		className={classNames(styles.root, className)}
	/>
);

export default Logo;
export type { LogoProps };
