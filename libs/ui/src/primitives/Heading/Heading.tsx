import cn from 'classnames';
import type { HTMLAttributes, ReactNode } from 'react';

import styles from './Heading.module.css';

export type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;

interface HeadingProps extends HTMLAttributes<HTMLHeadingElement> {
	children: ReactNode;
	level?: HeadingLevel;
}

export function Heading({
	children,
	level = 1,
	className,
	...props
}: HeadingProps) {
	const Tag = `h${level}` as const;

	return (
		<Tag
			className={cn(styles.root, styles[`level-${level}`], className)}
			{...props}
		>
			{children}
		</Tag>
	);
}
