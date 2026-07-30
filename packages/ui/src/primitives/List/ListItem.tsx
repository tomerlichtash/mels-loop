import cn from 'classnames';
import type { HTMLAttributes, ReactNode } from 'react';

import styles from './ListItem.module.css';

export interface ListItemProps extends HTMLAttributes<HTMLLIElement> {
	children?: ReactNode;
}

export function ListItem({ children, className, ...props }: ListItemProps) {
	return (
		<li className={cn(styles.root, 'ml-list-item', className)} {...props}>
			{children}
		</li>
	);
}
