import cn from 'classnames';
import type { ReactNode } from 'react';

import styles from './Paragraph.module.css';

interface ParagraphProps {
	children?: ReactNode;
	className?: string;
	[key: string]: unknown;
}

export function Paragraph({ children, className, ...props }: ParagraphProps) {
	return (
		<p className={cn(styles.root, className)} {...props}>
			{children}
		</p>
	);
}
