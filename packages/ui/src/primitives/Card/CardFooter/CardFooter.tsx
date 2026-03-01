import cn from 'classnames';
import type { HTMLAttributes, ReactNode } from 'react';

import type { CardAlign } from '../types';
import styles from './CardFooter.module.css';

interface CardFooterProps extends HTMLAttributes<HTMLDivElement> {
	children: ReactNode;
	align?: CardAlign;
}

export function CardFooter({
	children,
	align,
	className,
	...props
}: CardFooterProps) {
	return (
		<div
			className={cn(
				styles.root,
				align && styles[`align-${align}`],
				'ml-card-footer',
				className,
			)}
			{...props}
		>
			{children}
		</div>
	);
}
