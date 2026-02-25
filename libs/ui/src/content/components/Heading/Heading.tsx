import cn from 'classnames';
import type { HTMLAttributes, ReactNode } from 'react';

import {
	Heading as HeadingPrimitive,
	type HeadingLevel,
} from '../../../primitives/Heading/Heading';
import styles from './Heading.module.css';

export type { HeadingLevel };

interface HeadingProps {
	level: HeadingLevel;
	children?: ReactNode;
	className?: string;
	[key: string]: unknown;
}

export function Heading({
	level,
	children,
	className,
	...props
}: HeadingProps) {
	const levelClass = styles[`h${level}` as keyof typeof styles];

	return (
		<HeadingPrimitive
			level={level}
			className={cn(levelClass, className)}
			{...(props as HTMLAttributes<HTMLHeadingElement>)}
		>
			{children}
		</HeadingPrimitive>
	);
}
