import type { ReactNode } from 'react';
import cn from 'classnames';
import styles from './List.module.css';

interface ListProps {
	ordered?: boolean;
	children?: ReactNode;
	className?: string;
	[key: string]: unknown;
}

export default function List({
	ordered = false,
	children,
	className,
	...props
}: ListProps) {
	const Tag = ordered ? 'ol' : 'ul';

	return (
		<Tag className={cn(styles.root, className)} {...props}>
			{children}
		</Tag>
	);
}
