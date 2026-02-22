import cn from 'classnames';
import type { HTMLAttributes, ReactNode } from 'react';

import styles from './Stack.module.css';

type GapSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
type Align = 'start' | 'center' | 'end';

interface StackProps extends HTMLAttributes<HTMLDivElement> {
	children: ReactNode;
	gap?: GapSize;
	align?: Align;
	textAlign?: 'center';
}

export function Stack({
	children,
	gap = 'md',
	align,
	textAlign,
	className,
	...props
}: StackProps) {
	return (
		<div
			className={cn(
				styles.root,
				styles[`gap-${gap}`],
				align && styles[`align-${align}`],
				textAlign && styles[`text-${textAlign}`],
				className,
			)}
			{...props}
		>
			{children}
		</div>
	);
}
