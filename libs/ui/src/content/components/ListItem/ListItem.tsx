import type { ReactNode } from 'react';
import cn from 'classnames';
import styles from './ListItem.module.css';

interface ListItemProps {
	children?: ReactNode;
	className?: string;
	[key: string]: unknown;
}

export default function ListItem({
	children,
	className,
	...props
}: ListItemProps) {
	return (
		<li className={cn(styles.root, className)} {...props}>
			{children}
		</li>
	);
}
