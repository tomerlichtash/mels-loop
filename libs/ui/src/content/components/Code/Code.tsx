import cn from 'classnames';
import type { ReactNode } from 'react';

import styles from './Code.module.css';

interface CodeProps {
	children?: ReactNode;
	className?: string;
	[key: string]: unknown;
}

export default function Code({ children, className, ...props }: CodeProps) {
	return (
		<code className={cn(styles.root, className)} {...props}>
			{children}
		</code>
	);
}
