import type { ReactNode, HTMLAttributes } from 'react';
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
	const classes = [
		styles.stack,
		styles[`gap-${gap}`],
		align ? styles[`align-${align}`] : '',
		textAlign ? styles[`text-${textAlign}`] : '',
		className ?? '',
	]
		.filter(Boolean)
		.join(' ');

	return (
		<div className={classes} {...props}>
			{children}
		</div>
	);
}
