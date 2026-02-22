import type { ReactNode, HTMLAttributes } from 'react';
import cn from 'classnames';
import styles from './Heading.module.css';

type HeadingOrder = 1 | 2 | 3 | 4 | 5 | 6;

interface HeadingProps extends HTMLAttributes<HTMLHeadingElement> {
	children: ReactNode;
	order?: HeadingOrder;
}

export function Heading({
	children,
	order = 1,
	className,
	...props
}: HeadingProps) {
	const Tag = `h${order}` as const;

	return (
		<Tag
			className={cn(styles.root, styles[`order-${order}`], className)}
			{...props}
		>
			{children}
		</Tag>
	);
}
