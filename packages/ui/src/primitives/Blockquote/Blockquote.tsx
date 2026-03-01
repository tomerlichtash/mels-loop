import cn from 'classnames';
import type { HTMLAttributes, ReactNode } from 'react';

import styles from './Blockquote.module.css';

export interface BlockquoteProps extends HTMLAttributes<HTMLQuoteElement> {
	children?: ReactNode;
}

export function Blockquote({ children, className, ...props }: BlockquoteProps) {
	return (
		<blockquote
			className={cn(styles.root, 'ml-blockquote', className)}
			{...props}
		>
			{children}
		</blockquote>
	);
}
