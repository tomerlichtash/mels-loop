import cn from 'classnames';
import type { HTMLAttributes, ReactNode } from 'react';

import styles from './Alert.module.css';

type AlertStatus = 'success' | 'error' | 'warning' | 'info';
type AlertRadius = 'none' | 'sm' | 'md' | 'lg' | 'pill';

export interface AlertProps extends HTMLAttributes<HTMLDivElement> {
	children?: ReactNode;
	status?: AlertStatus;
	radius?: AlertRadius;
	title?: string;
}

export function Alert({
	children,
	status = 'info',
	radius = 'md',
	title,
	className,
	...props
}: AlertProps) {
	return (
		<div
			role="alert"
			className={cn(
				styles.root,
				styles[status],
				styles[`radius-${radius}`],
				'ml-alert',
				className,
			)}
			{...props}
		>
			{title && <div className={styles.title}>{title}</div>}
			{children && <div className={styles.body}>{children}</div>}
		</div>
	);
}
