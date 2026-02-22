import type { ReactNode } from 'react';
import cn from 'classnames';
import styles from './Paragraph.module.css';

interface ParagraphProps {
	children?: ReactNode;
	className?: string;
	[key: string]: unknown;
}

export default function Paragraph({
	children,
	className,
	...props
}: ParagraphProps) {
	return (
		<p className={cn(styles.root, className)} {...props}>
			{children}
		</p>
	);
}
