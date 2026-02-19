import type { ReactNode } from 'react';
import styles from './Figure.module.css';

interface FigureProps {
	children?: ReactNode;
	'data-figure-index'?: string;
	[key: string]: unknown;
}

export function Figure({ children, ...props }: FigureProps) {
	return (
		<figure className={styles.figure} {...props}>
			{children}
		</figure>
	);
}
