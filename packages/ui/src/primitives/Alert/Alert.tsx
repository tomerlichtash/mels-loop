import cn from 'classnames';
import type { HTMLAttributes, ReactNode } from 'react';

import styles from './Alert.module.css';

type AlertStatus = 'success' | 'error' | 'warning' | 'info';
type AlertRadius = 'none' | 'sm' | 'md' | 'lg' | 'pill';
type AlertAlign = 'start' | 'center' | 'end';

export interface AlertProps extends HTMLAttributes<HTMLDivElement> {
	children?: ReactNode;
	status?: AlertStatus;
	radius?: AlertRadius;
	align?: AlertAlign;
	title?: string;
}

export function Alert({
	children,
	status = 'info',
	radius = 'md',
	align,
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
				align && styles[`align-${align}`],
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
