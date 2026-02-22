import { Slot } from '@radix-ui/react-slot';
import cn from 'classnames';
import type { ButtonHTMLAttributes, ReactNode } from 'react';

import { Loader } from '../Loader/Loader';
import styles from './Button.module.css';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	children: ReactNode;
	variant?: 'primary' | 'subtle' | 'outline' | 'ghost';
	size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
	loading?: boolean;
	asChild?: boolean;
}

export function Button({
	children,
	variant = 'ghost',
	size = 'md',
	loading,
	asChild,
	className,
	disabled,
	...props
}: ButtonProps) {
	const classes = cn(
		styles.root,
		styles[`variant-${variant}`],
		styles[`size-${size}`],
		loading && styles.loading,
		className,
	);

	if (asChild) {
		return (
			<Slot className={classes} {...props}>
				{children}
			</Slot>
		);
	}

	return (
		<button className={classes} disabled={disabled || loading} {...props}>
			{loading && <Loader size="sm" aria-hidden />}
			<span className={loading ? styles.labelHidden : undefined}>
				{children}
			</span>
		</button>
	);
}
