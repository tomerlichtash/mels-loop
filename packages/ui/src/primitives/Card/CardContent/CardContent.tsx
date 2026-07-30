import cn from 'classnames';
import type { HTMLAttributes, ReactNode } from 'react';

import styles from './CardContent.module.css';

export interface CardContentProps extends HTMLAttributes<HTMLDivElement> {
	children: ReactNode;
}

export function CardContent({
	children,
	className,
	...props
}: CardContentProps) {
	return (
		<div className={cn(styles.root, 'ml-card-content', className)} {...props}>
			{children}
		</div>
	);
}
