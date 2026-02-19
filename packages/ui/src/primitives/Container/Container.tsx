import type { ReactNode, HTMLAttributes } from 'react';
import styles from './Container.module.css';

interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
	children: ReactNode;
	size?: 'sm' | 'md' | 'lg';
}

export function Container({
	children,
	size = 'md',
	className,
	...props
}: ContainerProps) {
	return (
		<div
			className={`${styles.container} ${styles[size]}${className ? ` ${className}` : ''}`}
			{...props}
		>
			{children}
		</div>
	);
}
