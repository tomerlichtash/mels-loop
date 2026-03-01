import cn from 'classnames';
import type { HTMLAttributes } from 'react';

import styles from './Loader.module.css';

type LoaderSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
type LoaderColor = 'primary' | 'secondary' | 'surface';
type LoaderVariant = 'spinner' | 'dots' | 'pulse';

interface LoaderProps extends HTMLAttributes<HTMLSpanElement> {
	variant?: LoaderVariant;
	size?: LoaderSize;
	color?: LoaderColor;
	label?: string;
}

export function Loader({
	variant = 'spinner',
	size = 'md',
	color,
	className,
	label = 'Loading…',
	...props
}: LoaderProps) {
	return (
		<span
			role="status"
			aria-label={label}
			className={cn(
				styles.root,
				styles[`variant-${variant}`],
				styles[`size-${size}`],
				color && styles[`color-${color}`],
				'ml-loader',
				className,
			)}
			{...props}
		>
			{variant === 'dots' && (
				<>
					<span className={styles.dot} />
					<span className={styles.dot} />
					<span className={styles.dot} />
				</>
			)}
		</span>
	);
}
