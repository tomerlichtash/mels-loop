import type { ReactNode, ButtonHTMLAttributes } from 'react';
import { Slot } from '@radix-ui/react-slot';
import cn from 'classnames';
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
	const Component = asChild ? Slot : 'button';

	return (
		<Component
			className={cn(
				styles.root,
				styles[`variant-${variant}`],
				styles[`size-${size}`],
				loading && styles.loading,
				className,
			)}
			disabled={disabled || loading}
			{...props}
		>
			{loading && <Loader size="sm" aria-hidden />}
			<span className={loading ? styles.labelHidden : undefined}>
				{children}
			</span>
		</Component>
	);
}
