import cn from 'classnames';
import type { HTMLAttributes, ReactNode } from 'react';

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
			className={cn(styles.root, styles[`color-${color}`], className)}
			{...props}
		>
			{children}
		</span>
	);
}
