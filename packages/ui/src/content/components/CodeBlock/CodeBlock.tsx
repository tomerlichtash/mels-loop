import type { ReactNode } from 'react';
import styles from './CodeBlock.module.css';

interface CodeBlockProps {
	children?: ReactNode;
	[key: string]: unknown;
}

export default function CodeBlock({ children, ...props }: CodeBlockProps) {
	return (
		<pre className={styles.root} {...props}>
			{children}
		</pre>
	);
}
