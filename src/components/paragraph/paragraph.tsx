import React from 'react';
import styles from './Paragraph.module.scss';

export const Paragraph = ({ children, ...rest }): JSX.Element => (
	<p className={styles.root} {...rest}>
		{children}
	</p>
);

export default Paragraph;
