import React from 'react';
import styles from './CssVarImage.module.scss';
import classNames from 'classnames';
import { getCustomStyle } from './helpers';
import type { CssVarImageProps } from './types';

const CssVarImage = ({ varName, className }: CssVarImageProps) => (
	<>
		<style>{getCustomStyle(styles, varName)}</style>
		<span className={classNames(styles.root, className)}></span>
	</>
);

export default CssVarImage;
