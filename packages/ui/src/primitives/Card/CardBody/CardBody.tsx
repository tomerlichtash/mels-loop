import cn from 'classnames';
import type { HTMLAttributes, ReactNode } from 'react';

import type { CardAlign } from '../types';
import styles from './CardBody.module.css';

interface CardBodyProps extends HTMLAttributes<HTMLDivElement> {
	children: ReactNode;
	align?: CardAlign;
	lines?: 1 | 2 | 3 | 4 | 5;
}

export function CardBody({
	children,
	align,
	lines,
	className,
	...props
}: CardBodyProps) {
	return (
		<div
			className={cn(
				styles.root,
				align && styles[`align-${align}`],
				lines && styles[`lines-${lines}`],
				'ml-card-body',
				className,
			)}
			{...props}
		>
			{children}
		</div>
	);
}
