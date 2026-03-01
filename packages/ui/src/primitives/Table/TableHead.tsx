import cn from 'classnames';
import type { HTMLAttributes, ReactNode } from 'react';

import styles from './Table.module.css';

interface TableHeadProps extends HTMLAttributes<HTMLTableSectionElement> {
	children?: ReactNode;
}

export function TableHead({ children, className, ...props }: TableHeadProps) {
	return (
		<thead className={cn(styles.head, 'ml-table-head', className)} {...props}>
			{children}
		</thead>
	);
}
