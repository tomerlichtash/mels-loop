import cn from 'classnames';
import type { HTMLAttributes, ReactNode } from 'react';

import { Text } from '../../../primitives/Text/Text';
import styles from './Heading.module.css';

export type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;

type TextVariant = 'h1' | 'h2' | 'h3' | 'h4' | 'subtitle1' | 'subtitle2';
type TextElement = 'h5' | 'h6';

const LEVEL_CONFIG: Record<
	HeadingLevel,
	{ variant: TextVariant; component?: TextElement }
> = {
	1: { variant: 'h1' },
	2: { variant: 'h2' },
	3: { variant: 'h3' },
	4: { variant: 'h4' },
	5: { variant: 'subtitle1', component: 'h5' },
	6: { variant: 'subtitle2', component: 'h6' },
};

interface HeadingProps extends Omit<HTMLAttributes<HTMLElement>, 'color'> {
	level: HeadingLevel;
	children?: ReactNode;
}

export function Heading({
	level,
	children,
	className,
	...props
}: HeadingProps) {
	const levelClass = styles[`h${level}` as keyof typeof styles];
	const { variant, component } = LEVEL_CONFIG[level];

	return (
		<Text
			variant={variant}
			component={component}
			className={cn(levelClass, className)}
			{...props}
		>
			{children}
		</Text>
	);
}
