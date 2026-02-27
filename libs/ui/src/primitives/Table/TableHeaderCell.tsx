import cn from 'classnames';
import type { ReactNode, ThHTMLAttributes } from 'react';

import styles from './Table.module.css';

interface TableHeaderCellProps extends ThHTMLAttributes<HTMLTableCellElement> {
	children?: ReactNode;
}

export function TableHeaderCell({
	children,
	className,
	...props
}: TableHeaderCellProps) {
	return (
		<th
			className={cn(styles.headerCell, 'ml-table-header-cell', className)}
			{...props}
		>
			{children}
		</th>
	);
}
