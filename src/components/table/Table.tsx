import React from 'react';
import styles from './Table.module.scss';

export const Table = ({ children, ...rest }) => (
	<table className={styles.root} {...rest}>
		<tbody>{children}</tbody>
	</table>
);

export default Table;