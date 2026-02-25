import cn from 'classnames';
import type { ReactNode } from 'react';

import styles from './Blockquote.module.css';

interface BlockquoteProps {
	children?: ReactNode;
	className?: string;
	[key: string]: unknown;
}

export function Blockquote({ children, className, ...props }: BlockquoteProps) {
	return (
		<blockquote className={cn(styles.root, className)} {...props}>
			{children}
		</blockquote>
	);
}
