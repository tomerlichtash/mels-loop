import type { HTMLAttributes } from 'react';
import cn from 'classnames';
import styles from './Loader.module.css';

interface LoaderProps extends HTMLAttributes<HTMLSpanElement> {
	size?: 'sm' | 'md' | 'lg';
	label?: string;
}

export function Loader({
	size = 'md',
	className,
	label = 'Loading…',
	...props
}: LoaderProps) {
	return (
		<span
			role="status"
			aria-label={label}
			className={cn(styles.root, styles[`size-${size}`], className)}
			{...props}
		/>
	);
}
