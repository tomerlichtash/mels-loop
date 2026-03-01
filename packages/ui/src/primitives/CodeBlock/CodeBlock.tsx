import cn from 'classnames';
import type { HTMLAttributes, ReactNode } from 'react';

import styles from './CodeBlock.module.css';

export interface CodeBlockProps extends HTMLAttributes<HTMLPreElement> {
	children?: ReactNode;
}

export function CodeBlock({ children, className, ...props }: CodeBlockProps) {
	return (
		<pre className={cn(styles.root, 'ml-code-block', className)} {...props}>
			{children}
		</pre>
	);
}
