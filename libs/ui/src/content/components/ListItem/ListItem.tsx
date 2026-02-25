import cn from 'classnames';
import type { ReactNode } from 'react';

import styles from './ListItem.module.css';

interface ListItemProps {
	children?: ReactNode;
	className?: string;
	[key: string]: unknown;
}

export function ListItem({ children, className, ...props }: ListItemProps) {
	return (
		<li className={cn(styles.root, className)} {...props}>
			{children}
		</li>
	);
}
