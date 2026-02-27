import cn from 'classnames';
import type { HTMLAttributes, ReactNode } from 'react';

import styles from './Grid.module.css';

type GridGap = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
type GridLayout = 'grid' | 'masonry';
type GridColumns = 1 | 2 | 3 | 4 | 5 | 6;

interface GridProps extends HTMLAttributes<HTMLDivElement> {
	children: ReactNode;
	columns?: GridColumns;
	gap?: GridGap;
	layout?: GridLayout;
}

export function Grid({
	children,
	columns = 3,
	gap = 'md',
	layout = 'grid',
	className,
	...props
}: GridProps) {
	return (
		<div
			className={cn(
				styles.root,
				styles[`layout-${layout}`],
				styles[`columns-${columns}`],
				styles[`gap-${gap}`],
				'ml-grid',
				className,
			)}
			{...props}
		>
			{children}
		</div>
	);
}
