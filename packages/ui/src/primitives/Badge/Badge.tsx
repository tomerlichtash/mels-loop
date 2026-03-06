import cn from 'classnames';
import type { CSSProperties, HTMLAttributes, ReactNode } from 'react';

import styles from './Badge.module.css';

type BadgeRadius = 'none' | 'sm' | 'md' | 'lg' | 'pill';
type BadgeVariant = 'outlined' | 'contained';

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
	children: ReactNode;
	color?: string;
	radius?: BadgeRadius;
	variant?: BadgeVariant;
	bordered?: boolean;
}

export function Badge({
	children,
	color,
	radius = 'pill',
	variant = 'outlined',
	bordered,
	className,
	style,
	...props
}: BadgeProps) {
	const vars = {
		...(color && { '--ml-badge-background-color': color }),
	} as CSSProperties;

	return (
		<span
			className={cn(
				styles.root,
				styles[`radius-${radius}`],
				styles[`variant-${variant}`],
				{ [styles.colored]: color, [styles.bordered]: bordered },
				'ml-badge',
				className,
			)}
			style={{ ...vars, ...style }}
			{...props}
		>
			{children}
		</span>
	);
}
