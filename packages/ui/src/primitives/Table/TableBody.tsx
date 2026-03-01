import cn from 'classnames';
import type { HTMLAttributes, ReactNode } from 'react';

import styles from './Table.module.css';

export interface TableBodyProps extends HTMLAttributes<HTMLTableSectionElement> {
	children?: ReactNode;
}

export function TableBody({ children, className, ...props }: TableBodyProps) {
	return (
		<tbody className={cn(styles.body, 'ml-table-body', className)} {...props}>
			{children}
		</tbody>
	);
}
