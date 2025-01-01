import React from 'react';
import styles from './CssVarImage.module.scss';
import classNames from 'classnames';
import { getCustomStyle } from './helpers';

type CssVarImageProps = {
	varName: string;
	size?: string;
	className?: string;
};

const CssVarImage = ({ varName, size, className }: CssVarImageProps) => (
	<>
		<style>{getCustomStyle(styles, varName, size)};</style>
		<span className={classNames(styles.root, className)}></span>
	</>
);

export default CssVarImage;
export type { CssVarImageProps };
