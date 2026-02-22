import cn from 'classnames';
import type { HTMLAttributes, ReactNode } from 'react';

import styles from './Container.module.css';

type SpacingSize = 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl';

interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
	children: ReactNode;
	paddingHorizontal?: SpacingSize;
	paddingVertical?: SpacingSize;
}

export function Container({
	children,
	paddingHorizontal,
	paddingVertical,
	className,
	...props
}: ContainerProps) {
	return (
		<div
			className={cn(
				styles.root,
				{
					[styles[`horizontalPadding-${paddingHorizontal}`]]: paddingHorizontal,
					[styles[`verticalPadding-${paddingVertical}`]]: paddingVertical,
				},
				className,
			)}
			{...props}
		>
			{children}
		</div>
	);
}
