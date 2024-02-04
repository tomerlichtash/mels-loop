import React from 'react';
import styles from './Blockquote.module.scss';
import classNames from 'classnames';

export const Blockquote = ({ children, ...rest }): JSX.Element => (
	<blockquote className={classNames(styles.root)} {...rest}>
		{children}
	</blockquote>
);

export default Blockquote;
