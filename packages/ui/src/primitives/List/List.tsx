import cn from 'classnames';
import type { HTMLAttributes, ReactNode } from 'react';

import styles from './List.module.css';

interface ListProps extends HTMLAttributes<
	HTMLUListElement | HTMLOListElement
> {
	ordered?: boolean;
	children?: ReactNode;
}

export function List({
	ordered = false,
	children,
	className,
	...props
}: ListProps) {
	const Tag = ordered ? 'ol' : 'ul';

	return (
		<Tag className={cn(styles.root, 'ml-list', className)} {...props}>
			{children}
		</Tag>
	);
}
