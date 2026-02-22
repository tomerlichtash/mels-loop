import cn from 'classnames';
import type { ReactNode } from 'react';

import styles from './Line.module.css';

interface LineProps {
	id?: string;
	children?: ReactNode;
	className?: string;
	[key: string]: unknown;
}

export default function Line({ id, children, className, ...props }: LineProps) {
	return (
		<span id={id} className={cn(styles.root, className)} {...props}>
			{id && (
				<a href={`#${id}`} className={styles.anchor} aria-label={`Line ${id}`}>
					#
				</a>
			)}
			{children}
		</span>
	);
}
