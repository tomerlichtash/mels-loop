import type { ReactNode, HTMLAttributes } from 'react';
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
	const classes = [
		styles.card,
		styles[`padding-${padding}`],
		withBorder ? styles.withBorder : '',
		className ?? '',
	]
		.filter(Boolean)
		.join(' ');

	return (
		<div className={classes} {...props}>
			{children}
		</div>
	);
}
