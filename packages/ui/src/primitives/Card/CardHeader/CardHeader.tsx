import cn from 'classnames';
import type { HTMLAttributes, ReactNode } from 'react';

import type { CardAlign } from '../types';
import styles from './CardHeader.module.css';

interface CardHeaderProps extends HTMLAttributes<HTMLDivElement> {
	children: ReactNode;
	align?: CardAlign;
}

export function CardHeader({
	children,
	align,
	className,
	...props
}: CardHeaderProps) {
	return (
		<div
			className={cn(
				styles.root,
				align && styles[`align-${align}`],
				'ml-card-header',
				className,
			)}
			{...props}
		>
			{children}
		</div>
	);
}
