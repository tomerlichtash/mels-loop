import cn from 'classnames';
import type { HTMLAttributes, ReactNode } from 'react';

import styles from './Card.module.css';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
	children: ReactNode;
	withBorder?: boolean;
	padding?: 'sm' | 'md' | 'lg';
}

export function Card({
	children,
	withBorder,
	padding = 'md',
	className,
	...props
}: CardProps) {
	return (
		<div
			className={cn(
				styles.root,
				styles[`padding-${padding}`],
				withBorder && styles.withBorder,
				className,
			)}
			{...props}
		>
			{children}
		</div>
	);
}
