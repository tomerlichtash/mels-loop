import cn from 'classnames';
import type { ReactNode, TdHTMLAttributes } from 'react';

import styles from './Table.module.css';

interface TableCellProps extends TdHTMLAttributes<HTMLTableCellElement> {
	children?: ReactNode;
}

export function TableCell({ children, className, ...props }: TableCellProps) {
	return (
		<td className={cn(styles.cell, 'ml-table-cell', className)} {...props}>
			{children}
		</td>
	);
}
