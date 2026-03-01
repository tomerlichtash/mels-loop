import cn from 'classnames';
import type { HTMLAttributes, ReactNode } from 'react';

import styles from './Figure.module.css';

interface FigureCaptionProps extends HTMLAttributes<HTMLElement> {
	children?: ReactNode;
}

export function FigureCaption({
	children,
	className,
	...props
}: FigureCaptionProps) {
	return (
		<figcaption className={cn(styles.caption, className)} {...props}>
			{children}
		</figcaption>
	);
}
