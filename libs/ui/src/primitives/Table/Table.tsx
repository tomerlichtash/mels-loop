import cn from 'classnames';
import type { HTMLAttributes, ReactNode } from 'react';

import styles from './Table.module.css';

interface TableProps extends HTMLAttributes<HTMLTableElement> {
	children?: ReactNode;
}

export function Table({ children, className, ...props }: TableProps) {
	return (
		<div className={styles.wrapper}>
			<table className={cn(styles.root, 'ml-table', className)} {...props}>
				{children}
			</table>
		</div>
	);
}
