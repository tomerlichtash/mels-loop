import cn from 'classnames';
import type { HTMLAttributes, ReactNode } from 'react';

import type { CardAlign } from '../types';
import styles from './CardActions.module.css';

export interface CardActionsProps extends HTMLAttributes<HTMLDivElement> {
	children: ReactNode;
	align?: CardAlign;
}

export function CardActions({
	children,
	align = 'end',
	className,
	...props
}: CardActionsProps) {
	return (
		<div
			className={cn(
				styles.root,
				styles[`align-${align}`],
				'ml-card-actions',
				className,
			)}
			{...props}
		>
			{children}
		</div>
	);
}
