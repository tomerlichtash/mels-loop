import cn from 'classnames';
import type { HTMLAttributes, ReactNode } from 'react';

import styles from './Table.module.css';

interface TableRowProps extends HTMLAttributes<HTMLTableRowElement> {
	children?: ReactNode;
}

export function TableRow({ children, className, ...props }: TableRowProps) {
	return (
		<tr className={cn(styles.row, 'ml-table-row', className)} {...props}>
			{children}
		</tr>
	);
}
