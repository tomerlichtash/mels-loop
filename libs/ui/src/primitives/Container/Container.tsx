import cn from 'classnames';
import type { HTMLAttributes, ReactNode } from 'react';

import styles from './Container.module.css';

type ContainerSpacing = 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl';
type ContainerAlign = 'start' | 'center' | 'end';
type ContainerJustify = 'start' | 'center' | 'end' | 'between' | 'evenly';
type ContainerDirection = 'row' | 'column';
type ContainerShadow = 'none' | 'xs' | 'sm' | 'md' | 'lg';

interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
	children: ReactNode;
	paddingHorizontal?: ContainerSpacing;
	paddingVertical?: ContainerSpacing;
	direction?: ContainerDirection;
	gap?: ContainerSpacing;
	align?: ContainerAlign;
	justify?: ContainerJustify;
	wrap?: boolean;
	shadow?: ContainerShadow;
}

export function Container({
	children,
	paddingHorizontal = 'none',
	paddingVertical = 'none',
	direction = 'column',
	gap = 'none',
	align = 'start',
	justify = 'start',
	wrap = false,
	shadow,
	className,
	...props
}: ContainerProps) {
	return (
		<div
			className={cn(
				styles.root,
				styles[`paddingHorizontal-${paddingHorizontal}`],
				styles[`paddingVertical-${paddingVertical}`],
				styles[`direction-${direction}`],
				styles[`gap-${gap}`],
				styles[`align-${align}`],
				styles[`justify-${justify}`],
				shadow && styles[`shadow-${shadow}`],
				{ [styles.wrap]: wrap },
				'ml-container',
				className,
			)}
			{...props}
		>
			{children}
		</div>
	);
}
