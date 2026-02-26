import { Slot } from '@radix-ui/react-slot';
import cn from 'classnames';
import type { ButtonHTMLAttributes, ReactNode } from 'react';

import { Loader } from '../Loader/Loader';
import styles from './Button.module.css';

type ButtonRadius = 'none' | 'sm' | 'md' | 'lg' | 'pill';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	children: ReactNode;
	variant?: 'contained' | 'outlined' | 'text';
	size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
	radius?: ButtonRadius;
	loading?: boolean;
	fullWidth?: boolean;
	asChild?: boolean;
}

export function Button({
	children,
	variant = 'contained',
	size = 'md',
	radius = 'md',
	loading,
	fullWidth,
	asChild,
	className,
	disabled,
	...props
}: ButtonProps) {
	const classes = cn(
		styles.root,
		styles[`variant-${variant}`],
		styles[`size-${size}`],
		styles[`radius-${radius}`],
		{ [styles.loading]: loading, [styles.fullWidth]: fullWidth },
		'ml-button',
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
