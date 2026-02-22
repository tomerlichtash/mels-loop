import type { ReactNode, HTMLAttributes } from 'react';
import cn from 'classnames';
import { Heading as HeadingPrimitive } from '../../../primitives/Heading/Heading';
import styles from './Heading.module.css';

export type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;

interface HeadingProps {
	level: HeadingLevel;
	children?: ReactNode;
	className?: string;
	[key: string]: unknown;
}

export default function Heading({
	level,
	children,
	className,
	...props
}: HeadingProps) {
	const levelClass = styles[`h${level}` as keyof typeof styles];

	return (
		<HeadingPrimitive
			order={level}
			className={cn(levelClass, className)}
			{...(props as HTMLAttributes<HTMLHeadingElement>)}
		>
			{children}
		</HeadingPrimitive>
	);
}
