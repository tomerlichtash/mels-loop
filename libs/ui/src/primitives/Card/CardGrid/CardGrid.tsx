import cn from 'classnames';
import type { HTMLAttributes, ReactNode } from 'react';

import styles from './CardGrid.module.css';

interface CardGridProps extends HTMLAttributes<HTMLDivElement> {
	children: ReactNode;
	gap?: 'sm' | 'md' | 'lg';
	layout?: 'grid' | 'masonry';
}

export function CardGrid({
	children,
	gap = 'md',
	layout = 'grid',
	className,
	...props
}: CardGridProps) {
	return (
		<div
			className={cn(
				styles.root,
				styles[`layout-${layout}`],
				styles[`gap-${gap}`],
				'ml-card-grid',
				className,
			)}
			{...props}
		>
			{children}
		</div>
	);
}
