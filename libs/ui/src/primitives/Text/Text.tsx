import cn from 'classnames';
import type { ElementType, HTMLAttributes, ReactNode } from 'react';

import styles from './Text.module.css';

type TextSize = 'xs' | 'sm' | 'md' | 'lg';
type TextWeight = 400 | 500 | 600 | 700;

interface TextProps extends HTMLAttributes<HTMLElement> {
	children: ReactNode;
	size?: TextSize;
	color?: 'dimmed' | 'error';
	weight?: TextWeight;
	italic?: boolean;
	uppercase?: boolean;
	capitalize?: boolean;
	component?: ElementType;
}

export function Text({
	children,
	size = 'md',
	color,
	weight,
	italic,
	uppercase,
	capitalize,
	component: Component = 'p',
	className,
	...props
}: TextProps) {
	return (
		<Component
			className={cn(
				styles.root,
				styles[`size-${size}`],
				color && styles[color],
				weight && styles[`weight-${weight}`],
				italic && styles.italic,
				uppercase && styles.uppercase,
				capitalize && styles.capitalize,
				className,
			)}
			{...props}
		>
			{children}
		</Component>
	);
}
