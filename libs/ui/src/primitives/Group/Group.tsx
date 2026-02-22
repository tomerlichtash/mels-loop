import cn from 'classnames';
import type { HTMLAttributes, ReactNode } from 'react';

import styles from './Group.module.css';

type GapSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
type Justify = 'start' | 'center' | 'end' | 'space-between';
type Align = 'start' | 'center' | 'end';

interface GroupProps extends HTMLAttributes<HTMLDivElement> {
	children: ReactNode;
	gap?: GapSize;
	justify?: Justify;
	align?: Align;
	wrap?: 'wrap' | 'nowrap';
}

export function Group({
	children,
	gap = 'md',
	justify,
	align,
	wrap,
	className,
	...props
}: GroupProps) {
	return (
		<div
			className={cn(
				styles.root,
				styles[`gap-${gap}`],
				justify && styles[`justify-${justify}`],
				align && styles[`align-${align}`],
				wrap === 'nowrap' && styles.nowrap,
				className,
			)}
			{...props}
		>
			{children}
		</div>
	);
}
