import type { ReactNode } from 'react';

import styles from './Table.module.css';

interface TableProps {
	children?: ReactNode;
	[key: string]: unknown;
}

export default function Table({ children, ...props }: TableProps) {
	return (
		<div className={styles.root}>
			<table className={styles.table} {...props}>
				{children}
			</table>
		</div>
	);
}
