import type { ReactNode, HTMLAttributes } from 'react';
import styles from './Badge.module.css';

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
	children: ReactNode;
	color?: 'pink' | 'blue';
}

export function Badge({
	children,
	color = 'pink',
	className,
	...props
}: BadgeProps) {
	return (
		<span
			className={`${styles.badge} ${styles[color]}${className ? ` ${className}` : ''}`}
			{...props}
		>
			{children}
		</span>
	);
}
