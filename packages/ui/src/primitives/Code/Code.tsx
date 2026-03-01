import cn from 'classnames';
import type { HTMLAttributes, ReactNode } from 'react';

import styles from './Code.module.css';

interface CodeProps extends HTMLAttributes<HTMLElement> {
	children?: ReactNode;
}

export function Code({ children, className, ...props }: CodeProps) {
	return (
		<code className={cn(styles.root, 'ml-code', className)} {...props}>
			{children}
		</code>
	);
}
