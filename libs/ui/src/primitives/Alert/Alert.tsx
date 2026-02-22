import cn from 'classnames';
import type { HTMLAttributes, ReactNode } from 'react';

import styles from './Alert.module.css';

interface AlertProps extends HTMLAttributes<HTMLDivElement> {
	children?: ReactNode;
	color?: 'green' | 'red';
	title?: string;
}

export function Alert({
	children,
	color = 'green',
	title,
	className,
	...props
}: AlertProps) {
	return (
		<div
			role="alert"
			className={cn(styles.root, styles[`color-${color}`], className)}
			{...props}
		>
			{title && <div className={styles.title}>{title}</div>}
			{children && <div className={styles.body}>{children}</div>}
		</div>
	);
}
