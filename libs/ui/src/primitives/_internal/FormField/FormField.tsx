import cn from 'classnames';
import type { HTMLAttributes, ReactNode } from 'react';

import styles from './FormField.module.css';

interface FormFieldProps extends HTMLAttributes<HTMLDivElement> {
	children: ReactNode;
	error?: string;
}

export function FormField({
	children,
	error,
	className,
	...props
}: FormFieldProps) {
	return (
		<div className={cn(styles.root, 'ml-form-field', className)} {...props}>
			{children}
			{error && <span className={styles.error}>{error}</span>}
		</div>
	);
}
