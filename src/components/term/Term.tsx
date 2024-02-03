import React from 'react';
import styles from './Term.module.scss';

export const TermLink = ({ children }): JSX.Element => (
	<span className={styles.root}>
		<span className={styles.popoverTrigger}>{children}</span>
	</span>
);

export default TermLink;
