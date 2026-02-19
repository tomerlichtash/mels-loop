import type { ReactNode, ButtonHTMLAttributes, ElementType } from 'react';
import styles from './Button.module.css';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	children: ReactNode;
	variant?: 'default' | 'subtle' | 'outline';
	size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
	loading?: boolean;
	component?: ElementType;
	href?: string;
}

export function Button({
	children,
	variant = 'default',
	size = 'md',
	loading,
	component,
	className,
	disabled,
	...props
}: ButtonProps) {
	const Component = component || 'button';
	const classes = [
		styles.button,
		styles[variant],
		styles[`size-${size}`],
		loading ? styles.loading : '',
		className ?? '',
	]
		.filter(Boolean)
		.join(' ');

	return (
		<Component className={classes} disabled={disabled || loading} {...props}>
			{loading && <span className={styles.spinner} aria-hidden />}
			<span className={loading ? styles.labelHidden : undefined}>
				{children}
			</span>
		</Component>
	);
}
